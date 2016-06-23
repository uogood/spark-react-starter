/* global __PRODUCTION__, __DEV__ */
/* eslint no-console: 0, consistent-return: 0 */
import { Server } from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import pug from 'pug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import RadiumContainer from './containers/radium';
import routesContainer from './routes';
import configureStore from './state/store';

let routes = routesContainer;

const store = configureStore();
const initialState = store.getState();

const environment = {
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
};

const hostname = environment.production ? process.env.HOSTNAME :
  'localhost';
const port = environment.production ? process.env.PORT : 8001;
const server = new Server();

server.connection( {
  host: hostname,
  port,
} );

server.register(
  [
    h2o2,
    inert,
  ],
  ( err ) => {
    if ( err ) {
      throw err;
    }

    server.start( () => {
      console.info( '==> ✅  Server is listening' );
      console.info( '==> 🌎  Go to ' + server.info.uri.toLowerCase() );
    } );
  } );

// files server from static folder
server.route( {
  method: 'GET',
  path: '/{params*}',
  handler: {
    file: ( request ) => 'static' + request.path,
  },
} );

// Catch dynamic requests here to fire-up React Router.
server.ext( 'onPreResponse', ( request, reply ) => {
  if ( typeof request.response.statusCode !== 'undefined' ) {
    return reply.continue();
  }

  match( { routes, location: request.path }, ( error, redirectLocation, renderProps ) => {
    if ( redirectLocation ) {
      reply.redirect( redirectLocation.pathname + redirectLocation.search );
      return;
    }

    if ( error || ! renderProps ) {
      reply.continue();
      return;
    }

    const reactString = ReactDOM.renderToString(
      <Provider store={store}>
        <RadiumContainer radiumConfig={{ userAgent: request.headers['user-agent'] }}>
          <RouterContext {...renderProps} />
        </RadiumContainer>
      </Provider>
    );

    const webserver = __PRODUCTION__ ? '/dist' : `//${hostname}:8080`;

    const renderTmpl = pug.compileFile( './src/index.pug' );
    const output = renderTmpl( {
      reactString,
      documentTitle: 'Spark React Starter',
      documentDescription: 'Spark React Starter',
      scriptURI: webserver + '/app.js',
      initialState: JSON.stringify( initialState ),
      userAgent: JSON.stringify( request.headers['user-agent'] ),
    } );

    reply( output );
  } );
} );

if ( __DEV__ ) {
  if ( module.hot ) {
    console.log( '[HMR] Waiting for server-side updates' );

    module.hot.accept( './routes', () => {
      routes = require( './routes' );
    } );

    module.hot.addStatusHandler( ( status ) => {
      if ( status === 'abort' ) {
        setTimeout( () => process.exit( 0 ), 0 );
      }
    } );
  }
}

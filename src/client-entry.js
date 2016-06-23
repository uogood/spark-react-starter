/* eslint no-console: 0, no-underscore-dangle: 0 */
import React from 'react';
import { render } from 'react-dom';
import configureStore from './state/store';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import Root from './containers/root';

const initialState = ( window && window.__INITIAL_STATE__ ) ? window.__INITIAL_STATE__ : {};
const store = configureStore( initialState );

if ( ( window && window.__INITIAL_STATE__ ) ) {
  delete window.__INITIAL_STATE__;
}

const rootEl = window.document.getElementById( 'root' );

const history = syncHistoryWithStore( browserHistory, store );

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl
);

if ( module.hot ) {
  module.hot.accept( './containers/root', () => {
    const NextRoot = require( './containers/root' ).default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      rootEl
    );
  } );
}

if ( process.env.NODE_ENV === 'production' ) {
  if ( ! rootEl.firstChild ||
    ! rootEl.firstChild.attributes ||
    ! rootEl.firstChild.attributes['data-react-checksum']
  ) {
    console.error( 'Server-side React render was discarded. ' +
      'Make sure that your initial render does not contain any client-side code.' );
  }
}

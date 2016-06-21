import React from 'react';
import ReactDOM from 'react-dom';

const rootEl = document.getElementById( 'root' );

let render = () => {
  const Root = require( './components/root' );
  ReactDOM.render(
    <Root />,
    rootEl
  );
};

if ( module.hot ) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = ( error ) => {
    const RedBox = require( 'redbox-react' );
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    );
  };

  render = () => {
    try {
      renderApp();
    } catch ( error ) {
      renderError( error );
    }
  };

  module.hot.accept( './components/root', () => {
    setTimeout( render );
  } );
}

render();

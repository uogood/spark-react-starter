import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function ( initialState ) {
  const devTools = (
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ) ?
      window.devToolsExtension() :
      f => f;

  const finalCreateStore = compose( applyMiddleware( thunk ), devTools )( createStore );

  const store = finalCreateStore( rootReducer, initialState );

  if ( module.hot ) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept( '../reducers', () => {
      const { reducer: nextReducer } = require( '../reducers' );
      store.replaceReducer( nextReducer );
    } );
  }

  return store;
}

import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import RadiumContainer from './radium';
import routes from '../routes';

const Root = ( { store, history } ) => (
  <Provider store={store}>
    <RadiumContainer>
      <Router routes={routes} history={history} />
    </RadiumContainer>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;

import React from 'react';
import { Router, Route } from 'react-router';
import Hello from '../components/hello';

const routes = (
  <Router>
    <Route path="/" component={Hello} />
  </Router>
);

export default routes;

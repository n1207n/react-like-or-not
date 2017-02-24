import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './containers/AppContainer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import MediaListContainer from './containers/MediaListContainer';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="list" component={MediaListContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

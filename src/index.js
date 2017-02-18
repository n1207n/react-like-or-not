/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';

import {Router, browserHistory} from 'react-router';
import routes from './routes';

import {Provider} from 'react-redux';
import store from './store/configureStore';
import {syncHistoryWithStore} from 'react-router-redux';

require('./favicon.ico');
import './styles/styles.scss';
import 'font-awesome/css/font-awesome.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  teal500,
  teal700,
  grey400,
  redA200,
  grey100,
  grey500,
  darkBlack,
  white,
  grey300,
  fullBlack
} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: grey400,
    accent1Color: redA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: teal500,
    shadowColor: fullBlack
  }
});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>
</MuiThemeProvider>, document.getElementById('app'));

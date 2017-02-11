import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import API from './API';

const rootReducer = combineReducers({
  routing: routerReducer,
  API,
});

export default rootReducer;

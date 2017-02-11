/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import fetchImageList from '../actions/fetchImageList.js';
import loadImageListError from '../actions/loadImageListError.js';
import loadImageList from '../actions/loadImageList.js';
import requestImageList from '../actions/requestImageList.js';
const actions = {
  requestImageList,
  loadImageList,
  loadImageListError,
  fetchImageList
};
module.exports = actions;

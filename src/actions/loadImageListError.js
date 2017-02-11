// @flow

import { LOAD_IMAGE_LIST_ERROR } from './const';

function action(errorResponse: Object) {
  return { type: LOAD_IMAGE_LIST_ERROR, errorResponse };
}

module.exports = action;

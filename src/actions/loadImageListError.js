// @flow

import { LOAD_IMAGE_LIST_ERROR } from './const';

export default function action(errorResponse: Object) {
  return { type: LOAD_IMAGE_LIST_ERROR, errorResponse };
}

/* @flow
 * Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import type {InstagramMediaType} from '../sources/InstagramMediaType';

import {
  REQUEST_IMAGE_LIST,
  LOAD_IMAGE_LIST,
  LOAD_IMAGE_LIST_ERROR,
  SAVE_AUTH_DATA,
} from '../actions/const';

type APIReducerStateType = {token: string, data: Array<InstagramMediaType>, loading: boolean, error: boolean, errorResponse: Object};

const initialState: APIReducerStateType = {
  token: '',
  data: [],
  favoredData: [],
  loading: false,
  error: false,
  errorResponse: {},
};

export default function reducer(state: APIReducerStateType = initialState, action: Object) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    /*
    case YOUR_ACTION: {
      // Modify next state depending on the action and return it
      return nextState;
    }
    */
    case REQUEST_IMAGE_LIST: {
      return Object.assign({}, state, {isLoading: true, error: false});
    }

    case LOAD_IMAGE_LIST_ERROR: {
      return Object.assign({}, state, {isLoading: false, error: true, errorResponse: action.errorResponse});
    }

    case LOAD_IMAGE_LIST: {
      return Object.assign({}, state, {isLoading: false, error: false, data: action.data});
    }

    case SAVE_AUTH_DATA: {
      return Object.assign({}, state, {
        token: action.token,
      });
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

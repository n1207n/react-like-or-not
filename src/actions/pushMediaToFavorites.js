// @flow

import { PUSH_MEDIA_TO_FAVORITES } from './const';

export default function action(index: Number) {
  return { type: PUSH_MEDIA_TO_FAVORITES, index };
}

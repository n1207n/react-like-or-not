// @flow

import { PUSH_MEDIA_TO_FAVORITES } from './const';

import type {InstagramMediaType} from '../sources/InstagramMediaType';

export default function action(index: Number) {
  return { type: PUSH_MEDIA_TO_FAVORITES, index };
}

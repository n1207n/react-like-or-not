// @flow

import { PUSH_MEDIA_TO_FAVORITES } from './const';

import type {InstagramMediaType} from '../sources/InstagramMediaType';

export default function action(media: InstagramMediaType) {
  return { type: PUSH_MEDIA_TO_FAVORITES, media };
}

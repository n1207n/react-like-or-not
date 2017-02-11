// @flow

import type {InstagramMediaType} from '../sources/InstagramMediaType';

import { LOAD_IMAGE_LIST } from './const';

export default function action(data: Array<InstagramMediaType>) {
  return { type: LOAD_IMAGE_LIST, data };
}

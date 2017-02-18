// @flow

import { SAVE_AUTH_DATA } from './const';

export default function action(token: string) {
  return { type: SAVE_AUTH_DATA, token };
}

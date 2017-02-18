// @flow

import jsonp from 'jsonp';

import { requestImageList, loadImageList, loadImageListError } from './index';

export default function action(url: string, access_token: string, callback: Function) {
  return function(dispatch: Function) {
    dispatch(requestImageList());

    jsonp(url + `?access_token=${access_token}`, null, function(err, response) {
      if (err) {
        dispatch(loadImageListError(err));
      } else if (response.meta.code !== 200) {
        dispatch(loadImageListError(response.meta));
      } else {
        dispatch(loadImageList(response.data));
      }
    });
  };
}

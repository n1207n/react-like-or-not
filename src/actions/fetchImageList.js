// @flow

import axios from 'axios';

import { requestImageList, loadImageList, loadImageListError } from './index';

export default function action(url: string, access_token: string) {
  return function(dispatch: Function) {
    dispatch(requestImageList());

    return axios({
      url,
      params: {
        access_token,
      },
      timeout: 2000,
      method: 'get',
      responseType: 'json',
    }).then(success => {
      dispatch(loadImageList(success.data));
    }).catch(error => {
      dispatch(loadImageListError(error));
    });
  };
}

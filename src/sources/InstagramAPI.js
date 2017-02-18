import config from 'config';

export const oAuthUrl = `https://api.instagram.com/oauth/authorize/?client_id=${config.INSTAGRAM_CLIENT_ID}&redirect_uri=${config.INSTAGRAM_REDIRECT_URL}&response_type=token`;

export const getRecentMediaUrl = "https://api.instagram.com/v1/users/self/media/recent/";

export function APIException(message) {
  this.message = message;
}

export default {
  oAuthUrl,
  APIException,
};

import config from 'config';

export const apiAuthorizationUrl = `https://api.instagram.com/oauth/authorize/?client_id=${config.INSTAGRAM_CLIENT_ID}&redirect_uri=${config.INSTAGRAM_REDIRECT_URL}&response_type=token`;

export function APIException(message) {
  this.message = message;
}

export default {
  apiAuthorizationUrl,
  APIException,
};

import config from 'config';

console.log(config);

export const apiAuthorizationUrl = `https://api.instagram.com/oauth/authorize/?client_id=${config.instagramApiClientId}&redirect_uri=${config.redirectURL}&response_type=token`;

export function APIException(message) {
  this.message = message;
}

export default {
  apiAuthorizationUrl,
  APIException,
};

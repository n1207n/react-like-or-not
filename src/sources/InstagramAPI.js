import config from 'config';

console.log(config);

const apiRedirectUrl = config.redirectURL;

export const apiClientId = config.instagramApiClientId;
export const apiAuthorizationUrl = `https://api.instagram.com/oauth/authorize/?client_id=${apiClientId}&redirect_uri=${apiRedirectUrl}&response_type=token`;

export function APIException(message) {
  this.message = message;
}

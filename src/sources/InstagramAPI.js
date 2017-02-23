import config from 'config';

/**
 * A ES6 template literal for Instagram OAuth url
 * @type {string}
 */
export const oAuthUrl = `https://api.instagram.com/oauth/authorize/?client_id=${config.INSTAGRAM_CLIENT_ID}&redirect_uri=${config.INSTAGRAM_REDIRECT_URL}&response_type=token`;

/**
 * A ES6 template literal for Instagram API endpoint url to get recent media
 * @type {string}
 */
export const getRecentMediaUrl = "https://api.instagram.com/v1/users/self/media/recent/";

/**
 * A JS object that represents an exception for API endpoint task
 * @param {string} message
 */
export function APIException(message) {
  this.message = message;
}

export default {
  oAuthUrl,
  APIException,
};

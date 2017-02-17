let config = {
  INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
  INSTAGRAM_REDIRECT_URL: process.env.INSTAGRAM_REDIRECT_URL,
};

config.INSTAGRAM_OAUTH_URL = `https://api.instagram.com/oauth/authorize/?client_id=${config.INSTAGRAM_CLIENT_ID}&redirect_uri=${config.INSTAGRAM_REDIRECT_URL}&response_type=token`;

export default Object.freeze(config);

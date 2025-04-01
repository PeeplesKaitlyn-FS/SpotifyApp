require('dotenv').config();
const config = {
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI
};
module.exports = config;
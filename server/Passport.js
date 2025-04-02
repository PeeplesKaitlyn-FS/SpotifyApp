const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const dotenv = require('dotenv');
dotenv.config();

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const CALLBACK_URL = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const passportConfig = {
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: ['user-read-email', 'user-read-private', 'playlist-read-private'],
};

passport.use(new SpotifyStrategy({
  clientID: passportConfig.clientID,
  clientSecret: passportConfig.clientSecret,
  callbackURL: passportConfig.callbackURL,
  scope: passportConfig.scope
}, passportConfig.callback));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

module.exports = passport;
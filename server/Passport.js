const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

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
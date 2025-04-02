const express = require('express');
const passport = require('../Passport');
const router = express.Router();

router.get('/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private', 'playlist-read-private'] }));

router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), (req, res) => {
  req.session.access_token = req.user.access_token;
  req.session.refresh_token = req.user.refresh_token;

  res.redirect('/profile');
});

module.exports = router;

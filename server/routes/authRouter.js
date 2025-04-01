const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private', 'playlist-read-private'] }));

module.exports = router;
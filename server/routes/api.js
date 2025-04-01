const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

router.get('/login', (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private user-read-email`;
  res.redirect(authUrl);
});

router.get('/callback', (req, res) => {
  const code = req.query.code;
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const data = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  };

  axios.post(tokenUrl, data, { headers })
    .then((response) => {
      const accessToken = response.data.access_token;
      // Use the access token to make API requests to Spotify's Web API
      res.send(`Access token: ${accessToken}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error exchanging code for access token');
    });
});

module.exports = router;
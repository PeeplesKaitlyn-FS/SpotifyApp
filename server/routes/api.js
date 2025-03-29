const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SpotifyWebApi = require('spotify-web-api-node');

// Get access token from Spotify API
router.get('/token', (req, res) => {
  const code = req.query.code;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/callback'
  });
  spotifyApi.clientCredentialsFlow().then((data) => {
    const accessToken = data.body['access_token'];
    res.json({ accessToken });
  });
});

// Search for artists on Spotify API
router.get('/search', (req, res) => {
  const query = req.query.q;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/callback'
  });
  spotifyApi.searchArtists(query).then((data) => {
    const artists = data.body.artists.items;
    res.json({ artists });
  });
});

// Get artist details from Spotify API
router.get('/artist/:id', (req, res) => {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/callback'
  });
  spotifyApi.getArtist(id).then((data) => {
    const artist = data.body;
    res.json({ artist });
  });
});

// Get artist albums from Spotify API
router.get('/artist/:id/albums', (req, res) => {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/callback'
  });
  spotifyApi.getArtistAlbums(id).then((data) => {
    const albums = data.body.items;
    res.json({ albums });
  });
});

module.exports = router;
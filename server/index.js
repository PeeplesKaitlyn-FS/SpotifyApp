const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv');
dotenv.config();

// Set up Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback'
});

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up jwt authentication middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
});

// Set up routes
app.use('/api', require('./routes/api'));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
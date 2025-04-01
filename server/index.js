const express = require("express");
require("dotenv").config();
//const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

// Load Passport.js configuration from separate file
const passportConfig = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/callback',
  scope: ['user-read-email', 'user-read-private', 'playlist-read-private']
};

// Set up Passport.js
passport.use(new SpotifyStrategy({
  clientID: passportConfig.clientID,
  clientSecret: passportConfig.clientSecret,
  callbackURL: passportConfig.callbackURL,
  scope: passportConfig.scope
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB database
//const DATABASE_URL = process.env.DATABASE_URL;
//mongoose.connect(DATABASE_URL);
//const db = mongoose.connection;
//db.on("error", (error) => console.error(error));
//db.once("open", () => console.log("Database Connection Established"));

// Load routes
const songRouter = require("./routes/songRouter");
app.use("/songs", songRouter);

// Spotify authentication routes
app.get('/auth/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private', 'playlist-read-private'] }));

app.get('/auth/spotify/', (req, res) => {
  res.redirect('/auth/spotify');
});

app.get('/callback', passport.authenticate('spotify', { failureRedirect: '/' }), (req, res) => {
  // Redirect to profile page with secure token
  const token = req.user.token;
  res.redirect(`/profile?token=${token}`);
});

// Static build folder
app.use(express.static(path.join(__dirname, "../client/public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

module.exports = app;
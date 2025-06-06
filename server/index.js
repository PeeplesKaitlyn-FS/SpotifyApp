require('dotenv').config(); 

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('errorhandler');
const crypto = require('crypto'); 

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      httpOnly: true, 
      sameSite: 'lax' 
    }
  }));
  
  

  app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
  }));
  

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SCOPES = ['user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public', 'user-library-read'];

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', async function(req, res) { 
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
  
    const state = generateRandomString(16); 
  
    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge, 
      redirect_uri: REDIRECT_URI,
      state: state, 
    };
  
    req.session.code_verifier = codeVerifier;
    req.session.state = state;
  
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.search = new URLSearchParams(params).toString();
    res.redirect(authUrl.toString());
});

app.get('/callback', function(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null || state !== req.session.state) {
    return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
  }

  const codeVerifier = req.session.code_verifier;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    },
    json: true
  };

  axios.post(authOptions.url, querystring.stringify(authOptions.form), {
    headers: { 'Authorization': authOptions.headers['Authorization'], 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  .then(response => {
    const { access_token, refresh_token } = response.data;
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
    res.redirect('http://localhost:3001/dashboard');
  })
  .catch(error => {
    console.error('Error exchanging code for token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});
    

  
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomString;
};

const generateCodeChallenge = async (codeVerifier) => {
  const sha256 = (plain) => {
    return crypto.createHash('sha256', 'utf8').update(plain).digest();
  };

  const base64encode = (input) => {
    return input.toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const hashed = sha256(codeVerifier);
  return base64encode(hashed);
};


app.get('/profile', async (req, res) => {
    const accessToken = req.session.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });  

  app.get('/playlists', async (req, res) => {
    const accessToken = req.session.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch playlists' });
    }
  });
  

  app.get('/tracks', async (req, res) => {
    const accessToken = req.session.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch tracks' });
    }
  });
  
  app.get('/playlists/:id/tracks', async (req, res) => {
    const accessToken = req.session.access_token;
    const playlistId = req.params.id;
  
    if (!accessToken) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
  
    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      res.json(response.data); 
    } catch (error) {
      console.error('Failed to fetch playlist tracks:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch playlist tracks' });
    }
  });
  
  app.get("/search", async (req, res) => {
    const accessToken = req.session.access_token;
    if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  
    const query = req.query.q;
    const type = req.query.type || "track";
    const limit = req.query.limit || 100; 
  
    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q: query, type, limit },
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to search tracks" });
    }
  });
  
app.get('/refresh', async (req, res) => {
    const refreshToken = req.session.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token is missing' });
    }

    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        const newAccessToken = tokenResponse.data.access_token;
        req.session.access_token = newAccessToken;

        res.json({ access_token: newAccessToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: 'Failed to refresh access token' });
    }
});

const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build"))); 

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

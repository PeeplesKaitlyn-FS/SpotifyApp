import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      axios.post('/auth/spotify/callback', {
        code: code,
      }).then(response => {
        const spotifyApi = new SpotifyWebApi({
          clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
          redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        });
        spotifyApi.setAccessToken(response.data.access_token);
        navigate('/dashboard');
      }).catch(error => {
        console.error(error);
      });
    }
  }, [navigate]);

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const scopes = ['user-read-email', 'user-read-private', 'playlist-read-private'];
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}`;

  const handleLogin = () => {
    window.location.href = url;
  };

  return (
    <div>
        <h1>Login to Spotify</h1>
        <p>Click the button below to login with your Spotify account.</p>
        <p>This will redirect you to Spotify's login page.</p>
        <p>After logging in, you will be redirected back to this app.</p>
        <p>Make sure to allow the requested permissions.</p>
        <p>If you are not redirected automatically, click the button below:</p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSpotify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scopes = ['user-read-email', 'user-read-private', 'playlist-read-private'];
    const url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/callback&scope=${scopes.join('%20')}`;
    navigate(url);
  }, [navigate]);

  return <div></div>;
};

export default AuthSpotify;
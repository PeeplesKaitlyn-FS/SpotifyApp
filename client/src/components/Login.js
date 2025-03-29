import React from 'react';

const Login = () => {
  const handleLogin = () => {
    console.log('REACT_APP_CLIENT_ID:', process.env.REACT_APP_CLIENT_ID);
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = 'http://localhost:3000/callback'; 
    const scope = 'user-read-private user-read-email';
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    window.location.href = url;
  };
   
  console.log('Login component rendered');
  console.log('process.env.REACT_APP_CLIENT_ID:', process.env.REACT_APP_CLIENT_ID);
  console.log(process.env);
  return (
    <div>
      <h1>Spotify Web API</h1>
      <p>In order to use this app you must be logged in!</p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
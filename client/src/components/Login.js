import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/login'; 
  };

  return (
    <div>
        <h1>Login to Spotify</h1>
        <p>Click the button below to login with your Spotify account.</p>
        <p>This will redirect you to Spotify's login page.</p>
        <p>After logging in, you will be redirected back to this application.</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/login'; 
  };

  return (
    <div>
        <h1>Login to Spotify</h1>
        <p>Click the button below to login with your Spotify account.</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
import React from "react";
import './App.css';

const API_BASE_URL = "http://localhost:3000"; // Backend URL

const Home = () => {
  return (
    <div className="home-container">
      <h1>Spotify Web API</h1>
      <a href={`${API_BASE_URL}/login`}>
        <button className="login-button">Login with Spotify</button>
      </a>
    </div>
  );
};

export default Home;
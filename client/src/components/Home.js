import React from "react";
import './App.css';

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Spotify Web API</h1>
      <a href="http://localhost:3000/login">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Login with Spotify
        </button>
      </a>
    </div>
  );
};

export default Home;

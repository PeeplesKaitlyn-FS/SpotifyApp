import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000"; // Backend URL

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Spotify Authorization Code Flow</h1>
      <a href={`${API_BASE_URL}/login`}>
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>Login with Spotify</button>
      </a>
    </div>
  );
}

function Callback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      alert("Authorization code missing.");
      navigate('/');
      return;
    }

    axios.get(`${API_BASE_URL}/callback?code=${code}`)
      .then((response) => {
        const token = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error fetching token:", error);
        setLoading(false);
        alert("Failed to authenticate. Please try again.");
      });
  }, [navigate]);

  return loading ? <div>Loading...</div> : <div>Authentication Failed</div>;
}

function Profile() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        alert("Please log in to view your profile.");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please try again.");
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Spotify Profile</h1>
      {profile ? (
        <div>
          <img src={profile.images?.[0]?.url} alt="Profile" width="150" />
          <h2>{profile.display_name}</h2>
          <p>Email: {profile.email}</p>
          <p>Followers: {profile.followers.total}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Spotify Dashboard</h1>
      <p>Welcome to your Spotify dashboard!</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <NavLink to="/" style={{ marginRight: "20px" }} activeStyle={{ fontWeight: 'bold', color: 'green' }}>Home</NavLink>
        <NavLink to="/dashboard" style={{ marginRight: "20px" }} activeStyle={{ fontWeight: 'bold', color: 'green' }}>Dashboard</NavLink>
        <NavLink to="/profile" activeStyle={{ fontWeight: 'bold', color: 'green' }}>Profile</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

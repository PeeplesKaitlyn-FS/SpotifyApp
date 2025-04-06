import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Playlists from "./components/PlaylistList";
import TrackList from "./components/TrackList";
import Profile from "./components/UserProfile";
import Search from "./components/Search";

const API_BASE_URL = "http://localhost:3000"; // Backend URL

function Home() {
  return (
    <div className="home-container">
      <h1>Spotify Web API</h1>
      <a href={`${API_BASE_URL}/login`}>
        <button className="login-button">Login with Spotify</button>
      </a>
    </div>
  );
}

function Callback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      setError("Authorization code missing.");
      navigate("/");
      return;
    }

    axios
      .get(`${API_BASE_URL}/callback?code=${code}`, { withCredentials: true })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        setError("Authentication failed.");
        navigate("/"); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Redirecting...</div>;
}

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Spotify Dashboard</h1>
      <p>Welcome to your Spotify dashboard!</p>
      <Link to="/search">
        <button className="search-button">Search for a track</button>
      </Link>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/playlists">Playlists</Link>
        </li>
      </ul>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/profile`, { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    // Removed spinner, no loading state
    return <div>Checking authentication...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/playlists" className="nav-link">Playlists</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/:id"
          element={
            <ProtectedRoute>
              <TrackList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

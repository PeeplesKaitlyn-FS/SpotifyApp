import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../App.css';

const API_BASE_URL = "http://localhost:3000";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Please log in to view your playlists.");
      navigate("/login"); 
      return;
    }

    axios
      .get(`${API_BASE_URL}/me/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 20, offset: 0 },
      })
      .then((response) => setPlaylists(response.data.items))
      .catch((error) => {
        console.error(error);
      });
  }, [token, navigate]);

  return (
    <div>
      <h1>Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlists;
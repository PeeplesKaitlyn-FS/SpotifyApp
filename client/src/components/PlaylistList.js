import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      alert("Please log in to view your playlists.");
      return;
    }

    axios
      .get(`${API_BASE_URL}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPlaylists(response.data.items))
      .catch((error) => {
        console.error("Error fetching playlists:", error);
        alert("Failed to fetch playlists. Please try again.");
      });
  }, [token]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Your Playlists</h1>
      <ul>
        {playlists.length > 0 ? (
          playlists.map((playlist, index) => (
            <li key={index}>{playlist.name}</li>
          ))
        ) : (
          <p>No playlists found.</p>
        )}
      </ul>
    </div>
  );
}

export default PlaylistList;

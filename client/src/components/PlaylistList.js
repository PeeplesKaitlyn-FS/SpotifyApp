import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000";

function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/playlists`, { withCredentials: true })
      .then((res) => setPlaylists(res.data.items))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch playlists.");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!playlists.length) return <div>Loading playlists...</div>;

  return (
    <div className="playlist-container">
      <h2>Your Playlists</h2>
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

export default PlaylistList;

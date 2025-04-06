import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000";

function TrackList() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/playlists/${id}/tracks`, { withCredentials: true })
      .then((res) => setTracks(res.data.items))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch tracks.");
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!tracks.length) return <div>Loading tracks...</div>;

  return (
    <div className="tracklist-container">
      <h2>Tracks</h2>
      <ul>
        {tracks.map((item) => (
          <li key={item.track.id}>
            {item.track.name} - {item.track.artists.map(a => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;

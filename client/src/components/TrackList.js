import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const token = localStorage.getItem("accessToken");

  const fetchSavedTracks = async (url = "http://localhost:3000/me/tracks") => {
    if (!token) return;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 20, offset: 0 },
      });
      setTracks((prev) => [...prev, ...response.data.items]);
      setNextUrl(response.data.next);
    } catch (err) {
      setError(`Failed to fetch tracks: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedTracks();
  }, []);

  return (
    <div>
      <h1>Your Saved Tracks</h1>
      {loading && <p>Loading your saved tracks...</p>}
      {error && <p>{error}</p>}
      <ul>
        {tracks.map((track) => (
          <li key={track.track.id}>
            <strong>{track.track.name}</strong> by {track.track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
      {nextUrl && !loading && <button onClick={() => fetchSavedTracks(nextUrl)}>Load more</button>}
    </div>
  );
};

export default TrackList;
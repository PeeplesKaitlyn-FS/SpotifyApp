import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../App.css';

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const token = localStorage.getItem("accessToken");
  const { id } = useParams();

  const fetchTracks = useCallback(async (url = `https://api.spotify.com/v1/playlists/${id}/tracks`) => {
    if (!token) return;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 20, offset: 0 },
      });
      setTracks((prev) => [...prev, ...response.data.items]);
      setNextUrl(response.data.next);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        // Token is invalid or expired, re-authenticate the user
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } else {
        setError(`Failed to fetch tracks: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Tracks in Playlist {id}</h1>
        {loading && <p>Loading tracks...</p>}
        {error && <p>{error}</p>}
        <ul className="track-list">
          {tracks.map((track, index) => (
            <li key={index}>
              <img src={track.track.album.images[0].url} alt={track.track.name} />
              <strong>{track.track.name}</strong>
              <p>Artist: {track.track.artists[0].name}</p>
            </li>
          ))}
        </ul>
        {nextUrl && !loading && <button onClick={() => fetchTracks(nextUrl)}>Load more</button>}
      </div>
    </div>
  );
};

export default TrackList;
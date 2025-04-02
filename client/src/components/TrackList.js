import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);  

  const fetchSavedTracks = async (url = 'http://localhost:3000/tracks') => {
    try {
      const response = await axios.get(url);  
      setTracks((prevTracks) => [...prevTracks, ...response.data.items]); 

      if (response.data.next) {
        setNextUrl(response.data.next);
      } else {
        setNextUrl(null);  
      }
    } catch (err) {
      setError(`Failed to fetch tracks: ${err.message}`);
      console.error("Error fetching tracks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedTracks();
  }, []);  

  const loadMoreTracks = () => {
    if (nextUrl) {
      setLoading(true); 
      fetchSavedTracks(nextUrl);
    }
  };

  if (loading && !tracks.length) {
    return <div>Loading your saved tracks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Saved Tracks</h1>
      <ul>
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <li key={index}>
              <strong>{track.track.name}</strong> by{" "}
              {track.track.artists.map((artist) => artist.name).join(", ")}
              <br />
              Added on: {new Date(track.added_at).toLocaleString()}
            </li>
          ))
        ) : (
          <li>No saved tracks found.</li>
        )}
      </ul>

      {nextUrl && !loading && (
        <button onClick={loadMoreTracks}>Load more tracks</button>
      )}
    </div>
  );
};

export default TrackList;

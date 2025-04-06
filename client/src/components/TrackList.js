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
      <h2 className="tracklist-heading">Tracks</h2>
      <div className="track-grid">
        {tracks.map((item) => {
          const track = item.track;
          const trackImage = track.album.images[0]?.url; 

          return (
            <div key={track.id} className="track-item">
              <div className="track-image-container">
                {trackImage && <img src={trackImage} alt={track.name} className="track-image" />}
              </div>
              <div className="track-info">
                <span className="track-name">{track.name}</span> -{" "}
                <span className="track-artists">{track.artists.map((a) => a.name).join(", ")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrackList;

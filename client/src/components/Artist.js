import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Artist({ selectedArtist }) {
  const [artistData, setArtistData] = useState({});

  useEffect(() => {
    const fetchArtistData = async () => {
      const response = await axios.get(`/api/artist/${selectedArtist.id}`);
      setArtistData(response.data.artist);
    };
    fetchArtistData();
  }, [selectedArtist]);

  return (
    <div>
      <h1>{artistData.name}</h1>
      <p>{artistData.bio}</p>
      <Link to={`/artist/${selectedArtist.id}/albums`}>
        View Albums
      </Link>
    </div>
  );
}

export default Artist;
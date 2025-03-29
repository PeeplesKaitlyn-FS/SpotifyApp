import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Albums({ selectedArtist }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get(`/api/artist/${selectedArtist.id}/albums`);
      setAlbums(response.data.albums);
    };
    fetchAlbums();
  }, [selectedArtist]);

  return (
    <div>
      <h1>Albums by {selectedArtist.name}</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>
              {album.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Albums;
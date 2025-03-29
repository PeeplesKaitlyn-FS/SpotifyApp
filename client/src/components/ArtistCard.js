import React from 'react';

function ArtistCard({ artist }) {
  return (
    <div>
      <h2>{artist.name}</h2>
      <p>
        <a href={artist.external_urls.spotify}>View on Spotify</a>
      </p>
    </div>
  );
}

export default ArtistCard;
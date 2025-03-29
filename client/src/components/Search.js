import React from 'react';
import { Link } from 'react-router-dom';

function Search({
  query,
  setQuery,
  handleSearch,
  artists,
  handleSelectArtist,
}) {
  return (
    <div>
      <h1>Search for Artists</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for artists"
        />
        <button type="submit">Search</button>
      </form>
      {artists && (
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              <Link to={`/artist/${artist.id}`}>
                {artist.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
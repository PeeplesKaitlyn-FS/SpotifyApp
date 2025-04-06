import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTracks, setTotalTracks] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const tracksPerPage = 10;

  useEffect(() => {
    if (!query.trim()) return;

    const handleSearch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
          params: {
            q: query,
            type: "track",
            limit: tracksPerPage,
            offset: (currentPage - 1) * tracksPerPage,
          },
          withCredentials: true,
        });

        if (response.data.tracks && response.data.tracks.items) {
          setResults(response.data.tracks.items);
          setTotalTracks(response.data.tracks.total);
          setNextPageUrl(response.data.tracks.next);
          setPreviousPageUrl(response.data.tracks.previous);
        } else {
          setError("No tracks found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results.");
      }
    };

    handleSearch();
  }, [query, currentPage]);

  const handlePageChange = (direction) => {
    if (direction === "next" && nextPageUrl) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && previousPageUrl) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="search-container">
      <h2>Search for Tracks</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tracks..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <div>{error}</div>}
      <div className="search-results">
        {results.length > 0 ? (
          <ul>
            {results.map((track) => (
              <li key={track.id}>
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  width="50"
                  height="50"
                />
                <p>{track.name}</p>
                <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>No results found</div>
        )}
      </div>

      {totalTracks > tracksPerPage && (
        <div className="pagination">
          <button
            disabled={!previousPageUrl}
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>
          <span>{currentPage} of {Math.ceil(totalTracks / tracksPerPage)}</span>
          <button
            disabled={!nextPageUrl}
            onClick={() => handlePageChange("next")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;

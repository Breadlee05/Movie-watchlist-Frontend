import React, { useState, useEffect } from "react";
import axios from "axios";
import "./watchlist.css"; // ✅ styling file
import { API_URL } from "../config"; // Make sure this has your deployed backend URL

const Watchlist = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch watchlist
  useEffect(() => {
    if (!token) return;
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/watchlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(res.data.movies);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWatchlist();
  }, [token]);

  // Search movies (OMDb)
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await axios.get(
        `${API_URL}/api/movies/search?query=${searchQuery}`
      );
      setSearchResults(res.data.movies || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Add movie to watchlist
  const addMovie = async (movie) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/watchlist`,
        {
          movieId: movie.movieId,
          title: movie.title,
          poster: movie.poster,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMovies(res.data.movies);
    } catch (err) {
      console.error(err);
    }
  };

  // Remove movie from watchlist
  const removeMovie = async (movieId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/watchlist/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMovies(res.data.movies);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <div className="movie-grid">
            {searchResults.map((movie) => {
              const isInWatchlist = movies.some(
                (m) => m.movieId === movie.movieId
              );
              return (
                <div className="movie-card" key={movie.movieId}>
                  <img
                    src={
                      movie.poster && movie.poster !== "N/A"
                        ? movie.poster
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={movie.title}
                  />
                  <h4>
                    {movie.title} ({movie.year})
                  </h4>
                  {isInWatchlist ? (
                    <button disabled>Added</button>
                  ) : (
                    <button onClick={() => addMovie(movie)}>Add</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Watchlist */}
      <h3>Your Watchlist</h3>
      {movies.length === 0 ? (
        <p>No movies in watchlist</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.movieId}>
              <img
                src={
                  movie.poster && movie.poster !== "N/A"
                    ? movie.poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
              />
              <h4>{movie.title}</h4>
              <button onClick={() => removeMovie(movie.movieId)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

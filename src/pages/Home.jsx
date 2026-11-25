import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../SkeletonCard";

const API_KEY = "da22de3a";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "a-z";

  const [input, setInput] = useState(q);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!q) return;
    let ignore = false;

    async function loadMovies() {
      setLoading(true);
      setMessage("");
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (ignore) return;
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setMessage("No results found.");
        }
      } catch {
        if (!ignore) setMessage("Something went wrong. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadMovies();
    return () => {
      ignore = true;
    };
  }, [q]);

  function handleSearch() {
    if (input.trim()) {
      setSearchParams({ q: input.trim(), sort });
    } else {
      setMovies([]);
      setMessage("No results found.");
    }
  }

  function sortMovies(event) {
    setSearchParams({ q, sort: event.target.value });
  }

  const sortedMovies = [...movies].sort((a, b) =>
    sort === "a-z"
      ? a.Title.localeCompare(b.Title)
      : b.Title.localeCompare(a.Title)
  );

  return (
    <>
      <main>
        <div className="Title">
          <h3>Moovies.com</h3>
        </div>
        <div className="para">
          <p>A huge collection of movies at your fingertips</p>
        </div>
        <section className="search-section">
          <div className="container">
            <div className="search-container">
              <input
                type="text"
                id="searchInput"
                placeholder="Search thousand of movies"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button id="searchBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <select id="filter" value={sort} onChange={sortMovies}>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </section>
      </main>

      <div id="results">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : message ? (
          <p>{message}</p>
        ) : (
          sortedMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>
    </>
  );
}
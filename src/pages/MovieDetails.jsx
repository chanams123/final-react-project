import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = "YOUR_OMDB_KEY";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
      );
      setMovie(await res.json());
    }
    loadMovie();
  }, [id]);

  return (
    <main className="details">
      <button onClick={() => navigate(-1)}>← Back</button>
      {!movie ? (
        <p>Loading...</p>
      ) : (
        <div className="details-content">
          <img src={movie.Poster !== "N/A" ? movie.Poster : ""} alt={movie.Title} />
          <div>
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>IMDb rating:</strong> {movie.imdbRating}</p>
            <p>{movie.Plot}</p>
          </div>
        </div>
      )}
    </main>
  );
}
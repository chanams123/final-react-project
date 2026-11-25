import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Poster"}
        alt={movie.Title}
      />
      <h4>{movie.Title}</h4>
      <p>{movie.Year}</p>
    </Link>
  );
}
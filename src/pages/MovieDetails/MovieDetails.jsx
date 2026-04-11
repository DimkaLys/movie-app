import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useWatchlist from "../../hooks/useWatchlist";
import { getMovieId } from "../../services/tmdb";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { id } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await getMovieId(id);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading)
    return <p style={{ color: "#fff", padding: "32px" }}>Loading...</p>;
  if (!movie) return null;

  return (
    <div style={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={styles.poster}
      />
      <div style={styles.info}>
        <h1 style={styles.title}>{movie.title}</h1>
        <p style={styles.overview}>{movie.overview}</p>
        <p style={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</p>
        <div style={styles.genres}>
          {movie.genres?.map((g) => (
            <span key={g.id} style={styles.genre}>
              {g.name}
            </span>
          ))}
        </div>
        <button
          onClick={() =>
            isInWatchlist(movie.id)
              ? removeFromWatchlist(movie.id)
              : addToWatchlist(movie)
          }
          style={styles.button}
        >
          {isInWatchlist(movie.id)
            ? "Remove from Watchlist"
            : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "32px",
    padding: "32px",
    backgroundColor: "#0a0a0a",
    // minHeight: "100vh",
  },
  poster: { width: "300px", borderRadius: "12px" },
  info: { color: "#fff", flex: 1 },
  title: { fontSize: "32px", marginBottom: "16px" },
  overview: { color: "#aaa", lineHeight: 1.6, marginBottom: "16px" },
  rating: { color: "#f5c518", marginBottom: "16px" },
  genres: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  genre: {
    backgroundColor: "#1c1c1c",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default MovieDetails;

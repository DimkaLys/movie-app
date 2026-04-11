import useWatchlist from "../../hooks/useWatchlist";
import MovieCard from "../../components/MovieCard/MovieCard";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <main style={styles.main}>
        <h1 style={styles.heading}>My Watchlist</h1>
        <p style={styles.empty}>Your watchlist is empty 🎬</p>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <h1 style={styles.heading}>My Watchlist</h1>
      <div style={styles.grid}>
        {watchlist.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <button
              onClick={() => removeFromWatchlist(movie.id)}
              style={styles.button}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  main: { padding: "32px", backgroundColor: "#0a0a0a" },
  heading: { color: "#fff", marginBottom: "24px" },
  empty: {
    color: "#888",
    textAlign: "center",
    padding: "64px",
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "24px",
  },
  button: {
    width: "100%",
    marginTop: "8px",
    padding: "8px",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Watchlist;

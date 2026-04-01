import { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/tmdb";
import MovieCard from "@/components/MovieCard/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await getPopularMovies();
        setMovies(res.data.results);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={styles.message}>{error}</p>;

  return (
    <main style={styles.main}>
      <h1 style={styles.heading}>Popular Movies</h1>
      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
};

const styles = {
  main: { padding: "32px", backgroundColor: "#0a0a0a", minHeight: "100vh" },
  heading: { color: "#fff", marginBottom: "24px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "24px",
  },
  message: { color: "#fff", textAlign: "center", padding: "64px" },
};

export default Home;

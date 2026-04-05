import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../../services/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        const res = debouncedQuery
          ? await searchMovies(debouncedQuery)
          : await getPopularMovies();
        setMovies(res.data.results);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [debouncedQuery]);

  return (
    <main style={styles.main}>
      <h1 style={styles.heading}>
        {debouncedQuery ? `Results for "${debouncedQuery}"` : "Popular Movies"}
      </h1>

      <SearchBar value={query} onChange={setQuery} />

      {loading && <p style={styles.message}>Loading...</p>}
      {error && <p style={styles.message}>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p style={styles.message}>No movies found 😕</p>
      )}

      {!loading && !error && (
        <div style={styles.grid}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
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
  message: {
    color: "#888",
    textAlign: "center",
    padding: "64px",
    fontSize: "18px",
  },
};

export default Home;

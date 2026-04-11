import { useEffect, useState } from "react";
import {
  getGenres,
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
} from "../../services/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import GenreFilter from "../../components/GenreFilter/GenreFilter";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchGenres() {
      const res = await getGenres();
      setGenres(res.data.genres);
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        let res;

        if (debouncedQuery) {
          res = await searchMovies(debouncedQuery);
        } else if (selectedGenre) {
          res = await getMoviesByGenre(selectedGenre);
        } else {
          res = await getPopularMovies();
        }

        setMovies(res.data.results);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedQuery, selectedGenre]);

  return (
    <main style={styles.main}>
      <h1 style={styles.heading}>
        {debouncedQuery ? `Results for "${debouncedQuery}"` : "Popular Movies"}
      </h1>

      <SearchBar value={query} onChange={setQuery} />
      <GenreFilter
        genres={genres}
        selected={selectedGenre}
        onSelect={setSelectedGenre}
      />

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

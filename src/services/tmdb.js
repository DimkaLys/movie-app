import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
});

export const getPopularMovies = () => {
  return tmdb.get("/movie/popular");
};

export const searchMovies = (query) => {
  return tmdb.get("/search/movie", { params: { query } });
};

export const getMovieId = (id) => {
  return tmdb.get(`movie/${id}`, { params: { append_to_response: "videos" } });
};

export const getGenres = () => {
  return tmdb.get("genre/movie/list");
};

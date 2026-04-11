import { Link } from "react-router-dom";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;

  return (
    <Link to={`/movie/${id}`} style={styles.link}>
      <div style={styles.card}>
        <img
          src={poster_path ? `${IMG_BASE}${poster_path}` : "/no-image.png"}
          alt={title}
          style={styles.img}
        />
        <div style={styles.info}>
          <h3 style={styles.title}>{title}</h3>
          <div style={styles.meta}>
            <span style={styles.year}>{release_date?.slice(0, 4)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  link: { textDecoration: "none" },
  card: {
    backgroundColor: "#1c1c1c",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  img: { width: "100%", aspectRatio: "2/3", objectFit: "cover" },
  info: { padding: "12px" },
  title: { color: "#fff", fontSize: "14px", margin: "0 0 8px" },
  meta: { display: "flex", justifyContent: "space-between" },
  rating: { color: "#f5c518", fontSize: "13px" },
  year: { color: "#888", fontSize: "13px" },
};

export default MovieCard;

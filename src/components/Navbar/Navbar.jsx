import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        MovieApp
      </Link>
      <Link to="/watchlist" style={styles.link}>
        My Watchlist
      </Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#141414",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: "#e50914",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default Navbar;

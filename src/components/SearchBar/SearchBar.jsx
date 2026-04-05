const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={styles.input}
    />
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "1px solid #333",
    backgroundColor: "#1c1c1c",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    marginBottom: "32px",
  },
};

export default SearchBar;

const GenreFilter = ({ genres, selected, onSelect }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "24px",
      }}
    >
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: selected === genre.id ? "#e50914" : "#1c1c1c",
            color: "#fff",
          }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;

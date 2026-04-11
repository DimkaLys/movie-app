import { useState } from "react";

function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  function addToWatchlist(movie) {
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  function removeFromWatchlist(id) {
    const updated = watchlist.filter((m) => m.id !== id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  function isInWatchlist(id) {
    return watchlist.some((m) => m.id === id);
  }

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}

export default useWatchlist;

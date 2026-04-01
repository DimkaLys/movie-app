import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import MovieDetails from "@/pages/MovieDetails/MovieDetails";
import WatchList from "@/pages/WatchList/WatchList";
import Navbar from "@/components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </>
  );
}

export default App;

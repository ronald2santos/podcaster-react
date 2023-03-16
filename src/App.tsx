import { Link, Route, Routes } from "react-router-dom";
import Episode from "./pages/Episode";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";

const App = () => {

  return (
    <>
      <Link to={"/"}>
        <h1 className="text-2xl font-bold text-cyan-700">Podcaster</h1>
      </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:podcastId" element={<Podcast />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<Episode />}
        />
      </Routes>
    </>
  );
};

export default App;

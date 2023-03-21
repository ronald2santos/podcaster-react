import { Link, Route, Routes } from "react-router-dom";
import Episode from "./pages/Episode";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import { useDataContext } from "./context/DataContext";
import { Circles } from "react-loader-spinner";
import Error404 from "./pages/Error404";

const App = () => {
  const { loading, error } = useDataContext();
  return (
    <>
      <div className="flex justify-between m-10 pb-2 border-b-2">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold text-cyan-700">Podcaster</h1>
        </Link>
        <Circles
          height="25"
          width="25"
          color="#0E7490"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loading}
        />
      </div>
      {error ? (
        <Error404 />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<Podcast />} />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
    </>
  );
};

export default App;

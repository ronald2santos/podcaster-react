import { Link, Route, Routes } from "react-router-dom";
import Episode from "./pages/Episode";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import { useLoading } from "./context/loadingContext";
import { Circles } from "react-loader-spinner";
import { EPISODE_PAGE_ROUTE, PODCAST_PAGE_ROUTE } from "./constants";

const App = () => {
  const { loading } = useLoading();
  return (
    <>
      <div className="flex justify-between m-10">
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={PODCAST_PAGE_ROUTE} element={<Podcast />} />
        <Route
          path={PODCAST_PAGE_ROUTE + EPISODE_PAGE_ROUTE}
          element={<Episode />}
        />
      </Routes>
    </>
  );
};

export default App;

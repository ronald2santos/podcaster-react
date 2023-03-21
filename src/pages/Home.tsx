import PodcastListCard from "../components/PodcastListCard";
import { TOP_PODCASTS_URL } from "../constants";
import { useLoading } from "../context/loadingContext";
import { usePodcastList } from "../hooks/usePodcastList";

const Home = () => {
  const { top100Podcasts, filterPodcasts } = usePodcastList(TOP_PODCASTS_URL);
  const { loading } = useLoading();

  return (
    <>
      {!top100Podcasts || loading ? null : (
        <div className="flex justify-end m-5 mb-24">
          <span className="px-4 py-2 mr-2 font-semibold rounded bg-cyan-700 text-white">{top100Podcasts.length}</span>
          <input
            onChange={({ target }) => filterPodcasts(target.value)}
            className="pl-2"
            type="text"
            placeholder="Filter podcasts..."
          />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-32 gap-x-6 m-10">
        {!top100Podcasts
          ? null
          : top100Podcasts.map((podcast) => {

              const id = podcast.id.attributes["im:id"];
              const title = podcast["im:name"].label;
              const author = podcast["im:artist"].label;
              const description = podcast.summary.label;
              const imgUrl = podcast["im:image"][2].label;

              return (
                <PodcastListCard
                  key={id}
                  id={id}
                  title={title}
                  author={author}
                  description={description}
                  imgUrl={imgUrl}
                />
              );
            })}
      </div>
    </>
  );
};

export default Home;

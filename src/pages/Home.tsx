import PodcastListCard from "../components/PodcastListCard";
import { TOP_PODCASTS_URL } from "../constants";
import { useLoading } from "../context/loadingContext";
import { usePodcastList } from "../hooks/usePodcastList";

const Home = () => {
  const { top100Podcasts, filterPodcasts } = usePodcastList(TOP_PODCASTS_URL)
  const { loading } = useLoading();
  return (
    <>
    {console.log(top100Podcasts)}
      {!top100Podcasts || loading ? null : (
        <div className="flex justify-end m-5 mb-24">
          <input
            onChange={({ target }) => filterPodcasts(target.value)}
            className="pl-1"
            type="text"
            placeholder="Filter podcasts..."
          />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-32 gap-x-6 m-10">
        {!top100Podcasts
          ? null
          : top100Podcasts.map((podcast) => {
              return (
                <PodcastListCard
                  key={podcast.id.attributes["im:id"]}
                  id={podcast.id.attributes["im:id"]}
                  title={podcast["im:name"].label}
                  author={podcast["im:artist"].label}
                  description={podcast.summary.label}
                  imgUrl={podcast["im:image"][2].label}
                />
              );
            })}
      </div>
    </>
  );
};

export default Home;

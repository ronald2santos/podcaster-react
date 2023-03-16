import { useEffect, useState } from "react";
import PodcastListCard from "../components/PodcastListCard";
import { PodcastServerList } from "../types";

const Home = () => {
  const allowOriginURL = "https://api.allorigins.win/get?url=";
  const baseUrl =
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
  const [top100Podcasts, setTop100Podcasts] = useState<PodcastServerList[]>([]);

  const getTopPodcasts = async () => {
    try {
      const response = await fetch(
        allowOriginURL + encodeURIComponent(baseUrl)
      );
      const results = await response.json();
      const data = JSON.parse(results.contents);
      const podcasts: PodcastServerList[] = data.feed.entry;
      console.log(podcasts);
      setTop100Podcasts(podcasts);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopPodcasts();
  }, []);

  return (
    <>
      {!top100Podcasts ? null : (
        <div className="flex justify-end m-5 mb-24">
          <input
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

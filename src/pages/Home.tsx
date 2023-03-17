import { useEffect, useState } from "react";
import PodcastListCard from "../components/PodcastListCard";
import { useLoading } from "../context/loadingContext";
import { PodcastServerList } from "../types";

const Home = () => {
  const allowOriginURL = "https://api.allorigins.win/get?url=";
  const baseUrl = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
  const [top100Podcasts, setTop100Podcasts] = useState<PodcastServerList[]>([]);

  const { setLoading } = useLoading();

  const getTopPodcasts = async () => {
    try {
      setLoading(true);
      const response = await fetch(allowOriginURL + encodeURIComponent(baseUrl));
      const results = await response.json();
      const data = JSON.parse(results.contents);
      const podcasts: PodcastServerList[] = data.feed.entry;
      setTop100Podcasts(podcasts);
      localStorage.setItem("topPodcasts", JSON.stringify(podcasts));
      localStorage.setItem("listExpirationDate", getExpirationDate());
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getExpirationDate = () => {
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 1);
    return expirationDate.toString();
  };

  const filterPodcasts = (searchText: string) => {
    const savedPodcasts: PodcastServerList[] = JSON.parse(localStorage.getItem("topPodcasts") || "[]");
    if (searchText === "") {
      setTop100Podcasts(savedPodcasts);
    } else {
      const filteredPodcasts: PodcastServerList[] = savedPodcasts.filter(
        (podcast: any) => {
          const title = podcast["im:name"].label.toLowerCase();
          const author = podcast["im:artist"].label.toLowerCase();
          return title.includes(searchText.toLowerCase()) || author.includes(searchText.toLowerCase())
        }
      );
      setTop100Podcasts(filteredPodcasts);
    }
  };

  useEffect(() => {
    const expirationDateString = localStorage.getItem("listExpirationDate");
    if (expirationDateString && new Date(expirationDateString) > new Date()) {
      const savedPodcasts = JSON.parse(localStorage.getItem("topPodcasts") || "[]");
      setTop100Podcasts(savedPodcasts);
    } else { getTopPodcasts(); }
  }, []);

  return (
    <>
      {!top100Podcasts ? null : (
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

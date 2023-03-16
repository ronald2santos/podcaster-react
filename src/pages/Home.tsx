import { useEffect, useState } from "react";
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
      console.log(podcasts)
      setTop100Podcasts(podcasts);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopPodcasts();
  }, []);

  return <div>Home</div>;
};

export default Home;

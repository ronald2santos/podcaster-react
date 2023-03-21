import { useState, useEffect } from "react";
import { getExpirationDate } from "../services/DateFormatService";
import { useLoading } from "../context/loadingContext";
import { PodcastServerList } from "../types";
import { getTopPodcasts } from "../services/PodcastListService";

export const usePodcastList = (query: string) => {
  const [top100Podcasts, setTop100Podcasts] = useState<PodcastServerList[]>([]);
  const { setLoading } = useLoading();

  // Get data from api and set to local storage
  const cacheLocalPodcastList = async (query: string) => {
    setLoading(true);
    const podcastTop100List = await getTopPodcasts(query);
    setLoading(false);
    if(!podcastTop100List) return
    /// Local Storage and Set State
    localStorage.setItem("topPodcasts", JSON.stringify(podcastTop100List));
    localStorage.setItem("listExpirationDate", getExpirationDate());
    setTop100Podcasts(podcastTop100List as PodcastServerList[]);
  };

  const filterPodcasts = (searchText: string) => {
    const savedPodcasts: PodcastServerList[] = JSON.parse(localStorage.getItem("topPodcasts") || "[]");
    if (searchText === "") {
      setTop100Podcasts(savedPodcasts);
    } else {
      const filteredPodcasts: PodcastServerList[] = savedPodcasts.filter(
        (podcast: PodcastServerList) => {
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
      const savedPodcasts = JSON.parse(
        localStorage.getItem("topPodcasts") || "[]"
      );
      setTop100Podcasts(savedPodcasts);
    } else {
      cacheLocalPodcastList(query);
    }
  }, [query]);

  return { top100Podcasts, filterPodcasts };
};

import { useState, useEffect } from "react";
import { getExpirationDate } from "../services/DateFormatService";
import { getPodcastData } from "../services/PodcastDataService"
import { EpisodeServerData, PodcastServer, PodcastServerData } from "../types";
import { useDataContext } from "../context/DataContext";

export const usePodcastData = (
  query: string,
  description: string,
  podcastId: string
) => {
  const [podcastData, setPodcastData] = useState<PodcastServerData>();
  const [podcastEpisodes, setPodcastEpisodes] = useState<EpisodeServerData[]>();
  const { setLoading, setError } = useDataContext();

  const cacheLocalPodcast = async (query: string, description: string, podcastId: string) => {
    setLoading(true);
    setError(false);
    // Call to PodcastDataService
    const podcastArray = await getPodcastData(query);
    setLoading(false);
    if (!podcastArray) {
      setError(true);
      return;
    }
    /// Local Storage and Set State
    const localPodcast = {
      podcast: podcastArray,
      description: description,
      expirationDate: getExpirationDate(),
    };
    localStorage.setItem(podcastId, JSON.stringify(localPodcast));
    setPodcastData(podcastArray[0] as PodcastServerData);
    setPodcastEpisodes(podcastArray.slice(1, podcastArray.length) as EpisodeServerData[]);
  };

  useEffect(() => {
    const localPodcast = localStorage.getItem(podcastId);
    const podcastExpirationDate = localPodcast ? JSON.parse(localPodcast).expirationDate : undefined;
    if (localPodcast && new Date(podcastExpirationDate) > new Date()) {
      const podcastArray: PodcastServer = JSON.parse(localPodcast).podcast;
      setPodcastData(podcastArray[0] as PodcastServerData);
      setPodcastEpisodes(podcastArray.slice(1, podcastArray.length) as EpisodeServerData[]);
    } else {
      cacheLocalPodcast(query, description, podcastId);
    }
  }, [query]);

  return { podcastData, podcastEpisodes };
};

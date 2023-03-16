import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import EpisodeList from "../components/EpisodeList";
import PodcastDetail from "../components/PodcastDetail";
import { EpisodeServerData, PodcastParams, PodcastServerData } from "../types";

const Podcast = () => {
  const allowOriginURL = "https://api.allorigins.win/get?url=";
  const [podcastData, setPodcastData] = useState<PodcastServerData>();
  const [podcastEpisodes, setPodcastEpisodes] = useState<EpisodeServerData[]>();
  const { podcastId } = useParams<keyof PodcastParams>() as PodcastParams;
  const baseUrl = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;

  /// Description value is not available in podcast data and episode list endpoint, so passing it as state from podcast top100 list data
  const { state } = useLocation();

  const getExpirationDate = () => {
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 1);
    return expirationDate.toString();
  };

  const getPodcastData = async () => {
    try {
      const response = await fetch(allowOriginURL + encodeURIComponent(baseUrl));
      const results = await response.json();
      const data = JSON.parse(results.contents);
      const podcastArray = data.results;
      console.log(podcastArray);
      const localPodcast = {
        podcast: podcastArray,
        description: state.description,
        expirationDate: getExpirationDate(),
      };
      localStorage.setItem(podcastId, JSON.stringify(localPodcast));
      /// Podcast info data comes as the first element in the array of episodes
      setPodcastData(podcastArray[0]);
      /// We cut out the podcast data and we keep the episodes only
      setPodcastEpisodes(podcastArray.slice(1, podcastArray.length));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => { 
    const localPodcast = localStorage.getItem(podcastId);
    const podcastExpirationDate = localPodcast ? JSON.parse(localPodcast).expirationDate : undefined;

    if (localPodcast && new Date(podcastExpirationDate) > new Date()) {
      const podcastArray = JSON.parse(localPodcast).podcast;
      setPodcastData(podcastArray[0]);
      setPodcastEpisodes(podcastArray.slice(1, podcastArray.length));
    } else {
        getPodcastData();
    } 
  }, [podcastId]);

  return (
    <div>
      {!podcastData ? null : (
        <div className="lg:flex">
          <PodcastDetail
            title={podcastData.collectionName}
            author={podcastData.artistName}
            imgUrl={podcastData.artworkUrl600}
            description={state.description}
          />
          {!podcastEpisodes ? null : (
            <EpisodeList
              episodeList={podcastEpisodes}
              episodeCount={podcastData.trackCount}
              /// Added to get podcast data from localStorage for next view in Episode Page
              podcastId={podcastId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Podcast;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EpisodeServerData, PodcastParams, PodcastServerData } from "../types";

const Podcast = () => {
    const allowOriginURL = "https://api.allorigins.win/get?url=";
    const [podcastData, setPodcastData] = useState<PodcastServerData>();
    const [podcastEpisodes, setPodcastEpisodes] = useState<EpisodeServerData[]>();
    const { podcastId } = useParams<keyof PodcastParams>() as PodcastParams;
    const baseUrl = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;

    const getPodcastData = async () => {
        try {
          const response = await fetch(allowOriginURL + encodeURIComponent(baseUrl));
          const results = await response.json();
          const data = JSON.parse(results.contents);
          const podcastArray = data.results;
          console.log(podcastArray)
          /// Podcast info data comes as the first element in the array of episodes
          setPodcastData(podcastArray[0]);
          /// We cut out the podcast data and we keep the episodes only
          setPodcastEpisodes(podcastArray.slice(1, podcastArray.length));
        } catch (error: any) {
          console.log(error);
        }
      };

      useEffect(() => {
          getPodcastData();
      }, [podcastId]);


  return (
    <div>Podcast</div>
  )
}

export default Podcast
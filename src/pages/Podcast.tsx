
import { useLocation, useParams } from "react-router-dom";
import EpisodeList from "../components/EpisodeList";
import PodcastDetail from "../components/PodcastDetail";
import { usePodcastData } from "../hooks/usePodcastData";
import { PodcastParams } from "../types";

const Podcast = () => {
  const { podcastId } = useParams<keyof PodcastParams>() as PodcastParams;
  const baseUrl = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;

  /// Description value is not available in podcast data and episode list endpoint, so passing it as state from podcast top100 list data
  const { state } = useLocation();
  const { podcastData , podcastEpisodes } = usePodcastData(baseUrl, state?.description, podcastId)

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

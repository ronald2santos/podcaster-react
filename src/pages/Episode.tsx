import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EpisodeDetail from "../components/EpisodeDetail";
import PodcastDetail from "../components/PodcastDetail";

const Episode = () => {
  const { state } = useLocation()
  const [podcastDetail, setPodcastDetail] = useState<any>()

  useEffect(() => {
    const localPodcast = localStorage.getItem(state.podcastId)
    const parsedPodcastData = localPodcast ? JSON.parse(localPodcast) : null
    setPodcastDetail(parsedPodcastData)
  }, [])

  return (
    <div className="lg:flex">
        {!podcastDetail ? null : <PodcastDetail title={podcastDetail.podcast[0].collectionName} author={podcastDetail.podcast[0].artistName} description={podcastDetail.description} imgUrl={podcastDetail.podcast[0].artworkUrl600} /> }
        {!podcastDetail ? null : <EpisodeDetail title={state.episodeTitle} description={state.episodeDescription} episodeUrl={state.episodeUrl}/> }
    </div>
  )
}

export default Episode
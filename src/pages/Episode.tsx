import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EpisodeDetail from "../components/EpisodeDetail";
import PodcastDetail from "../components/PodcastDetail";
import { LocalStoragePodcast } from "../types";

const Episode = () => {
  const { state } = useLocation()
  const { episodeTitle, episodeDescription, episodeUrl } = state
  const [podcastDetail, setPodcastDetail] = useState<LocalStoragePodcast>()

  useEffect(() => {
    const localPodcast = localStorage.getItem(state.podcastId)
    const parsedPodcastData = localPodcast ? JSON.parse(localPodcast) : null
    setPodcastDetail(parsedPodcastData)
  }, [])

  const title  = podcastDetail?.podcast[0].collectionName ?? "Title"
  const author  = podcastDetail?.podcast[0].artistName ?? "Author"
  const description = podcastDetail?.description ?? "Description"
  const imgUrl =  podcastDetail?.podcast[0].artworkUrl600 ?? "Not Found"

  return (
    
    <div className="lg:flex">
        {!podcastDetail ? null : <PodcastDetail title={title} author={author} description={description} imgUrl={imgUrl} /> }
        {!podcastDetail ? null : <EpisodeDetail title={episodeTitle} description={episodeDescription} episodeUrl={episodeUrl}/> }
    </div>
  )
}

export default Episode
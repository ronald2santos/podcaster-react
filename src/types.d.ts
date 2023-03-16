type PodcastServerList = {
    "im:artist": Object<any>;
    "im:name": Object<any>;
    "im:image": Object<any>;
    summary: Object<any>;
    id: Object<any>;
};

type PodcastCard = {
    id: string;
    title: string;
    author: string;
    description: string;
    imgUrl: string;
};

type PodcastDetail = Omit<PodcastCard, "id">

type PodcastServerData = {
    artistName: string;
    collectionName: string;
    trackCount: number;
    artworkUrl600: string;
  };
  
  type EpisodeServerData = {
    trackId: number;
    trackName: string;
    description: string;
    releaseDate: string;
    previewUrl: string;
    trackTimeMillis: number;
    artworkUrl600: string;
  };

  type PodcastParams = {
    podcastId: string;
  };

  type EpisodeList = {
    episodeList: EpisodeServerData[];
    episodeCount: number;
    podcastId: string
  };

  type EpisodeDetail = {
    title: string;
    description: string;
    episodeUrl: string;
  };

export {PodcastServerList, PodcastCard, PodcastDetail, PodcastServerData, EpisodeServerData, EpisodeList, EpisodeDetail, PodcastParams}
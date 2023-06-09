export const ALLOW_ORIGIN_URL:string = "https://api.allorigins.win/get?url=";
export const TOP_PODCASTS_URL:string = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
export const PODCAST_PAGE_ROUTE:string = "/podcast/:podcastId"
export const EPISODE_PAGE_ROUTE:string = "/episode/:episodeId"
export const URL_REGEX: RegExp =
/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
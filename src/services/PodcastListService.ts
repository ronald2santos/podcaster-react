import { ALLOW_ORIGIN_URL } from "../constants";
import { PodcastServerList } from "../types";

export const getTopPodcasts = async (baseUrl: string) => {
  try {
    const response = await fetch(
      ALLOW_ORIGIN_URL + encodeURIComponent(baseUrl)
    );
    const results = await response.json();
    const data = JSON.parse(results.contents);
    const podcasts: PodcastServerList[] = data.feed.entry;
    return podcasts;
  } catch (error: unknown) {
    console.log(error);
  }
};

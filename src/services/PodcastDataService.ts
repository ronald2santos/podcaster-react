import { ALLOW_ORIGIN_URL } from "../constants";
import { PodcastServer } from "../types";

export const getPodcastData = async (baseUrl: string) => {
  try {
    const response = await fetch(
      ALLOW_ORIGIN_URL + encodeURIComponent(baseUrl)
    );
    const results = await response.json();
    const data = JSON.parse(results.contents);
    const podcastArray: PodcastServer = data.results;
    return podcastArray;
  } catch (error: unknown) {
    console.log(error);
  }
};

import { EpisodeList as EpisodeListType } from "../types";
import { Link } from "react-router-dom";
import { formatDate, formatDuration } from "../services/DateFormatService";

// Added podcastId prop to get podcast data from localStorage for next view in Episode Page
const EpisodeList = ({ episodeList, episodeCount, podcastId }: EpisodeListType) => {
  return (
    <div className="m-10 text-xs lg:text-sm lg:w-3/4 2xl:text-base">
      <h2 className="text-lg lg:text-2xl font-bold mb-5 p-3 shadow-md">Episodes: {episodeCount}</h2>
      <div className="w-full p-5 shadow-md">
      <table>
        <thead >
          <tr >
            <th className="pb-1 p-10 pt-5 text-left">Title</th>
            <th className="pb-1 p-10 pt-5 pl-0 text-right">Date</th>
            <th className="pb-1 p-10 pt-5 pl-10 text-right">Duration</th>
          </tr>
        </thead>
        <tbody>
          {!episodeList
            ? null
            : episodeList.map((episode) => {
                return (
                  <tr key={episode.trackId} className="odd:bg-slate-100 border-b-2">
                    <td className="pt-1 pb-1 pl-10 pr-10 w-full">
                      <Link
                        to={`episode/${encodeURIComponent(episode.trackId)}`}
                        relative="path"
                        className="text-cyan-600"
                        state={{
                            episodeTitle: episode.trackName,
                            episodeDescription: episode.description,
                            episodeUrl: episode.previewUrl,
                            // Passing it as state to get podcast data from localStorage in Episode page
                            podcastId: podcastId
                          }}
                      >
                        {episode.trackName}
                      </Link>
                    </td>
                    <td>{formatDate(episode.releaseDate)}</td>
                    <td className="text-center">{formatDuration(episode.trackTimeMillis)}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default EpisodeList;
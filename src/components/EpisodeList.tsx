import { EpisodeList as EpisodeListType } from "../types";
import { Link } from "react-router-dom";

const EpisodeList = ({ episodeList, episodeCount }: EpisodeListType) => {
  
  const formatDate = (releaseDate: string): string => Intl.DateTimeFormat("en-US").format(new Date(releaseDate));
  
  const formatDuration = (durationMs: number): string => {
    const hours = (Math.floor(durationMs / 3600000) % 24).toString().padStart(2, "0");
    const minutes = (Math.floor(durationMs / 60000) % 60).toString().padStart(2, "0");
    const seconds = (Math.floor(durationMs / 1000) % 60).toString().padStart(2, "0");
    if (hours === "00") return `${minutes}:${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
  };

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
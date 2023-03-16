import { EpisodeDetail as EpisodeDetailType } from "../types";

const EpisodeDetail = ({
  title,
  description,
  episodeUrl,
}: EpisodeDetailType) => {
  
  return (
    <div className="m-10 p-5 shadow-md h-fit text-xs md:text-sm lg:text-base lg:w-3/4 ">
      <h2 className="text-lg lg:text-2xl font-bold">{title}</h2>
      <p className="italic">{description}</p>
      <audio className="mt-5 w-full" src={episodeUrl} controls></audio>
    </div>
  );
};

export default EpisodeDetail;

import { Link } from "react-router-dom";
import { PodcastCard } from "../types";

const PodcastListCard = ({ id, title, author, description, imgUrl } : PodcastCard) => {
  return (
    <Link
      to={{
        pathname: `/podcast/${encodeURIComponent(id)}`,
      }}
      state={{ description: description }}
      className="flex-col border-t-2 justify-center space-y-2 cursor-pointer shadow-md p-5 h-fit pb-0"
    >
      <div className="flex justify-center">
        <img
          className="rounded-full relative bottom-20"
          src={imgUrl}
          alt={title}
          width="170"
          height="170"
        />
      </div>
      <div className="relative bottom-20">
        <h3 className="text-sm font-bold text-center md:text-lg">{title}</h3>
        <h5 className="text-xs -mb-16 text-center md:text-sm text-">
          Author: {author}
        </h5>
      </div>
    </Link>
  );
};

export default PodcastListCard;

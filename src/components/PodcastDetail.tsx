import { PodcastDetail as PodcastDetailType } from "../types";

const PodcastDetail = ({
  title,
  author,
  description,
  imgUrl,
}: PodcastDetailType) => {
  return (
    <div className="flex flex-col items-center m-auto w-1/2 h-full p-5 shadow-md text-xs md:text-sm lg:m-10 lg:w-1/4 2xl:text-base">
      <img src={imgUrl} alt={title} width="170" height="170" />
      <span className="pt-5 w-full border-b-2"></span>
      <div className="w-full text-left mt-5">
        <h3 className="font-bold">{title}</h3>
        <p className="italic">by {author}</p>
      </div>
      <span className="pt-5 w-full border-b-2"></span>
      <div className="mt-5">
        <h3 className="font-bold">Description</h3>
        <p className="italic">{description}</p>
      </div>
    </div>
  );
};

export default PodcastDetail;
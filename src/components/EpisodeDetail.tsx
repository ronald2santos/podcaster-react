import { EpisodeDetail as EpisodeDetailType } from "../types";
import parse from "html-react-parser";

const EpisodeDetail = ({
  title,
  description,
  episodeUrl,
}: EpisodeDetailType) => {

  const interpretHtmlLinks = (input: string) => {
    const urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    const matches = input.match(urlRegex);

    let output = input;

    if (matches) {
      for (let match of matches) {
        if (match[0] === "w") {
          /// handle no protocol especified links for external url
          output = output.replace(
            match,
            `<a href="//${match}" target="_blank" style="color:#0891b2; text-decoration: underline">${match}</a>`
          );
        } else {
          output = output.replace(
            match,
            `<a href="${match}" target="_blank" style="color:#0891b2; text-decoration: underline">${match}</a>`
          );
        }
      }
    }
    return parse(output);
  };
  
  return (
    <div className="m-10 p-5 shadow-md h-fit text-xs md:text-sm lg:text-base lg:w-3/4 ">
      <h2 className="text-lg lg:text-2xl font-bold">{title}</h2>
      <p className="italic">{interpretHtmlLinks(description)}</p>
      <audio className="mt-5 w-full" src={episodeUrl} controls></audio>
    </div>
  );
};

export default EpisodeDetail;

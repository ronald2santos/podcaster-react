import parse from "html-react-parser";
import { URL_REGEX } from "../constants";

export const interpretHtmlLinks = (input: string) => {
   
    const matches = input.match(URL_REGEX);

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
import { sourcesData } from "../data/sources";
import { getBrowserLang } from "./lang";

export const getSources = () => {

  const lang = getBrowserLang();

  return sourcesData.map(s => ({
    ...s,
    title: s.title?.[lang] || s.title?.tr || s.title?.en
  }));
};
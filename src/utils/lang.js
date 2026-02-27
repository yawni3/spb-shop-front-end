import { globalLang } from "../data/globalLang";

export const getBrowserLang = () => {
    const lang  = navigator.language || navigator.userLanguage;
    if (!lang) return "tr";

    if (lang.startsWith("en")) return "en";
    return "tr";
};

export const t = (obj) =>{
    const lang = getBrowserLang();
    return obj?.[lang] || obj?.en || "";
};
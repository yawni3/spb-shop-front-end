import { projects } from "../data/projects";
import { getBrowserLang } from "./lang";

export const getProjectPreview = () => {
    const lang = getBrowserLang();

    return projects.map((p) => ({
        id: p.id,
        // ?. ekleyerek title veya shortDesc yoksa patlamasını engelliyoruz
        title: p.title?.[lang] || p.title?.en || "No Title",
        shortDesc: p.shortDesc?.[lang] || p.shortDesc?.en || "",
        cover: p.cover,
        stage: p.stage,
        tags: p.tags
    }));
};

export const getProjectById = (id) => {
    const lang = getBrowserLang();
    const project = projects.find((p) => p.id === id);

    if (!project) return null;

    return {
        id: project.id,
        // Burada da aynı şekilde güvenli okuma yapıyoruz
        title: project.title?.[lang] || project.title?.en || "No Title",
        description: project.description?.[lang] || project.description?.en || "",
        shortDesc: project.shortDesc?.[lang] || project.shortDesc?.en || "",
        cover: project.cover,
        stage: project.stage,
        link: project.link,
        tags: project.tags 
    };
};

export const getCoverImage = (project) => {
    return project.image?.cover || "/images/default-cover.png";
};

export const getProjectImages = (project) => {
    return project.images?.pages || [];
};
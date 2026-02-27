import { getProjectPreview } from "../utils/projectUtils";
import ProjectPreview from "./projectPreview";
import './style/projectCarousel.css'
import { useCarouselAnimation } from "./utils/carouselAnimation";


const ProjectCarousel = () => {

    useCarouselAnimation(".project-carousel", 10000);

    const projects = getProjectPreview();

    return (
        <div className="project-carousel">

            {projects.map((project) =>(
                <ProjectPreview key={project.id}
                {...project}
                />
            ))}
        </div>
    );
    
};

export default ProjectCarousel;


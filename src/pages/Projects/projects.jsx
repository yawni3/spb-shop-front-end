import { getProjectPreview } from "../../utils/projectUtils";
import ProjectPreview from "../../components/projectPreview";
import { globalLang } from "./../../data/globalLang";
import { t } from "../../utils/lang";


const Projects = () => {
    const projects = getProjectPreview();

   
    return (
        <div className="page-projects">


            <h1 className="project-header">{t(globalLang.headers.projects)}</h1>
            <div className="project-divider"> 🐾 ✦ 🫐 ✦ 🍄</div>

           

        <div  className="projects-grid">
        {projects.map(p => (
        <ProjectPreview key={p.id} {...p} />
    ))}
    </div>
     </div>
)};

export default Projects;
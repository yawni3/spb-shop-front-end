import { Link } from "react-router-dom";
import dino from "../assets/img/dino.png";
import './style/projectPreview.css'


const ProjectPreview = ({ id, title, shortDesc, cover }) => {
  return (
    <Link to={`/projects/${id}`} className="project-card">

      <div className="project-cover">
        {cover ? (
          <img src={cover} alt={title} />
        ) : (
          <div className="cover-placeholder">
            <img src={dino} alt="no cover" />
            <span>Cover not found yet</span>
          </div>
        )}
      </div>

      <div className="project-info">
        <h3>{title}</h3>
        <p>{shortDesc}</p>
      </div>

    </Link>
  );
};

export default ProjectPreview;

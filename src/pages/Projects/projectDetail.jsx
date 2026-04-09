import { useParams } from "react-router-dom";
import { useState } from "react";
import { getProjectById } from "../../utils/projectUtils";
import { stageMap } from "../../utils/stageConfig";
import FeedbackModal from "../../components/FeedbackModal";
import dino from "../../assets/img/dino.png";
import feedbackImg from "../../assets/tiramisufeedback.png";
import meowSound from "../../assets/sounds/catmeow.mp3";
import "../../components/style/projectDetail.css";
import "../../components/style/feedback.css";
import { globalLang } from "../../data/globalLang";
import { t } from "../../utils/lang";
import './../../components/style/sharedBtn.css'

const ProjectDetail = () => {

  const { id } = useParams();
  const project = getProjectById(id);

  const [open, setOpen] = useState(false);
  const [btnText, setBtnText] = useState("Feed me! 🧁");

  if (!project) return <p>Project not found</p>;

  const { title, description, cover, stage, tags, link, externalButtons } = project;

  const stageData = stageMap[stage?.toLowerCase()];


  const handleClick = () => {

    const audio = new Audio(meowSound);
    audio.play().catch(() => {});

    setBtnText("Meow!");
    setOpen(true);

    setTimeout(() => setBtnText("Feed me! 🧁"), 2000);
  };


  return (
    <div className="project-detail">

      <div className="project-cover">

        {stageData && (
          <span className={`stage ${stageData.className}`}>
            {stageData.label}
          </span>
        )}

        {cover ? (
          <img src={cover} alt={title} />
        ) : (
          <div className="cover-placeholder">
            <img src={dino} alt="no cover" />
          </div>
        )}

      </div>


      <h1 className="project-header">{title}</h1>

      <div className="project-divider">
        🐾 ✦ 🫐 ✦ 🍄
      </div>

      <p>{description}</p>


      <div className="tags">
        {tags?.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-actions">
      {link && (
        <a className="project-btn pixel-btn" href={link} target="_blank" rel="noreferrer">
         {t(globalLang.buttons.viewprojectbtn)}
        </a>
      )}



      {/* DİNAMİK BUTONLAR: Burada diğer tüm butonları renderlıyoruz */}
      {externalButtons?.map((btn, index) =>(
        <a key={index} className={`project-btn pixel-btn secondary-btn ${btn.type}`} href={btn.url} target="_blank" rel="noreferrer">{t(btn.label)} </a>
      ))}
    </div>
      <button className="feedback-btn" onClick={handleClick}>
        <img src={feedbackImg} alt="feedback" />
        <span className="feedback-text">{btnText}</span>
      </button>


      <FeedbackModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
};

export default ProjectDetail;
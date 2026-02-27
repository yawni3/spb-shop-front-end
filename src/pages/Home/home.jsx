import { useState } from "react";
import Hero from "../../components/Hero";
import ProjectCarousel from "../../components/projectCarousel";
import AboutPreview from "../../components/aboutPreview";
import SourcesPreview from "../../components/sourcesPreview";
import FeedbackModal from "../../components/FeedbackModal";
import feedbackImg from "../../assets/tiramisufeedback.png";
import meowSound from "../../assets/sounds/catmeow.mp3";
import { useSectionScroll } from "../../components/utils/useSectionScroll";
import { globalLang } from "../../data/globalLang";
import { t } from "../../utils/lang";
import '../../components/style/Home.css';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [btnText, setBtnText] = useState("Feed me! 🧁");

  const handleClick = () => {
    const audio = new Audio(meowSound);
    audio.play().catch(() => {});
    setBtnText("Meow!");
    setOpen(true);
    setTimeout(() => setBtnText("Feed me! 🧁"), 2000);
  };

  useSectionScroll();

  return (
    <div className="home">

      <section className="home-section hero-section">
        <Hero />
      </section>

      <section className="home-section">
        <h2 className="section-title">{t(globalLang.headers.projects)}</h2>
        <ProjectCarousel />
      </section>

      <section className="home-section item-center">
        <AboutPreview />
      </section>

      <section className="home-section">
        <SourcesPreview />
      </section>

      
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

export default Home;
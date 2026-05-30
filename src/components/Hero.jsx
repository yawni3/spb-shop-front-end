import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import feedbackImg from "../assets/tiramisufeedback.png";
import meowSound from "../assets/sounds/catmeow.mp3";
import pcBanner from "../assets/spb-pc-banner.png";
import mobileBanner from "../assets/spb-mobile-banner.png";
import "./style/hero.css";


const Hero = () => {
  return (
    <>
      {/* V2 YAKINDA BANT */}
      <div className="v2-ribbon">
        ✨ v2 yakında geliyor &nbsp;·&nbsp; shop &nbsp;·&nbsp; bildirimler &nbsp;·&nbsp; çok daha fazlası ✨
      </div>

      <section className="hero">
        {/* BANNER */}
        <div className="hero-banner">
          <picture>
            <source media="(max-width: 768px)" srcSet={mobileBanner} />
            <img src={pcBanner} alt="Sleepy Pie Bakery" />
          </picture>

          {/* ÇİKOLATA ÇERÇEVE İÇİNE BAŞLIKLAR */}
          <div className="hero-frame-text">
            <h1 className="hero-title section-title">Sleepy Pie Bakery</h1>
            <p className="hero-sub">Cute pixels, cozy world & handmade sweets.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
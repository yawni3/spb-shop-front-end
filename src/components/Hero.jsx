import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import feedbackImg from "../assets/tiramisufeedback.png";
import meowSound from "../assets/sounds/catmeow.mp3";
import "./style/hero.css";

const Hero = () => {


  return (
    <section className="hero">

      <div className="hero-left">

        <h1 className="section-title">
          Sleepy Pie Bakery
        </h1>

        <p className="hero-sub">
          Cute pixels, cozy world & handmade sweets.
        </p>
    

      </div>

    </section>
  );
};

export default Hero;

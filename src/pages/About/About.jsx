import { useNavigate } from "react-router-dom";
import "./About.css";
import AboutBanner from "../../assets/about-banner.png";
import iconDonut from "../../assets/icons/icon-donut.png";
import iconGame from "../../assets/icons/icon-gameboy.png";
import iconWallpaper from "../../assets/icons/icon-wallpaper.png";
import iconAsset from "../../assets/icons/icon-asset-pack.png";
import iconScroll from "../../assets/icons/icon-scroll.png";
import iconGift from "../../assets/icons/icon-gift.png";
import creatorAvatar from "../../assets/creator-avatar.png";

const whatsFresh = [
  { icon: iconDonut, label: "Assets", desc: "Game assets, icons, UI kits and more." },
  { icon: iconGame, label: "Apps & Games", desc: "Cozy tools and playful apps & games." },
  { icon: iconWallpaper, label: "Wallpapers", desc: "Handmade wallpapers for every mood." },
  { icon: iconAsset, label: "Pixel Packs", desc: "Pixel art, tilesets and characters." },
  { icon: iconScroll, label: "Scripts", desc: "Useful scripts and code resources." },
  { icon: iconGift, label: "Freebies", desc: "Free samples from the bakery!" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About ✨</h1>
          <p className="about-hero-welcome">Welcome to Sleepy Pie Bakery!</p>
          <p className="about-hero-desc">
            A cozy digital bakery for creators, artists and dreamers.<br />
            We bake cute assets, apps, wallpapers and tools<br />
            with lots of love and sleepy vibes.
          </p>
        </div>
        <div className="about-hero-img">
          <img src={AboutBanner} alt="Sleepy Pie Bakery" />
        </div>
      </section>

      {/* İKİ KOLON */}
      <div className="about-grid">

        {/* SOL */}
        <div className="about-left">

          {/* OUR STORY */}
          <div className="about-card">
            <h2>Our Story ✨</h2>
            <p>Sleepy Pie Bakery started with a simple dream: to build a warm little corner on the internet.</p>
            <p>A place where creators can find cute, useful and thoughtfully crafted digital goodies — without losing the cozy feeling of handmade art.</p>
            <p>Every product here begins as a small idea, then gets carefully baked into something meaningful.</p>
          </div>

          {/* OUR VISION */}
          <div className="about-card">
            <h2>Our Vision ✨</h2>
            <p>Sleepy Pie Bakery is growing into more than a digital shop.</p>
            <p>The goal is to become a cozy ecosystem where creativity feels playful, warm and inspiring.</p>
            <p>A space where artists, indie developers and creators can discover tools, ideas and experiences made with genuine care.</p>
          </div>

        </div>

        {/* SAĞ */}
        <div className="about-right">

          {/* WHAT'S FRESH */}
          <div className="about-card">
            <h2>What's Fresh Out of the Oven? ✨</h2>
            <div className="fresh-grid">
              {whatsFresh.map((item, i) => (
                <div key={i} className="fresh-item" onClick={() => navigate("/shop")}>
                  <img src={item.icon} alt={item.label} />
                  <p className="fresh-label">{item.label}</p>
                  <p className="fresh-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MEET THE BAKER */}
          <div className="about-card meet-card">
              <h2>Meet the Baker 🍓</h2>
              <div className="meet-content">
                <img src={creatorAvatar} alt="Yawnpie" className="meet-avatar" />
                <div>
                  <p className="meet-text">
                    Hi, I'm Yawnpie — the creator behind Sleepy Pie Bakery.
                    I design cozy digital worlds filled with warmth, playful visuals and handmade experiences.
                  </p>
                  {/* ⭐ DIRECT LINK */}
                  <a 
                    href="https://yawnie.sleepypiebakery.art" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="meet-btn"
                  >
                    ✨ Meet the Creator →
                  </a>
                </div>
              </div>
          </div>

        </div>
      </div>

      {/* ALT BANNER */}
      <div className="about-footer-banner">
        <p>✨ Made with love, pixels and lots of sleepy ideas. 🍓</p>
      </div>

    </div>
  );
};

export default About;
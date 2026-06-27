import { useNavigate } from "react-router-dom";
import pcBanner from "../assets/spb-pc-banner.png";
import mobileBanner from "../assets/spb-mobile-banner.png";
import "./style/hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">

      {/* SOL — metin */}
      <div className="hero-content">
        <p className="hero-welcome">Welcome to</p>
        <h1 className="hero-title">Sleepy Pie Bakery</h1>
        <p className="hero-sub">
          Cute pixels, cozy worlds &<br />handmade digital goodies.
        </p>
        <div className="hero-buttons">
          <button className="btn-shop" onClick={() => navigate("/shop")}>
            🛍️ Shop Now
          </button>
          <button className="btn-free" onClick={() => navigate("/freebies")}>
            🎁 Freebies
          </button>
        </div>
      </div>

      {/* SAĞ — illustration */}
      <div className="hero-illustration">
       <div className="hero-illustration">
       <img 
          src={window.innerWidth <= 768 ? mobileBanner : pcBanner} 
          alt="Sleepy Pie Bakery" 
        />
</div>
      </div>

    </section>
  );
};

export default Hero;
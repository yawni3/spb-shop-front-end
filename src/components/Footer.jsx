import { Link } from "react-router-dom";
import './style/Footer.css';
import iconLogo from "./../assets/icons/icon-storefront.png";
import creatorAvatar from "./../assets/creator-avatar.png";
import { SiInstagram, SiYoutube, SiPinterest, SiItchdotio } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* KOLON 1 — Brand */}
        <div className="footer-col">
          <div className="footer-brand">
            <img src={iconLogo} alt="SPB" />
            <span>Sleepy Pie Bakery</span>
          </div>
          <p className="footer-brand-desc">
            Cozy digital goods made with love by Yawnpie.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/yawn.pie" target="_blank" rel="noopener noreferrer" className="social-btn">
              <SiInstagram />
            </a>
            <a href="https://www.youtube.com/@yawn.pi3" target="_blank" rel="noopener noreferrer" className="social-btn">
              <SiYoutube />
            </a>
            <a href="https://tr.pinterest.com/yawnpie/" target="_blank" rel="noopener noreferrer" className="social-btn">
              <SiPinterest />
            </a>
            <a href="https://yawnpie.itch.io" target="_blank" rel="noopener noreferrer" className="social-btn">
              <SiItchdotio />
            </a>
          </div>
        </div>

        {/* KOLON 2 — Creator */}
        <div className="footer-col">
          <h4>✨ Creator</h4>
          <div className="footer-creator">
            <img src={creatorAvatar} alt="Yawnpie" className="creator-avatar" />
            <div>
              <p className="creator-name">Hi, I'm Yawnpie! 🧙</p>
              <p className="creator-desc">Indie creator & pixel artist. I love baking cozy things for lovely people like you.</p>
              <a 
                href="https://yawnie.sleepypiebakery.art" 
                target="_blank" 
                rel="noopener noreferrer"
                className="creator-link"
              >
                <span>✨</span> Meet the Creator <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* KOLON 3 — Quick Links */}
        <div className="footer-col">
          <h4>🧁 Quick Links</h4>
          <Link to="/shop">🛍️ Shop</Link>
          <Link to="/assets">🍩 Assets</Link>
          <Link to="/apps">🎮 Apps</Link>
          <Link to="/wallpapers">🖼️ Wallpapers</Link>
          <Link to="/freebies">🎁 Freebies</Link>
        </div>

        {/* KOLON 4 — Support */}
        <div className="footer-col">
          <h4>💌 Support</h4>
          <Link to="/about">About</Link>
          <Link to="/faq">❓ FAQ</Link>
          <Link to="/terms">📜 Terms of Use</Link>
          <Link to="/privacy">🔒 Privacy Policy</Link>
          <a href="mailto:sleepypiebakery.contact@gmail.com">📧 Contact Me</a>
          <span className="footer-email">sleepypiebakery.contact@gmail.com</span>
        </div>

      </div>

      {/* ALT SATIR */}
      <div className="footer-bottom">
        <p>© 2026 Sleepy Pie Bakery by Yawnpie 🍓 All rights reserved.</p>
        <p className="footer-made">Made with 🍰 and lots of sleep.</p>
      </div>
    </footer>
  );
};

export default Footer;
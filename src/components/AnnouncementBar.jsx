import { useState } from "react";
import "./style/AnnouncementBar.css";

const announcements = [
  "🍰 New Wallpapers out now!",
  "🎨 Sticker Packs Available!",
  "✨ Cooky's Coming soon!",
  "🎁 Free Pixel Icons available!",
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  if (!visible) return null;

  return (
    <div className="announcement-bar">
      <button
        className="ann-arrow"
        onClick={() => setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length)}
      >
        ‹
      </button>

      <p className="ann-text">{announcements[current]}</p>

      <button
        className="ann-arrow"
        onClick={() => setCurrent((prev) => (prev + 1) % announcements.length)}
      >
        ›
      </button>

      <button className="ann-close" onClick={() => setVisible(false)}>✕</button>
    </div>
  );
};

export default AnnouncementBar;
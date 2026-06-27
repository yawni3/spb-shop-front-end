import { useEffect, useState } from "react";
import Hero from "../../components/Hero";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import './home.css';

import iconAsset from "../../assets/icons/icon-asset-pack.png";
import iconGame from "../../assets/icons/icon-gameboy.png";
import iconWallpaper from "../../assets/icons/icon-wallpaper.png";
import iconGift from "../../assets/icons/icon-gift.png";
import iconScroll from "../../assets/icons/icon-scroll.png";
import iconDonut from "../../assets/icons/icon-donut.png";


const categories = [
  { label: "Assets", icon: iconDonut, value: "asset-pack" },
  { label: "Apps & Games", icon: iconGame, value: "app-game" },
  { label: "Scripts", icon: iconScroll, value: "scripts" },
  { label: "Wallpapers", icon: iconWallpaper, value: "wallpaper" },
  { label: "Asset Packs", icon: iconAsset, value: "asset-pack" },
  { label: "Freebies", icon: iconGift, value: "freebies" },
];

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useSectionScroll();

  useEffect(() => {
    const fetch = async () => {
      try {
       const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
       const data = Array.isArray(res.data) ? res.data : [];
       setNewProducts(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="home-section hero-section">
        <Hero />
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="home-section category-section">
        <div className="section-header">
          <h2 className="section-title">✨ Shop by Category ✨</h2>
          <button className="view-all" onClick={() => navigate("/shop")}>
            View all
          </button>
        </div>

        <div className="category-grid">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="category-card"
              onClick={() => navigate(`/shop?category=${cat.value}`)}
            >
              <img src={cat.icon} alt={cat.label} />
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FRESH OUT OF THE OVEN */}
      <section className="home-section fresh-section">
        <div className="section-header">
          <h2 className="section-title">🧁 Fresh Out of the Oven</h2>
          <button className="view-all" onClick={() => navigate("/shop")}>
            View all
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Yükleniyor... 🍰</p>
        ) : newProducts.length === 0 ? (
          <p className="empty-text">Yakında yeni ürünler geliyor! 🥧</p>
        ) : (
          <div className="products-row">
            {newProducts.map((p) => (
              <div
                key={p._id}
                className="product-card"
                onClick={() => navigate(`/shop/${p._id}`)}
              >
                {p.isFree && <span className="badge-free">FREE</span>}
                {!p.isFree && <span className="badge-paid">NEW</span>}

                {p.bannerUrl
                  ? <img src={p.bannerUrl} alt={p.name} className="card-banner" />
                  : <div className="card-banner-placeholder" />
                }

                <div className="card-body">
                  {p.thumbnailUrl && (
                    <img src={p.thumbnailUrl} alt={p.name} className="card-thumb" />
                  )}
                  <div className="card-info">
                    <h3>{p.name}</h3>
                    <p className="card-cat">{p.category}</p>
                    <p className="card-price">
                      {p.isFree ? "🆓 Free" : `$${p.price}`}
                    </p>
                  </div>
                </div>

                <button
                  className="card-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/shop/${p._id}`);
                  }}
                >
                  🛒
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;
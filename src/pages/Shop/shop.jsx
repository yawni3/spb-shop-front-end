import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./Shop.css";

import iconShop from "../../assets/icons/icon-shop.png";
import iconDonut from "../../assets/icons/icon-donut.png";
import iconGame from "../../assets/icons/icon-gameboy.png";
import iconScroll from "../../assets/icons/icon-scroll.png";
import iconWallpaper from "../../assets/icons/icon-wallpaper.png";
import iconAsset from "../../assets/icons/icon-asset-pack.png";
import iconGift from "../../assets/icons/icon-gift.png";

// ⭐ Kategoriler
const categories = [
  { label: "All Products", value: "", img: iconShop },
  { label: "Assets", value: "asset-pack", img: iconDonut },
  { label: "Apps & Games", value: "app-game", img: iconGame },
  { label: "Scripts", value: "scripts", img: iconScroll },
  { label: "Wallpapers", value: "wallpaper", img: iconWallpaper },
  { label: "Freebies", value: "freebies", img: iconGift },
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Free First", value: "free" },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/.netlify/functions';
  
  // ⭐ Path'ten filtre belirleme
  const getFilterFromPath = () => {
    const path = location.pathname;
    if (path === "/assets") return "asset-pack";
    if (path === "/apps") return "app-game";
    if (path === "/wallpapers") return "wallpaper";
    if (path === "/freebies") return "freebies";
    return "";
  };

  // ⭐ Query'den veya path'ten aktif kategori
  const queryCategory = searchParams.get("category") || "";
  const pathFilter = getFilterFromPath();
  const activeCategory = pathFilter || queryCategory;

  // ⭐ URL'den search parametresini al
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // ⭐ Sayfa başlığını path'e göre belirle
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/assets") return "Assets";
    if (path === "/apps") return "Apps & Games";
    if (path === "/wallpapers") return "Wallpapers";
    if (path === "/freebies") return "Freebies";
    return "Shop";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/products`);
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data);
      } catch (err) {
        console.error("❌ Shop - Ürün yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ⭐ Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const filtered = products
    .filter(p => {
      if (p.active === false) return false;
      
      if (activeCategory === "freebies") {
        return p.isFree === true;
      }
      
      if (activeCategory && p.category !== activeCategory) return false;
      
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "free") return a.isFree ? -1 : 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // ⭐ Kategori tıklama işlemi
  const handleCategoryClick = (catValue) => {
    if (catValue === "") {
      navigate("/shop");
    } else if (catValue === "freebies") {
      navigate("/freebies");
    } else {
      navigate(`/shop?category=${catValue}`);
    }
  };

  // ⭐ Ürün detayına yönlendirme
  const handleProductClick = (product) => {
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    } else {
      navigate(`/shop/${product._id}`);
    }
  };

  return (
    <div className="shop-page">

      {/* SOL SIDEBAR */}
      <aside className="shop-sidebar">
        <h2>Categories</h2>
        <ul className="sidebar-cats">
          {categories.map((cat, i) => (
            <li
              key={i}
              className={`sidebar-cat ${activeCategory === cat.value && cat.value !== "" ? "active" : ""} ${!cat.value && !activeCategory ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat.value)}
            >
              <img src={cat.img} alt={cat.label} />
              <span>{cat.label}</span>
            </li>
          ))}
        </ul>

        <div className="sidebar-widget">
          <img src={iconGift} alt="treat" />
          <p>Need a treat?</p>
          <span>Take a break! 🍰</span>
        </div>
      </aside>

      {/* SAĞ İÇERİK */}
      <div className="shop-content">

        {/* MOBİL KATEGORİ */}
        <div className="mobile-cats">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`cat-chip ${activeCategory === cat.value && cat.value !== "" ? "active" : ""} ${!cat.value && !activeCategory ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat.value)}
            >
              <img src={cat.img} alt={cat.label} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* BAŞLIK + FİLTRELER */}
        <div className="shop-header">
          <h1>{getPageTitle()}</h1>
          <div className="shop-filters">

            {/* CUSTOM SORT */}
            <div className="sort-box" onClick={() => setSortOpen(!sortOpen)}>
              <span>{sortOptions.find(o => o.value === sort)?.label}</span>
              <span className="sort-arrow">{sortOpen ? "▲" : "▼"}</span>
              {sortOpen && (
                <div className="sort-dropdown">
                  {sortOptions.map((o, i) => (
                    <div
                      key={i}
                      className={`sort-option ${sort === o.value ? "active" : ""}`}
                      onClick={e => { e.stopPropagation(); setSort(o.value); setSortOpen(false); }}
                    >
                      {o.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ÜRÜN GRİDİ */}
        {loading ? (
          <p className="shop-loading">Yükleniyor... 🍰</p>
        ) : filtered.length === 0 ? (
          <p className="shop-empty">Ürün bulunamadı 🥧</p>
        ) : (
          <div className="shop-grid">
            {filtered.map(p => (
              <div
                key={p._id}
                className="shop-card"
                onClick={() => handleProductClick(p)}
              >
                {p.isFree
                  ? <span className="badge badge-free">Free Sample</span>
                  : <span className="badge badge-new">NEW</span>
                }
                {p.bannerUrl
                  ? <img src={p.bannerUrl} alt={p.name} className="shop-card-banner" />
                  : <div className="shop-card-placeholder" />
                }
                <div className="shop-card-body">
                  <h3>{p.name}</h3>
                  <p className="shop-card-cat">{p.category}</p>
                  <div className="shop-card-footer">
                    <span className="shop-card-price">
                      {p.isFree ? "FREE" : `$${p.price}`}
                    </span>
                    <button
                      className="shop-card-btn"
                      onClick={e => { e.stopPropagation(); handleProductClick(p); }}
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;
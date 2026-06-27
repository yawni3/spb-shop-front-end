import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "./Search";
import './style/Navbar.css';

import iconHome from "../assets/icons/icon-home.png";
import iconShop from "../assets/icons/icon-shop.png";
import iconAsset from "../assets/icons/icon-asset-pack.png";
import iconGame from "../assets/icons/icon-gameboy.png";
import iconWallpaper from "../assets/icons/icon-wallpaper.png";
import iconGift from "../assets/icons/icon-gift.png";
import iconAbout from "../assets/icons/icon-about.png";
import iconLogo from "../assets/icons/icon-storefront.png";

const navItems = [
  { to: "/", label: "Home", icon: iconHome },
  { to: "/shop", label: "Shop", icon: iconShop },
  { to: "/assets", label: "Assets", icon: iconAsset },
  { to: "/apps", label: "Apps", icon: iconGame },
  { to: "/wallpapers", label: "Wallpapers", icon: iconWallpaper },
  { to: "/freebies", label: "Freebies", icon: iconGift },
  { to: "/about", label: "About", icon: iconAbout },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="navbar">

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menü"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={iconLogo} alt="SPB" />
        <span>Sleepy Pie Bakery</span>
      </div>

      <nav className="navbar-links">
        {navItems.map((item, i) => (
          <NavLink key={i} to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            end={item.to === "/"}
          >
            <img src={item.icon} alt={item.label} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="navbar-actions">
        {/* ⭐ Search Component - Navbar'da */}
        <Search className="navbar-search" placeholder="Search products..." />
        
        {/* ⭐ SEPET BUTONU - Emoji ile */}
        <button className="cart-btn" onClick={handleCartClick} aria-label="Sepet">
          <span className="cart-emoji">🛒</span>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
        
        <button className="profile-btn" aria-label="Profil">🐾</button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item, i) => (
            <NavLink key={i} to={item.to}
              className={({ isActive }) => `mobile-item ${isActive ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
              end={item.to === "/"}
            >
              <img src={item.icon} alt={item.label} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          {/* ⭐ MOBİL SEPET - Emoji ile */}
          <NavLink to="/cart" className="mobile-item" onClick={() => setMenuOpen(false)}>
            <span className="mobile-emoji">🛒</span>
            <span>Sepet {cartCount > 0 && `(${cartCount})`}</span>
          </NavLink>
          
          {/* ⭐ MOBİL CHECKOUT - Emoji ile */}
          <NavLink to="/checkout" className="mobile-item" onClick={() => setMenuOpen(false)}>
            <span className="mobile-emoji">📦</span>
            <span>Ödeme</span>
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
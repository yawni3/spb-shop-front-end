import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Search.css";

const Search = ({ 
  placeholder = "Search products...", 
  className = "",
  onSearch,
  initialValue = ""
}) => {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'https://sleepypie-backend.onrender.com/api';

  // ⭐ initialValue değiştiğinde güncelle
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // ⭐ Tüm ürünleri çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data.filter(p => p.active === true));
      } catch (err) {
        console.error("❌ Ürünler çekilemedi:", err);
      }
    };
    fetchProducts();
  }, []);

  // ⭐ Dışarı tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ⭐ Arama işlemi
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    const searchQuery = query.toLowerCase().trim();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.description?.toLowerCase().includes(searchQuery) ||
      p.shortDescription?.toLowerCase().includes(searchQuery) ||
      p.category?.toLowerCase().includes(searchQuery) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
    );

    setResults(filtered.slice(0, 8));
    setShowResults(filtered.length > 0);
    setLoading(false);
  }, [query, products]);

  const handleResultClick = (product) => {
  setQuery("");
  setShowResults(false);
  if (onSearch) onSearch("");
  
  // ⭐ Güvenli yönlendirme: slug varsa slug, yoksa ID
  console.log('🔍 Search yönlendirme:', { slug: product.slug, id: product._id, identifier });
  navigate(`/product/${identifier}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    setShowResults(false);
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowResults(false);
    if (onSearch) onSearch("");
    navigate('/shop');
  };

  return (
    <div className={`search-wrapper ${className}`} ref={searchRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setShowResults(results.length > 0)}
        />
        {query && (
          <button 
            type="button" 
            className="search-clear"
            onClick={handleClear}
          >
            ✕
          </button>
        )}
      </form>

      {/* ⭐ Sonuçlar Dropdown */}
      {showResults && (
        <div className="search-results">
          {loading ? (
            <div className="search-loading">🔍 Aranıyor...</div>
          ) : results.length > 0 ? (
            <>
              {results.map((product) => (
                <div
                  key={product._id}
                  className="search-result-item"
                  onClick={() => handleResultClick(product)}
                >
                  <img 
                    src={product.thumbnailUrl || product.bannerUrl || 'https://via.placeholder.com/40/FFF8F4/D89A8B?text=No+Image'} 
                    alt={product.name} 
                  />
                  <div className="search-result-info">
                    <span className="search-result-name">{product.name}</span>
                    <span className="search-result-category">{product.category || 'Product'}</span>
                  </div>
                  <span className="search-result-price">
                    {product.isFree ? 'FREE' : `$${product.price}`}
                  </span>
                </div>
              ))}
              <div 
                className="search-result-view-all"
                onClick={() => {
                  setShowResults(false);
                  if (onSearch) onSearch(query);
                  navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
                }}
              >
                Tüm sonuçları gör → 
              </div>
            </>
          ) : (
            <div className="search-no-results">😕 Ürün bulunamadı</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
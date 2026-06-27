import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NewProductNotification.css';

const NewProductNotification = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/.netlify/functions';

  useEffect(() => {
    // ⭐ Daha önce kapatıldı mı kontrol et
    const dismissedTime = localStorage.getItem('new_product_dismissed');
    if (dismissedTime) {
      const elapsed = Date.now() - parseInt(dismissedTime);
      if (elapsed < 24 * 60 * 60 * 1000) {
        setDismissed(true);
        return;
      }
    }

    // ⭐ Yeni ürünleri kontrol et (son 24 saat)
    const checkNewProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        const products = res.data;
        
        // Son 24 saatte eklenen ürünler
        const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
        const newItems = products.filter(p => 
          p.active && 
          new Date(p.createdAt).getTime() > twentyFourHoursAgo
        );

        if (newItems.length > 0) {
          setNewProducts(newItems);
          setShow(true);
        }
      } catch (err) {
        console.error('Yeni ürün kontrol hatası:', err);
      }
    };

    // ⭐ Sayfa yüklendikten 3 saniye sonra göster
    const timer = setTimeout(() => {
      if (!dismissed) {
        checkNewProducts();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // ⭐ Bildirimi kapat
  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('new_product_dismissed', Date.now().toString());
  };

  // ⭐ Sonraki ürüne geç
  const handleNext = () => {
    if (currentIndex < newProducts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleDismiss();
    }
  };

  // ⭐ Önceki ürüne geç
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!show || newProducts.length === 0 || dismissed) {
    return null;
  }

  const product = newProducts[currentIndex];
  const total = newProducts.length;

  return (
    <div className="new-product-notification">
      <div className="notification-wrapper">
        <div className="notification-content">
          <button className="notification-close" onClick={handleDismiss}>✕</button>
          
          <div className="notification-icon">🆕</div>
          
          <h3 className="notification-title">Yeni Ürün Geldi!</h3>
          
          <div className="notification-product">
            <img 
              src={product.thumbnailUrl || product.bannerUrl || 'https://via.placeholder.com/80/FFF8F4/D89A8B?text=No+Image'} 
              alt={product.name} 
            />
            <div className="notification-product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-category">{product.category}</span>
              <span className="product-price">
                {product.isFree ? '🆓 Ücretsiz' : `${product.price}₺`}
              </span>
            </div>
          </div>

          <div className="notification-actions">
            <Link 
              to={`/product/${product.slug}`} 
              className="btn-view"
              onClick={handleDismiss}
            >
              Ürünü İncele →
            </Link>
            <button className="btn-next" onClick={handleNext}>
              {currentIndex < total - 1 ? 'Sonraki →' : 'Kapat'}
            </button>
          </div>

          {total > 1 && (
            <div className="notification-counter">
              {currentIndex + 1} / {total}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProductNotification;
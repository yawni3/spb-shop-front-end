import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/Confirmdialog.jsx";
import "./Cart.css";

// ⭐ Icon import'ları
import iconShop from "../assets/icons/icon-shop.png";
import iconDonut from "./../assets/icons/icon-donut.png";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartItems);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemoveClick = (productId) => {
    setItemToRemove(productId);
    setConfirmOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      const updatedCart = cart.filter(item => item._id !== itemToRemove);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
      setItemToRemove(null);
    }
    setConfirmOpen(false);
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
    setConfirmOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const hasItems = cart.length > 0;

  return (
    <div className="cart-page">
      <ConfirmDialog
        isOpen={confirmOpen}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        title="🪄 Ürünü Kaldır"
        message="Bu ürünü sepetten kaldırmak istediğinden emin misin?"
        confirmText="Evet, Kaldır"
        cancelText="Hayır, Vazgeç"
      />

      <div className="cart-container">
        {/*  Sepetiniz başlığı - Shop iconu */}
        <h1>
          <img src={iconShop} alt="Shop" className="title-icon" />
          Sepetiniz
        </h1>
        
        {!hasItems ? (
          <div className="cart-empty">
            <span className="empty-icon">🧁</span>
            <h2>Sepetiniz Boş</h2>
            <p>Hemen alışverişe başlayın!</p>
            {/*  Alışverişe Başla - Donut iconu */}
            <Link to="/shop" className="btn-shop">
             Alışverişe Başla
    </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <img 
                    src={item.thumbnailUrl || 'https://via.placeholder.com/80/FFF8F4/D89A8B?text=No+Image'} 
                    alt={item.name} 
                  />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">
                      {item.isFree ? '🎁 Ücretsiz' : `${item.price}₺`}
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}>−</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}>+</button>
                    </div>
                    <button className="btn-remove" onClick={() => handleRemoveClick(item._id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <span>🍰 Toplam Ürün:</span>
                <span>{totalItems}</span>
              </div>
              <div className="cart-total">
                <span>🫐 Toplam Tutar:</span>
                <span>🎁 Ücretsiz</span>
              </div>
              <button 
                className="btn-checkout"
                onClick={() => navigate('/checkout')}
              >
                📦 Siparişi Tamamla
              </button>
              <Link to="/shop" className="btn-continue">← Alışverişe Devam Et</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
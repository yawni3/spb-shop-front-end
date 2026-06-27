import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from '../../components/ToastProvider';
import "./Checkout.css";

// ⭐ Icon import'ları
import iconMail from "../../assets/icons/icon-mail.png";
import CheckoutBanner from "../../assets/Checkout-banner.png";
import CheckoutThank from "../../assets/checkout-thank.png";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [error, setError] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/.netlify/functions';
  const showToast = useToast();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartItems.length === 0) {
      navigate('/shop');
    }
    setCart(cartItems);
  }, []);

  const hasPaidItems = cart.some(item => !item.isFree);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes('@')) {
      setError('Lütfen geçerli bir email adresi girin');
      return;
    }
    if (!termsAccepted) {
      setError('Kullanıcı sözleşmesini kabul etmelisiniz');
      return;
    }
    if (!kvkkAccepted) {
      setError('KVKK aydınlatma metnini kabul etmelisiniz');
      return;
    }
    if (hasPaidItems) {
      setError('⚠️ Ücretli ürünler yakında satışa açılacak! Şu anda sadece ücretsiz ürünler alınabilir.');
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirmOrder = async () => {
    setConfirmOpen(false);
    setLoading(true);

    try {
      const orderData = {
        customer: { email: email },
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity || 1
        })),
        termsAccepted: true,
        kvkkAccepted: true,
        notes: ''
      };

      const response = await axios.post(`${API_URL}/orders`, orderData);
      setOrderNumber(response.data.order?.orderNumber || '');
      setOrderComplete(true);
      localStorage.removeItem('cart');
      showToast('🎉 Siparişiniz başarıyla oluşturuldu!', 'success');

    } catch (err) {
      console.error('❌ Sipariş hatası:', err);
      setError(err.response?.data?.error || 'Sipariş oluşturulurken hata oluştu!');
      showToast('❌ Sipariş oluşturulurken hata oluştu!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = () => {
    setConfirmOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Order complete page
  if (orderComplete) {
    return (
      <div className="checkout-container">
        <div className="checkout-success">
          <div className="success-image">
            <img src={CheckoutThank} alt="Thank You" className="thank-image" />
          </div>
          <h1>Siparişiniz Alındı!</h1>
          <p className="success-order">Sipariş No: <strong>{orderNumber}</strong></p>
          <p className="success-message">
            İndirme linkleri <strong>{email}</strong> adresine gönderildi.
          </p>
          <p className="success-note">📧 Lütfen spam klasörünü kontrol edin.</p>

          <div className="success-actions">
            <Link to="/" className="btn-primary">Ana Sayfaya Dön</Link>
            <Link to="/shop" className="btn-secondary">Alışverişe Devam Et</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <ConfirmDialog
        isOpen={confirmOpen}
        onConfirm={handleConfirmOrder}
        onCancel={handleCancelOrder}
        title=" Siparişi Onayla"
        message="Siparişinizi tamamlamak istediğinizden emin misiniz?"
        confirmText="Evet, Siparişi Tamamla"
        cancelText="Hayır, Vazgeç"
      />

      {/* Banner */}
      <div className="checkout-banner">
        <img src={CheckoutBanner} alt="Sleepy Pie Bakery" />
        <div className="banner-text">
          <h2>🍰 Siparişini Tamamla</h2>
          <p>Ücretsiz ürünlerini anında indir!</p>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          {/* ⭐ Sipariş Bilgileri başlığı - Mail iconu */}
          <h3>
            <img src={iconMail} alt="Mail" className="title-icon" />
            Sipariş Bilgileri
          </h3>
          
          {error && (
            <div className="error-message">
              <span>❌</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmitClick}>
            {hasPaidItems && (
              <div className="paid-warning">
                <span>⚠️</span>
                <div>
                  <strong>Ücretli ürünler yakında!</strong>
                  <p>Sepetinizde ücretli ürünler var. Şu anda sadece ücretsiz ürünler alınabilir.</p>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>📧 Email Adresi *</label>
              <input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="form-hint">Sipariş onayı ve indirme linkleri bu adrese gönderilecek.</span>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span>
                  <Link to="/terms" target="_blank">Kullanıcı Sözleşmesi</Link>'ni okudum ve kabul ediyorum. *
                </span>
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                />
                <span>
                  <Link to="/kvkk" target="_blank">KVKK Aydınlatma Metni</Link>'ni okudum ve kabul ediyorum. *
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading || hasPaidItems}
            >
              {loading ? '⏳ İşleniyor...' : hasPaidItems ? '🔒 Ücretli Ürünler Yakında' : '✅ Siparişi Tamamla'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>🛒 Sepetiniz ({totalItems} ürün)</h3>
          
          <div className="summary-items">
            {cart.map((item, index) => (
              <div key={index} className="summary-item">
                <img 
                  src={item.thumbnailUrl || 'https://via.placeholder.com/50/FFF8F4/D89A8B?text=No+Image'} 
                  alt={item.name} 
                />
                <div className="summary-item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">x{item.quantity || 1}</span>
                </div>
                <span className="item-price">
                  {item.isFree ? '🧁' : '💰'}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row total">
              <span>Toplam</span>
              <span>🧁 Ücretsiz</span>
            </div>
          </div>

          <div className="summary-features">
            <div className="feature">
              <span>⚡</span> Anında İndirme
            </div>
            <div className="feature">
              <span>🔒</span> Güvenli Ödeme
            </div>
            <div className="feature">
              <span>❤️</span> Yaratıcılar Tarafından Sevilir
            </div>
          </div>

          <Link to="/cart" className="back-to-cart">
            ← Sepete Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
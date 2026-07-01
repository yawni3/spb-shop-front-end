import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './productdetail.css';
import { useToast } from '../../components/ToastProvider';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  const showToast = useToast();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // ⭐ SessionStorage'dan cache kontrolü
      const cacheKey = 'spb_products';
      const cached = sessionStorage.getItem(cacheKey);
      let products;

      if (cached) {
        products = JSON.parse(cached);
        console.log('📦 Cache\'den ürünler yüklendi');
      } else {
        const response = await axios.get(`${API_URL}/products`);
        products = response.data;
        sessionStorage.setItem(cacheKey, JSON.stringify(products));
        console.log('📦 API\'den ürünler yüklendi (cache\'e kaydedildi)');
      }
      
      const foundProduct = products.find(p => p.slug === slug);
      
      if (!foundProduct) {
        throw new Error('Ürün bulunamadı');
      }
      
      setProduct(foundProduct);
      
      const related = products
        .filter(p => 
          p._id !== foundProduct._id && 
          p.active && 
          p.category === foundProduct.category
        )
        .slice(0, 4);
      
      setRelatedProducts(related);
      
    } catch (err) {
      console.error('Product detail fetch error:', err);
      setError(err.message || 'Ürün yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = () => {
    if (!product.fileUrl || product.fileUrl.trim() === '') {
      showToast('🔮 Bu ürün henüz yayınlanmadı!', 'warning');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item._id === product._id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ 
        _id: product._id,
        name: product.name,
        price: product.price,
        isFree: product.isFree,
        thumbnailUrl: product.thumbnailUrl,
        slug: product.slug,
        quantity: quantity 
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  if (loading) {
    return (
      <div className="product-details loading">
        <div className="loading-spinner">🍰</div>
        <p>Ürün yükleniyor...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details error">
        <div className="error-icon">🥺</div>
        <h2>Üzgünüm, ürün bulunamadı</h2>
        <p>{error || 'Bu ürün mevcut değil veya kaldırılmış olabilir.'}</p>
        <Link to="/shop" className="back-to-shop">Mağazaya Dön</Link>
      </div>
    );
  }

  const {
    name,
    description,
    shortDescription,
    price,
    isFree,
    bannerUrl,
    thumbnailUrl,
    previewImages = [],
    category,
    tags = [],
    whatsIncluded = [],
    license = { personalUse: true, commercialUse: true, resaleAllowed: false },
    version,
    createdAt,
    fileUrl
  } = product;

  const hasFile = fileUrl && fileUrl.trim() !== '';

  const formattedPrice = isFree ? 'Ücretsiz' : `${price?.toFixed(2) || 0}₺`;
  const displayImages = previewImages.length > 0 ? previewImages : (bannerUrl ? [bannerUrl] : []);
  const mainImage = bannerUrl || displayImages[0] || thumbnailUrl || 'https://via.placeholder.com/600x400/FFF8F4/D89A8B?text=No+Image';

  return (
    <div className="product-details">
      <div className="product-grid">
        <div className="product-gallery">
          <div className="main-image">
            <img src={mainImage} alt={name} />
            
            {!hasFile ? (
              <span className="badge badge-coming-soon">🔮 Yakında</span>
            ) : (
              <>
                {isFree && <span className="badge free">ÜCRETSİZ</span>}
                {!isFree && price > 0 && <span className="badge premium">PREMIUM</span>}
              </>
            )}
          </div>
          {displayImages.length > 1 && (
            <div className="thumbnail-grid">
              {displayImages.slice(0, 4).map((img, index) => (
                <div key={index} className="thumbnail">
                  <img src={img} alt={`${name} ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="breadcrumb">
            <Link to="/">Ana Sayfa</Link>
            <span>/</span>
            <Link to="/shop">Mağaza</Link>
            <span>/</span>
            <Link to={`/shop?category=${category}`}>{category || 'Ürünler'}</Link>
            <span>/</span>
            <span className="current">{name}</span>
          </div>

          <h1 className="product-title">{name}</h1>
          
          <div className="product-meta">
            {category && (
              <span className="category">📂 {category}</span>
            )}
            {version && (
              <span className="version">📌 v{version}</span>
            )}
            <span className="date">
              🎂 {new Date(createdAt).toLocaleDateString('tr-TR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          <div className="price-section">
            <span className="price">{formattedPrice}</span>
            <div className="license-info">
              {license.personalUse && <span>👤 Kişisel Kullanım</span>}
              {license.commercialUse && <span>💼 Ticari Kullanım</span>}
            </div>
          </div>

          {shortDescription && (
            <p className="short-description">{shortDescription}</p>
          )}

          {description && (
            <div className="description">
              <p>{description}</p>
            </div>
          )}

          {tags.length > 0 && (
            <div className="tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}

          {whatsIncluded.length > 0 && (
            <div className="includes">
              <h4>📦 İçindekiler</h4>
              <div className="include-items">
                {whatsIncluded.map((item, index) => (
                  <div key={index} className="include-item">
                    <span className="include-icon">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="actions">
            {!isFree && (
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            )}
            <button 
              className={`add-to-cart ${!hasFile ? 'disabled' : ''}`} 
              onClick={addToBasket} 
              disabled={!hasFile}
            >
              <span>{isFree ? '🎁' : '🍰'}</span>
              {!hasFile ? '🔮 Yakında' : isFree ? 'Ücretsiz İndir' : 'Sepete Ekle'}
            </button>
          </div>

          <div className="product-tabs">
            <button 
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Açıklama
            </button>
            <button 
              className={activeTab === 'details' ? 'active' : ''}
              onClick={() => setActiveTab('details')}
            >
              Detaylar
            </button>
            <button 
              className={activeTab === 'license' ? 'active' : ''}
              onClick={() => setActiveTab('license')}
            >
              Lisans
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div>
                <p>{description || 'Bu ürün için açıklama bulunmuyor.'}</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Kategori</span>
                  <span className="detail-value">{category || 'Belirtilmemiş'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Versiyon</span>
                  <span className="detail-value">{version || '1.0.0'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Yayınlanma</span>
                  <span className="detail-value">
                    {new Date(createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                {tags.length > 0 && (
                  <div className="detail-item full-width">
                    <span className="detail-label">Etiketler</span>
                    <div className="detail-tags">
                      {tags.map((tag, i) => (
                        <span key={i} className="detail-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'license' && (
              <div className="license-details">
                <h4>Lisans Bilgileri</h4>
                <div className="license-grid">
                  <div className="license-item">
                    <span className="license-icon">👤</span>
                    <div>
                      <strong>Kişisel Kullanım</strong>
                      <p>{license.personalUse ? '✅ İzin Veriliyor' : '❌ İzin Verilmiyor'}</p>
                    </div>
                  </div>
                  <div className="license-item">
                    <span className="license-icon">💼</span>
                    <div>
                      <strong>Ticari Kullanım</strong>
                      <p>{license.commercialUse ? '✅ İzin Veriliyor' : '❌ İzin Verilmiyor'}</p>
                    </div>
                  </div>
                  <div className="license-item">
                    <span className="license-icon">🔄</span>
                    <div>
                      <strong>Yeniden Satış</strong>
                      <p>{license.resaleAllowed ? '✅ İzin Veriliyor' : '❌ İzin Verilmiyor'}</p>
                    </div>
                  </div>
                </div>
                <p className="license-note">
                  Bu ürün projelerinde kullanım için lisanslanmıştır.
                  {!license.resaleAllowed && ' Orijinal dosyaların yeniden satışı veya dağıtımına izin verilmez.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="also-like">
          <h2>🍪 Bunlar da ilgini çekebilir</h2>
          <div className="also-like-grid">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item.slug}`} key={item._id} className="also-item">
                <div className="also-thumbnail">
                  <img 
                    src={item.thumbnailUrl || item.bannerUrl || 'https://via.placeholder.com/200x150/FFF8F4/D89A8B?text=No+Image'} 
                    alt={item.name} 
                  />
                  {item.isFree && <span className="also-badge free">ÜCRETSİZ</span>}
                </div>
                <h4>{item.name}</h4>
                <p>{item.category || 'Ürün'}</p>
                <span className="also-price">
                  {item.isFree ? 'Ücretsiz' : `${item.price?.toFixed(2) || 0}₺`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
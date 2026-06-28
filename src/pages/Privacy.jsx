import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>🔒 Gizlilik Politikası</h1>
        <p className="privacy-date">Son güncelleme: Haziran 2026</p>

        <div className="privacy-section">
          <h2>1. Toplanan Bilgiler</h2>
          <p>Sleepy Pie Bakery olarak yalnızca sipariş işlemleri için gerekli olan e-posta adresinizi toplarız.</p>
        </div>

        <div className="privacy-section">
          <h2>2. Bilgilerin Kullanımı</h2>
          <p>Topladığımız bilgiler yalnızca sipariş onayı ve indirme linkleri göndermek için kullanılır.</p>
        </div>

        <div className="privacy-section">
          <h2>3. KVKK</h2>
          <p>Kişisel verileriniz KVKK kapsamında korunmaktadır. Verileriniz üçüncü taraflarla paylaşılmaz.</p>
        </div>

        <div className="privacy-section">
          <h2>4. Çerezler</h2>
          <p>Site, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz.</p>
        </div>

        <div className="privacy-section">
          <h2>5. İletişim</h2>
          <p>Gizlilik politikası ile ilgili sorularınız için: sleepypiebakery.contact@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
import React from 'react';
import './KVKK.css';

const KVKK = () => {
  return (
    <div className="kvkk-page">
      <div className="kvkk-container">
        <h1>📜 KVKK Aydınlatma Metni</h1>
        <p className="kvkk-date">Son güncelleme: Haziran 2026</p>

        <div className="kvkk-section">
          <h2>1. Veri Sorumlusu</h2>
          <p>Sleepy Pie Bakery olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusuyuz.</p>
          <p><strong>İletişim:</strong> sleepypiebakery.contact@gmail.com</p>
        </div>

        <div className="kvkk-section">
          <h2>2. Toplanan Kişisel Veriler</h2>
          <p>Sleepy Pie Bakery olarak yalnızca sipariş işlemleri için gerekli olan aşağıdaki kişisel verilerinizi toplarız:</p>
          <ul>
            <li>✓ E-posta adresi</li>
            <li>✓ Sipariş bilgileri (ürün adı, miktar, tarih)</li>
          </ul>
        </div>

        <div className="kvkk-section">
          <h2>3. İşleme Amaçları</h2>
          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul>
            <li>✓ Sipariş onayı göndermek</li>
            <li>✓ İndirme linkleri göndermek</li>
            <li>✓ Müşteri desteği sağlamak</li>
          </ul>
        </div>

        <div className="kvkk-section">
          <h2>4. Veri Aktarımı</h2>
          <p>Kişisel verileriniz, sipariş işlemlerinin gerçekleştirilmesi amacıyla yurt dışına aktarılmamaktadır. Verileriniz üçüncü taraflarla paylaşılmaz.</p>
        </div>

        <div className="kvkk-section">
          <h2>5. Veri Güvenliği</h2>
          <p>Kişisel verileriniz, KVKK kapsamında güvenli sunucularda saklanır ve yetkisiz erişime karşı korunur.</p>
        </div>

        <div className="kvkk-section">
          <h2>6. Kullanıcı Hakları (KVKK Madde 11)</h2>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>✓ Verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>✓ Verilerinizin düzeltilmesini isteme</li>
            <li>✓ Verilerinizin silinmesini isteme</li>
            <li>✓ İtiraz etme hakkı</li>
            <li>✓ Verilerinizin aktarıldığı üçüncü kişileri öğrenme</li>
          </ul>
        </div>

        <div className="kvkk-section">
          <h2>7. İletişim</h2>
          <p>KVKK ile ilgili sorularınız için:</p>
          <p><strong>Email:</strong> <a href="mailto:sleepypiebakery.contact@gmail.com">sleepypiebakery.contact@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default KVKK;
import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>📜 Kullanım Koşulları</h1>
        <p className="terms-date">Son güncelleme: Haziran 2026</p>

        <div className="terms-section">
          <h2>1. Genel</h2>
          <p>Sleepy Pie Bakery'yi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.</p>
        </div>

        <div className="terms-section">
          <h2>2. Ürünler</h2>
          <p>Tüm dijital ürünler "olduğu gibi" sunulmaktadır. Ürünlerin kullanımından kaynaklanan sorumluluk kullanıcıya aittir.</p>
        </div>

        <div className="terms-section">
          <h2>3. Lisans</h2>
          <p>Satın alınan tüm dijital ürünler kişisel ve ticari kullanım için lisanslanmıştır. Yeniden satışı yasaktır.</p>
        </div>

        <div className="terms-section">
          <h2>4. İade Politikası</h2>
          <p>Dijital ürünler indirildikten sonra iade edilemez. Ürünle ilgili bir sorun yaşarsanız bizimle iletişime geçin.</p>
        </div>

        <div className="terms-section">
          <h2>5. İletişim</h2>
          <p>Sorularınız için: sleepypiebakery.contact@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
import React from 'react';
import './FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      q: "Sleepy Pie Bakery nedir?",
      a: "Sleepy Pie Bakery, dijital ürünler (asset pack, wallpaper, app/game, script vb.) satan bir e-ticaret platformudur."
    },
    {
      q: "Ürünleri nasıl indirebilirim?",
      a: "Siparişinizi tamamladıktan sonra indirme linkleri e-posta adresinize gönderilir. Ayrıca sipariş sayfanızdan da indirebilirsiniz."
    },
    {
      q: "Ücretsiz ürünler var mı?",
      a: "Evet! Freebies kategorisinde düzenli olarak ücretsiz ürünler paylaşıyoruz."
    },
    {
      q: "Ücretli ürünler ne zaman gelecek?",
      a: "Ücretli ürünler yakında Shopier entegrasyonu ile satışa sunulacak."
    },
    {
      q: "Hangi ödeme yöntemleri kabul ediliyor?",
      a: "Şu anda sadece ücretsiz ürünler mevcut. Ücretli ürünler için Shopier entegrasyonu hazırlanıyor."
    },
    {
      q: "İndirme linkim çalışmıyor, ne yapmalıyım?",
      a: "Lütfen sleepypiebakery.contact@gmail.com adresinden bizimle iletişime geçin."
    }
  ];

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>❓ Sık Sorulan Sorular</h1>
        <p className="faq-subtitle">Merak ettiğiniz her şey burada!</p>
        
        <div className="faq-list">
          {faqs.map((item, index) => (
            <div key={index} className="faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
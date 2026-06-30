import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const KeyboardNavigation = ({ items, itemSelector = '.product-card', basePath = '/product' }) => {
  const navigate = useNavigate();
  const currentIndexRef = useRef(-1);
  const itemsRef = useRef([]);

  // ⭐ Klavye olaylarını dinle
  useEffect(() => {
    // ⭐ Sadece PC ve yatay tablet için (768px'den büyük ekranlar)
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) return;

    // ⭐ Ürün kartlarını güncelle
    const updateItems = () => {
      const cards = document.querySelectorAll(itemSelector);
      itemsRef.current = Array.from(cards);
    };

    // ⭐ İlk yüklemede ve her değişiklikte güncelle
    updateItems();

    // ⭐ MutationObserver ile DOM değişikliklerini izle
    const observer = new MutationObserver(updateItems);
    observer.observe(document.body, { childList: true, subtree: true });

    // ⭐ Klavye olayı
    const handleKeyDown = (e) => {
      // ⭐ Sadece ok tuşları ve Enter
      if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) return;

      // ⭐ Input/textarea içinde değilsek çalışsın
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      e.preventDefault();

      const cards = itemsRef.current;
      if (cards.length === 0) return;

      // ⭐ Geçerli indeksi güncelle
      if (currentIndexRef.current === -1) {
        // ⭐ İlk odaklanma
        cards[0]?.focus();
        cards[0]?.classList.add('keyboard-selected');
        currentIndexRef.current = 0;
        return;
      }

      // ⭐ Önceki seçiliyi temizle
      const prevSelected = cards[currentIndexRef.current];
      prevSelected?.classList.remove('keyboard-selected');

      // ⭐ Yeni indeks
      let newIndex = currentIndexRef.current;
      if (e.key === 'ArrowDown') {
        newIndex = Math.min(currentIndexRef.current + 1, cards.length - 1);
      } else if (e.key === 'ArrowUp') {
        newIndex = Math.max(currentIndexRef.current - 1, 0);
      } else if (e.key === 'Enter') {
        // ⭐ Enter'a basıldığında ürüne git
        const selectedCard = cards[currentIndexRef.current];
        if (selectedCard) {
          const slug = selectedCard.dataset.slug;
          const id = selectedCard.dataset.id;
          if (slug) {
            navigate(`${basePath}/${slug}`);
          } else if (id) {
            navigate(`${basePath}/${id}`);
          }
        }
        return;
      }

      // ⭐ Yeni seçili
      const newSelected = cards[newIndex];
      if (newSelected) {
        newSelected.classList.add('keyboard-selected');
        newSelected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        newSelected.focus();
      }

      currentIndexRef.current = newIndex;
    };

    window.addEventListener('keydown', handleKeyDown);

    // ⭐ Component unmount olunca temizle
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
      // ⭐ Seçili class'ları temizle
      document.querySelectorAll('.keyboard-selected').forEach(el => {
        el.classList.remove('keyboard-selected');
      });
    };
  }, [items, itemSelector, basePath, navigate]);

  return null;
};

export default KeyboardNavigation;
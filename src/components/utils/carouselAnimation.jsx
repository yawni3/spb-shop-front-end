import { useEffect } from "react"; 
export const useCarouselAnimation = (selector, intervalTime = 30000) => { 
  useEffect(() => {
     const container = document.querySelector(selector);
      if (!container) return;
       let index = 0;
        const interval = setInterval(() => { const cards = container.children;
         if (!cards.length) return; 
        index = (index + 1) % cards.length;
         cards[index].scrollIntoView({ behavior: "smooth", inline: "center" });
       }, 
        intervalTime);
         
    return () => clearInterval(interval); }, [selector, intervalTime]); };
import { useEffect } from "react"; 
export const useCarouselAnimation = (selector, intervalTime = 10000) => { 
  useEffect(() => {
     const container = document.querySelector(selector);
      if (!container) return;

      const getCards = () =>
      [...container.children].filter(
        (el) => el.classList.contains("project-card")
      );

       let index = 0;
       let intervalId = null;

      const scrollToCard = (i) =>{
        const cards = getCards();
        if (!cards.length) return;
        const card = cards[i];
        if(!card) return;

        const cardLeft = card.offsetLeft - container.offsetLeft;
        container.scrollTo({ left: cardLeft, behavior:"smooth"});
      };

      const next = () =>{
        const cards = getCards();
        if (!cards.length) return;
        index = (index + 1) % cards.length;
        scrollToCard(index);
      };

      const start = () =>{
        clearInterval(intervalId);
        intervalId = setInterval(next, intervalTime);
      };

      const handleUserScroll = () =>{
        clearInterval(intervalId);
        start();
      };

      start();
      container.addEventListener("touchstart", handleUserScroll, { passive: true});
      container.addEventListener("mousedown", handleUserScroll, );
         
     return () =>{
       clearInterval(intervalId);
       container.removeEventListener("touchstart", handleUserScroll);
       container.removeEventListener("mousedown", handleUserScroll );
   };
  }, [selector, intervalTime]);
};
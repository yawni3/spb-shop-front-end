import { useEffect } from "react";

export const useSectionScroll = () => {
  useEffect(() => {

    const sections = document.querySelectorAll(".home-section");
    if (!sections.length) return;

    let index = 0;
    let isScrolling = false;
    let touchStartY = 0;
    let touchStartX = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            index = [...sections].indexOf(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));

    const scrollToSection = (i) => {
      if (!sections[i] || isScrolling) return;
      isScrolling = true;
      sections[i].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    const isInsideScrollable = (target) =>{
      return(
        target.closest(".project-carousel") ||
        target.closest("input, textarea, select") ||
        target.closest("[data-no-scroll]")
      );
    };

    const handleWheel = (e) => {
      if (isScrolling || isInsideScrollable(e.target)) return;
      if (e.deltaY > 0) {
        scrollToSection(Math.min(index + 1, sections.length - 1));
      } else {
        scrollToSection(Math.max(index - 1, 0));
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if(isInsideScrollable(e.target)) return;
      
      const diffY = touchStartY - e.changedTouches[0].clientY;
      const diffX = Math.abs(touchStartX - e.changedTouches[0].clientX);

      if (diffX > Math.abs(diffY));
      if (Math.abs(diffY) < 50) return;

      if (diffY > 0) {
        scrollToSection(Math.min(index + 1, sections.length - 1));
      } else {
        scrollToSection(Math.max(index - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
};
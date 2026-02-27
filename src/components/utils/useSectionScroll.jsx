import { useEffect } from "react";

export const useSectionScroll = () => {
  useEffect(() => {

    const sections = document.querySelectorAll(".home-section");

    let index = 0;
    let isScrolling = false;
    let touchStartY = 0;

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
      if (!sections[i]) return;

      isScrolling = true;

      sections[i].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      setTimeout(() => {
        isScrolling = false;
      }, 700);
    };

    const handleWheel = (e) => {
      if (isScrolling) return;

      const carousel = e.target.closest(".project-carousel");
      if (carousel) return;

      if (isScrolling) return;
      
      if (e.deltaY > 0) {
        scrollToSection(Math.min(index + 1, sections.length - 1));
      } else {
        scrollToSection(Math.max(index - 1, 0));
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;

      if (diff > 0) {
        scrollToSection(Math.min(index + 1, sections.length - 1));
      } else {
        scrollToSection(Math.max(index - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
};
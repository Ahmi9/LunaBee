/* =========================================
   Luna Bee Photo — minimal vanilla JS
   - Sticky nav shadow on scroll
   - Reveal-on-scroll via IntersectionObserver
   ========================================= */

(function () {
  'use strict';

  // ---------- Nav: toggle "is-scrolled" after a few px ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();

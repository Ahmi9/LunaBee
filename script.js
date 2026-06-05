/* =========================================
   Luna Bee Photo — minimal vanilla JS
   - Sticky nav shadow on scroll
   - Mobile hamburger menu toggle
   - Reveal-on-scroll via IntersectionObserver
   - Gallery image fade-in once loaded
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

  // ---------- Mobile hamburger menu ----------
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', String(!open));
    };

    toggle.addEventListener('click', () => {
      setOpen(!nav.classList.contains('is-menu-open'));
    });

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-menu-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close if resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 640 && nav.classList.contains('is-menu-open')) {
        setOpen(false);
      }
    });
  }

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

  // ---------- Gallery image fade-in once loaded ----------
  const tileImages = document.querySelectorAll('.tile__img');
  tileImages.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
      img.addEventListener('error', () => img.classList.add('is-loaded'), { once: true }); // don't hide forever on error
    }
  });
})();

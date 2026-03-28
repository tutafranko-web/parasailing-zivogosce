/* ===== Main JS — Parasailing Živogošće ===== */

// ---- Language Toggle ----
const translations = {
  // Navbar
  'nav-home': { hr: 'Početna', en: 'Home' },
  'nav-services': { hr: 'Usluge', en: 'Services' },
  'nav-about': { hr: 'O nama', en: 'About' },
  'nav-gallery': { hr: 'Galerija', en: 'Gallery' },
  'nav-reviews': { hr: 'Recenzije', en: 'Reviews' },
  'nav-contact': { hr: 'Kontakt', en: 'Contact' },
  'nav-book': { hr: 'Rezerviraj', en: 'Book Now' },
  // Services dropdown
  'nav-parasailing': { hr: 'Parasailing', en: 'Parasailing' },
  'nav-boat': { hr: 'Rent a Boat', en: 'Rent a Boat' },
  'nav-jetski': { hr: 'Jet Ski', en: 'Jet Ski' },
  'nav-banana': { hr: 'Banana Ride', en: 'Banana Ride' },
  'nav-tubing': { hr: 'Tubing', en: 'Tubing' },
  // Footer
  'footer-rights': { hr: 'Sva prava pridržana.', en: 'All rights reserved.' },
  'footer-operator': { hr: 'Operator: Mirino obrt', en: 'Operator: Mirino obrt' },
  'footer-quick': { hr: 'Brzi linkovi', en: 'Quick Links' },
  'footer-contact-title': { hr: 'Kontakt', en: 'Contact' },
  'footer-location': { hr: 'Plaža Porat, Živogošće, Hrvatska', en: 'Porat Beach, Živogošće, Croatia' },
  'footer-season': { hr: 'Sezona: Ožujak – Prosinac', en: 'Season: March – December' },
};

let currentLang = localStorage.getItem('lang') || 'hr';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });

  // Update elements with data-hr / data-en attributes
  document.querySelectorAll('[data-hr][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  // Update placeholders
  document.querySelectorAll('[data-ph-hr][data-ph-en]').forEach(el => {
    el.placeholder = lang === 'hr' ? el.dataset.phHr : el.dataset.phEn;
  });
}

// ---- Navbar Scroll Effect ----
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('menu-close');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => menu.classList.add('open'));
  if (close) close.addEventListener('click', () => menu.classList.remove('open'));

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ---- Services Dropdown ----
function initDropdown() {
  const trigger = document.getElementById('services-dropdown');
  const panel = document.getElementById('services-panel');
  if (!trigger || !panel) return;

  trigger.addEventListener('mouseenter', () => {
    panel.classList.remove('hidden');
    panel.classList.add('block');
  });
  trigger.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!panel.matches(':hover')) {
        panel.classList.add('hidden');
        panel.classList.remove('block');
      }
    }, 100);
  });
  panel.addEventListener('mouseleave', () => {
    panel.classList.add('hidden');
    panel.classList.remove('block');
  });
}

// ---- Lightbox ----
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox) return;

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });
}

// ---- Gallery Filters ----
function initGalleryFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ---- Contact Form (frontend only) ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = currentLang === 'hr'
      ? 'Hvala na poruci! Javit ćemo vam se uskoro.'
      : 'Thank you! We will contact you soon.';
    alert(msg);
    form.reset();
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  initNavScroll();
  initMobileMenu();
  initDropdown();
  initLightbox();
  initGalleryFilters();
  initContactForm();

  // AOS init
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }
});

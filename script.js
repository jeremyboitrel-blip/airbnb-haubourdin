/* ═══════════════════════════════════════════════════
   BIENVENUE À HAUBOURDIN — Script
   Animations, navigation, tabs, interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAV STICKY ──────────────────────────────
  const nav = document.getElementById('nav');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });


  // ── 2. BURGER MENU ─────────────────────────────
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const openMenu = () => {
    burger.classList.add('open');
    navLinks.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  // ── 3. REVEAL ON SCROLL ────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, no need to keep observing
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── 4. SMOOTH SCROLL FOR ANCHOR LINKS ──────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });


  // ── 5. TABS (GUIDE LOCAL) ──────────────────────
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanel = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');

      // Update panels
      panels.forEach(panel => {
        panel.classList.remove('tab-panel--active');
        if (panel.dataset.panel === targetPanel) {
          panel.classList.add('tab-panel--active');
        }
      });
    });
  });


  // ── 6. ACTIVE NAV LINK ON SCROLL ──────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');

        navLinkItems.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(section => sectionObserver.observe(section));


  // ── 7. HERO PARALLAX (subtle) ──────────────────
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');

  if (hero && heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = hero.offsetHeight;

      if (scrolled <= heroHeight) {
        const progress = scrolled / heroHeight;
        heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
        heroContent.style.opacity = `${1 - progress * 1.5}`;
      }
    }, { passive: true });
  }


  // ── 8. INFO CARD — COPY TO CLIPBOARD ──────────
  const wifiCard = document.querySelector('[data-wifi]');
  if (wifiCard) {
    wifiCard.style.cursor = 'pointer';
    wifiCard.addEventListener('click', () => {
      navigator.clipboard.writeText(wifiCard.dataset.wifi).then(() => {
        const original = wifiCard.querySelector('.info-card__value').textContent;
        wifiCard.querySelector('.info-card__value').textContent = 'Copié !';
        setTimeout(() => {
          wifiCard.querySelector('.info-card__value').textContent = original;
        }, 1500);
      }).catch(() => {});
    });
  }


  // ── 9. STAGGERED CARD HOVER ────────────────────
  // Subtle stagger on grid items when parent hovered
  const grids = document.querySelectorAll('.equipements-grid, .info-grid, .extras-grid');

  grids.forEach(grid => {
    const cards = grid.querySelectorAll('[class*="card"]');
    cards.forEach((card, i) => {
      card.style.setProperty('--i', i);
    });
  });


  // ── 10. ANNÉE FOOTER ──────────────────────────
  const yearEl = document.querySelector('.footer__copy');
  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = yearEl.textContent.replace('2025', currentYear);
  }

});

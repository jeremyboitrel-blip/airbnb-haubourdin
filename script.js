/* ═══════════════════════════════════════════════════
   BIENVENUE À HAUBOURDIN — Script Premium v2
   Particules, scroll progress, tabs, nav, animations
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. SCROLL PROGRESS BAR ─────────────────────
  const progressBar = document.getElementById('progress-bar');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });


  // ── 2. BACK TO TOP ─────────────────────────────
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  // ── 3. NAV STICKY ──────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ── 4. BURGER MENU ─────────────────────────────
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');

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

  burger.addEventListener('click', () => burger.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));


  // ── 5. SMOOTH SCROLL ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });


  // ── 6. REVEAL ON SCROLL ────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));


  // ── 7. TABS ─────────────────────────────────────
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('tab--active'));
      panels.forEach(p => p.classList.remove('tab-panel--active'));
      tab.classList.add('tab--active');
      const panel = document.querySelector(`[data-panel="${tab.dataset.tab}"]`);
      if (panel) panel.classList.add('tab-panel--active');
    });
  });


  // ── 8. PARTICULES HERO ─────────────────────────
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const count = 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'hero__particle';
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.5 + 0.2;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: ${opacity};
      `;
      particlesContainer.appendChild(p);
    }
  }


  // ── 9. HERO PARALLAX ───────────────────────────
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');
  const skyline = document.querySelector('.hero__skyline');

  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrolled <= heroH) {
        const p = scrolled / heroH;
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.22}px)`;
          heroContent.style.opacity = `${1 - p * 1.6}`;
        }
        if (skyline) {
          skyline.style.transform = `translateY(${scrolled * 0.08}px)`;
        }
      }
    }, { passive: true });
  }


  // ── 10. ANNÉE FOOTER ───────────────────────────
  const copyEl = document.querySelector('.footer__copy');
  if (copyEl) {
    const yr = new Date().getFullYear();
    copyEl.textContent = copyEl.textContent.replace('2025', yr).replace('2026', yr);
  }

});

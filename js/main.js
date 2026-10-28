/**
 * main.js — Core orchestration, content rendering & deep-sea descent
 * Handles:
 * - Dynamic population of all layer content from CONTENT object
 * - Depth gauge tracking (0m → 2000m) & visual fill
 * - IntersectionObserver for layer title cards & active nav
 * - Depth-linked background & light-ray dissipation
 * - Bioluminescent cursor wisp trail with hover enlargement
 * - Mobile navigation menu toggle
 * - Accessibility & reduced-motion fallbacks
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  SVG Icon Map for Content Sections                                 */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    users: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>`,
    handshake: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M11 15h2l3-3-3-3h-2l-3 3 3 3z"></path>
        <path d="M19 12l2-2-4-4-3 3"></path>
        <path d="M5 12l-2-2 4-4 3 3"></path>
      </svg>`,
    rocket: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12l2 2"></path>
      </svg>`,
    clock: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>`,
    growth: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>`,
    event: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>`,
    network: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="3"></circle>
        <circle cx="5" cy="18" r="3"></circle>
        <circle cx="19" cy="18" r="3"></circle>
        <line x1="12" y1="8" x2="5" y2="15"></line>
        <line x1="12" y1="8" x2="19" y2="15"></line>
      </svg>`,
    deal: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle>
        <polyline points="12 8 8 12 12 16"></polyline>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>`,
    recruit: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="10" cy="8" r="4"></circle>
        <path d="M2 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"></path>
        <line x1="19" y1="8" x2="19" y2="14"></line>
        <line x1="16" y1="11" x2="22" y2="11"></line>
      </svg>`,
    bizdev: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M2 20h20"></path>
        <path d="M5 20V10l5-4 5 4v10"></path>
        <path d="M19 20v-6l-4-3"></path>
      </svg>`,
    vault: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="12" y1="8" x2="12" y2="10"></line>
        <line x1="12" y1="14" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="10" y2="12"></line>
        <line x1="14" y1="12" x2="16" y2="12"></line>
      </svg>`,
    gamepad: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="6" y1="12" x2="10" y2="12"></line>
        <line x1="8" y1="10" x2="8" y2="14"></line>
        <line x1="15" y1="13" x2="15.01" y2="13"></line>
        <line x1="18" y1="11" x2="18.01" y2="11"></line>
        <rect x="2" y="6" width="20" height="12" rx="6"></rect>
      </svg>`,
    palette: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
      </svg>`,
    chart: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 3v18h18"></path>
        <path d="M18.5 8.5L13 14l-4-4-5 5"></path>
      </svg>`,
    data: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>`,
    github: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>`,
    email: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>`,
    discord: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 6h0a14.5 14.5 0 0 0-4-1.2 11.8 11.8 0 0 0-.5 1.1 13.9 13.9 0 0 0-3 0A11.8 11.8 0 0 0 10 4.8 14.5 14.5 0 0 0 6 6c-2.4 3.7-3 7.2-2.7 10.7a14.8 14.8 0 0 0 4.5 2.3 11 11 0 0 0 1-1.6 9.6 9.6 0 0 1-1.6-.8l.4-.3a10.5 10.5 0 0 0 9 0l.4.3a9.6 9.6 0 0 1-1.6.8 11 11 0 0 0 1 1.6 14.8 14.8 0 0 0 4.5-2.3C21.1 12.8 20.3 9.4 18 6z"></path>
        <circle cx="8.5" cy="12" r="1.5" fill="currentColor"></circle>
        <circle cx="15.5" cy="12" r="1.5" fill="currentColor"></circle>
      </svg>`
  };

  function getIcon(name) {
    return ICONS[name] || ICONS.users;
  }

  /* ------------------------------------------------------------------ */
  /*  Data Population                                                    */
  /* ------------------------------------------------------------------ */
  function populateContent() {
    const data = window.CONTENT;
    if (!data) return;

    // Document Title & Footer Year
    if (data.meta && data.meta.title) document.title = data.meta.title;
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const layers = data.layers || {};

    // ── Layer 1: Surface ──
    const surface = layers.surface;
    if (surface) {
      setText('hero-greeting', surface.greeting);
      setText('hero-subtitle', surface.subtitle);

      const bioEl = document.getElementById('hero-bio');
      if (bioEl && Array.isArray(surface.bio)) {
        bioEl.innerHTML = surface.bio.map(p => `<p>${escapeHtml(p)}</p>`).join('');
      }

      const statsEl = document.getElementById('hero-stats');
      if (statsEl && Array.isArray(surface.stats)) {
        statsEl.innerHTML = surface.stats
          .map(s => `
            <div class="stat-card">
              <span class="stat-card__value">${escapeHtml(s.value)}</span>
              <span class="stat-card__label">${escapeHtml(s.label)}</span>
            </div>
          `)
          .join('');
      }
    }

    // ── Layer 2: The Eternal Gale ──
    const gale = layers.eternalGale;
    if (gale) {
      setText('gale-heading', gale.heading);
      setText('gale-desc', gale.description);

      const galeEl = document.getElementById('gale-highlights');
      if (galeEl && Array.isArray(gale.highlights)) {
        galeEl.innerHTML = gale.highlights
          .map(h => `
            <article class="info-card">
              <div class="info-card__icon">${getIcon(h.icon)}</div>
              <h4 class="info-card__title">${escapeHtml(h.title)}</h4>
              <p class="info-card__text">${escapeHtml(h.text)}</p>
            </article>
          `)
          .join('');
      }
    }

    // ── Layer 3: The Brokerage ──
    const brokerage = layers.brokerage;
    if (brokerage) {
      setText('brokerage-heading', brokerage.heading);
      setText('brokerage-desc', brokerage.description);

      const brokEl = document.getElementById('brokerage-roles');
      if (brokEl && Array.isArray(brokerage.roles)) {
        brokEl.innerHTML = brokerage.roles
          .map(r => `
            <article class="info-card">
              <div class="info-card__icon">${getIcon(r.icon)}</div>
              <h4 class="info-card__title">${escapeHtml(r.title)}</h4>
              <p class="info-card__text">${escapeHtml(r.text)}</p>
            </article>
          `)
          .join('');
      }
    }

    // ── Layer 4: The Forge ──
    const forge = layers.forge;
    if (forge) {
      setText('forge-heading', forge.heading);
      setText('forge-desc', forge.description);

      const forgeEl = document.getElementById('forge-projects');
      if (forgeEl && Array.isArray(forge.projects)) {
        forgeEl.innerHTML = forge.projects
          .map(p => {
            const tags = (p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
            return `
              <article class="info-card project-card">
                <div class="info-card__icon">${getIcon(p.icon)}</div>
                <div style="margin-bottom:0.75rem;">
                  <h4 class="info-card__title project-card__name" style="margin-bottom:0.25rem;">${escapeHtml(p.name)}</h4>
                  <span class="project-card__role">${escapeHtml(p.role)}</span>
                </div>
                <p class="info-card__text">${escapeHtml(p.text)}</p>
                <div class="info-card__tags">${tags}</div>
              </article>
            `;
          })
          .join('');
      }
    }

    // ── Layer 5: The Quant Depths ──
    const quant = layers.quantDepths;
    if (quant) {
      setText('quant-heading', quant.heading);
      setText('quant-desc', quant.description);

      const quantEl = document.getElementById('quant-areas');
      if (quantEl && Array.isArray(quant.areas)) {
        quantEl.innerHTML = quant.areas
          .map(a => `
            <article class="info-card">
              <div class="info-card__icon">${getIcon(a.icon)}</div>
              <h4 class="info-card__title">${escapeHtml(a.title)}</h4>
              <p class="info-card__text">${escapeHtml(a.text)}</p>
            </article>
          `)
          .join('');
      }
    }

    // ── Layer 6: The Abyss ──
    const abyss = layers.abyss;
    if (abyss) {
      setText('abyss-heading', abyss.heading);
      setText('abyss-desc', abyss.description);

      // Education
      const eduEl = document.getElementById('abyss-education');
      if (eduEl && abyss.education) {
        eduEl.innerHTML = `
          <h4 style="font-size:1.25rem; color:var(--parchment); margin-bottom:0.4rem;">${escapeHtml(abyss.education.degree)}</h4>
          <span style="font-size:0.75rem; color:var(--cyan); text-transform:uppercase; letter-spacing:0.15em; display:block; margin-bottom:1rem;">
            ${escapeHtml(abyss.education.status)}
          </span>
          <p style="color:var(--text-secondary); line-height:1.7;">${escapeHtml(abyss.education.note)}</p>
        `;
      }

      // Goals
      const goalsEl = document.getElementById('abyss-goals');
      if (goalsEl && Array.isArray(abyss.goals)) {
        goalsEl.innerHTML = `
          <h4 style="font-family:var(--font-display); color:var(--parchment); margin-bottom:1rem; font-size:1.15rem;">Long-Term Directives</h4>
          <ul>
            ${abyss.goals.map(g => `<li>${escapeHtml(g)}</li>`).join('')}
          </ul>
        `;
      }

      // Contact
      if (abyss.contact) {
        setText('contact-heading', abyss.contact.heading);
        setText('contact-text', abyss.contact.text);

        const linksEl = document.getElementById('contact-links');
        if (linksEl && Array.isArray(abyss.contact.links)) {
          linksEl.innerHTML = abyss.contact.links
            .map(link => `
              <a href="${escapeHtml(link.url)}" class="contact-link" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(link.label)}">
                ${getIcon(link.icon)}
                <span>${escapeHtml(link.label)}</span>
              </a>
            `)
            .join('');
        }
      }
    }
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ------------------------------------------------------------------ */
  /*  Depth Gauge & Scroll Tracker                                       */
  /* ------------------------------------------------------------------ */
  const depthCounterEl = document.getElementById('depth-counter');
  const depthFillEl    = document.getElementById('depth-fill');
  const layerNameEl    = document.getElementById('layer-name');
  const mainNavEl      = document.getElementById('main-nav');
  const rootStyle      = document.documentElement.style;

  let currentDisplayedDepth = 0;
  let targetDepth = 0;

  function getCurrentLayerInfo() {
    const sections = Array.from(document.querySelectorAll('main > section.layer'));
    if (!sections.length) return { name: 'The Surface', depth: 0 };

    const viewportMid = window.innerHeight * 0.42;
    let activeSec = sections[0];

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= viewportMid) {
        activeSec = sections[i];
      }
    }

    const titleEl = activeSec.querySelector('.layer__name');
    const name = titleEl ? titleEl.textContent.trim() : 'The Surface';
    const depth = parseInt(activeSec.getAttribute('data-depth'), 10) || 0;

    return { name, depth };
  }

  function onScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    // Fixed Nav background blur when scrolled
    if (mainNavEl) {
      if (scrollY > 60) {
        mainNavEl.classList.add('scrolled');
      } else {
        mainNavEl.classList.remove('scrolled');
      }
    }

    // Depth Gauge Fill (0% → 100%)
    if (depthFillEl) {
      depthFillEl.style.height = `${(progress * 100).toFixed(1)}%`;
    }

    // Depth meter calculation (0 → 2000m)
    targetDepth = Math.round(progress * 2000);

    // Current active layer lookup
    const layerInfo = getCurrentLayerInfo();
    if (layerNameEl && layerNameEl.textContent !== layerInfo.name) {
      layerNameEl.textContent = layerInfo.name;
    }

    // Dissipate light rays as you descend deeper into the sea
    const rayOpacity = Math.max(0, 0.15 * (1 - progress * 2.2));
    rootStyle.setProperty('--ray-opacity', rayOpacity.toFixed(3));

    // Particle background depth update
    if (typeof window.updateParticleDepth === 'function') {
      window.updateParticleDepth(progress);
    }
  }

  // Smooth ticker for depth meter number
  function tickDepthCounter() {
    if (currentDisplayedDepth !== targetDepth) {
      const step = Math.ceil(Math.abs(targetDepth - currentDisplayedDepth) * 0.15) || 1;
      if (currentDisplayedDepth < targetDepth) {
        currentDisplayedDepth = Math.min(targetDepth, currentDisplayedDepth + step);
      } else {
        currentDisplayedDepth = Math.max(targetDepth, currentDisplayedDepth - step);
      }
      if (depthCounterEl) depthCounterEl.textContent = currentDisplayedDepth;
    }
    requestAnimationFrame(tickDepthCounter);
  }

  /* ------------------------------------------------------------------ */
  /*  Intersection Observer — Title Cards & Active Nav                   */
  /* ------------------------------------------------------------------ */
  function initObservers() {
    // 1. Reveal Layer Title Cards on entrance
    const titleCards = document.querySelectorAll('.layer__title-card');
    if ('IntersectionObserver' in window) {
      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );
      titleCards.forEach((tc) => cardObserver.observe(tc));
    } else {
      // Fallback
      titleCards.forEach((tc) => tc.classList.add('visible'));
    }

    // 2. Active Nav Link Sync
    const sections = document.querySelectorAll('main > section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if ('IntersectionObserver' in window && sections.length > 0) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach((link) => {
                if (link.getAttribute('href') === `#${id}`) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });
            }
          });
        },
        { threshold: 0.25 }
      );
      sections.forEach((s) => navObserver.observe(s));
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Cursor Wisp (Trailing Bioluminescent Ether)                       */
  /* ------------------------------------------------------------------ */
  function initCursorWisp() {
    const wisp = document.getElementById('cursor-wisp');
    if (!wisp) return;

    // Disable entirely on touch devices or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      wisp.style.display = 'none';
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let wispX = -100;
    let wispY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        wisp.classList.add('active');
        isVisible = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      wisp.classList.remove('active');
      isVisible = false;
    });

    // Lerp loop for trailing inertia
    function animateWisp() {
      wispX += (mouseX - wispX) * 0.2;
      wispY += (mouseY - wispY) * 0.2;

      wisp.style.transform = `translate3d(${wispX}px, ${wispY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateWisp);
    }
    animateWisp();

    // Hover enlargement on interactive items
    const hoverTargets = 'a, button, .talent-card, .info-card, .stat-card, input, select';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        wisp.classList.add('cursor-wisp--hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        wisp.classList.remove('cursor-wisp--hover');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Mobile Navigation Toggle                                           */
  /* ------------------------------------------------------------------ */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('nav-links--open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('nav-links--open');
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Bootstrap                                                          */
  /* ------------------------------------------------------------------ */
  function start() {
    populateContent();
    initObservers();
    initCursorWisp();
    initMobileNav();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    tickDepthCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

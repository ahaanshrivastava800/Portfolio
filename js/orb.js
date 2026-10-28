/**
 * orb.js — Talent Orb interactive skills system
 * Centerpiece feature of the Deepwoken-themed portfolio.
 *
 * Implements:
 * - Glowing orb burst with shockwave
 * - 3D card arc fly-out & reveal flips
 * - 3D pointer tilt with dynamic glare
 * - Selection flash & Talent Hand inventory
 * - Batch re-draws & "Reveal All" grid
 * - Keyboard & touch accessibility
 * - Safe localStorage state persistence
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  Safe LocalStorage Wrapper                                          */
  /* ------------------------------------------------------------------ */
  const Storage = {
    get(key, fallback = null) {
      try {
        const item = localStorage.getItem('deepwoken_' + key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem('deepwoken_' + key, JSON.stringify(val));
      } catch (e) {
        // Storage restricted or unavailable
      }
    }
  };

  /* ------------------------------------------------------------------ */
  /*  SVG Icon Library (Original Line Art)                               */
  /* ------------------------------------------------------------------ */
  function getCardIcon(name) {
    const icons = {
      project: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>`,
      team: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>`,
      tasks: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>`,
      lightbulb: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 18h6"></path>
          <path d="M10 22h4"></path>
          <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"></path>
          <path d="M12 9v3"></path>
        </svg>`,
      handshake: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M11 15h2l3-3-3-3h-2l-3 3 3 3z"></path>
          <path d="M19 12l2-2-4-4-3 3"></path>
          <path d="M5 12l-2-2 4-4 3 3"></path>
          <path d="M18 19l3-3-3-3"></path>
          <path d="M6 19l-3-3 3-3"></path>
        </svg>`,
      deal: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M8 12h8"></path>
          <path d="M12 8l4 4-4 4"></path>
        </svg>`,
      pitch: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>`,
      fund: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M12 6v12"></path>
          <path d="M15 9.5a2.5 2.5 0 0 0-5 0c0 2 5 2 5 4.5a2.5 2.5 0 0 1-5 0"></path>
        </svg>`,
      bizdev: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>`,
      community: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="5" r="3"></circle>
          <circle cx="5" cy="18" r="3"></circle>
          <circle cx="19" cy="18" r="3"></circle>
          <line x1="12" y1="8" x2="5" y2="15"></line>
          <line x1="12" y1="8" x2="19" y2="15"></line>
          <line x1="8" y1="18" x2="16" y2="18"></line>
        </svg>`,
      event: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <polygon points="12 12 13 14 15 14 13.5 15.5 14 18 12 16.5 10 18 10.5 15.5 9 14 11 14 12 12"></polygon>
        </svg>`,
      marketing: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 11l18-5v12L3 14v-3z"></path>
          <path d="M11.6 16.8L9 22"></path>
        </svg>`,
      recruit: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="10" cy="8" r="4"></circle>
          <path d="M2 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"></path>
          <line x1="19" y1="8" x2="19" y2="14"></line>
          <line x1="16" y1="11" x2="22" y2="11"></line>
        </svg>`,
      brain: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9.5 2A4.5 4.5 0 0 0 5 6.5c0 .7.1 1.3.4 1.9A4.5 4.5 0 0 0 3 12c0 2.1 1.4 3.9 3.4 4.3A4.5 4.5 0 0 0 11 20h1a4.5 4.5 0 0 0 4.6-3.7A4.5 4.5 0 0 0 21 12a4.5 4.5 0 0 0-2.4-3.9c.3-.6.4-1.2.4-1.9A4.5 4.5 0 0 0 14.5 2c-1.4 0-2.7.7-3.5 1.7A4.5 4.5 0 0 0 9.5 2z"></path>
          <path d="M12 4v16"></path>
        </svg>`,
      quant: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 4h16l-8 8 8 8H4"></path>
          <circle cx="16" cy="12" r="2"></circle>
        </svg>`
    };

    return icons[name] || icons.project;
  }

  /* ------------------------------------------------------------------ */
  /*  State                                                              */
  /* ------------------------------------------------------------------ */
  let allCards = [];
  let revealedCards = new Set();
  let selectedCards = new Set(Storage.get('selected_cards', []));
  let revealIndex = 0;
  let isBursting = false;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /*  DOM Elements                                                       */
  /* ------------------------------------------------------------------ */
  let orbContainer, orbBtn, shockwaveEl, cardArea, counterEl, controlsEl;
  let reopenBtn, revealAllBtn, handEl, handCardsEl, gridEl;

  /* ------------------------------------------------------------------ */
  /*  Init & Setup                                                       */
  /* ------------------------------------------------------------------ */
  function init() {
    orbContainer = document.getElementById('orb-container');
    orbBtn       = document.getElementById('talent-orb');
    shockwaveEl  = document.getElementById('orb-shockwave');
    cardArea     = document.getElementById('card-area');
    counterEl    = document.getElementById('talent-counter');
    controlsEl   = document.getElementById('talent-controls');
    reopenBtn    = document.getElementById('reopen-orb');
    revealAllBtn = document.getElementById('reveal-all');
    handEl       = document.getElementById('talent-hand');
    handCardsEl  = document.getElementById('hand-cards');
    gridEl       = document.getElementById('talent-grid');

    if (!orbBtn || !window.CONTENT || !window.CONTENT.talents) return;

    // Flatten all category cards with metadata
    flattenTalents();

    // Bind event listeners
    orbBtn.addEventListener('click', onOrbClick);
    orbBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOrbClick();
      }
    });

    if (reopenBtn) reopenBtn.addEventListener('click', onReopenClick);
    if (revealAllBtn) revealAllBtn.addEventListener('click', onRevealAllClick);

    // Initial counter render
    updateCounter();

    // Render any restored selected cards
    renderHand();
  }

  function flattenTalents() {
    allCards = [];
    const categories = window.CONTENT.talents.categories;
    let cardIdx = 0;

    for (const [catName, catData] of Object.entries(categories)) {
      for (const card of catData.cards) {
        allCards.push({
          ...card,
          id: 'talent_' + cardIdx,
          index: cardIdx,
          category: catName,
          catColor: catData.color || '#2dd4bf'
        });
        cardIdx++;
      }
    }

    // Deterministic pseudo-shuffle or random shuffle
    shuffle(allCards);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Orb Burst & Draw                                                   */
  /* ------------------------------------------------------------------ */
  function onOrbClick() {
    if (isBursting) return;
    if (revealIndex >= allCards.length) {
      showGridMode();
      return;
    }

    isBursting = true;

    // Trigger shockwave burst
    if (shockwaveEl && !prefersReducedMotion) {
      shockwaveEl.classList.remove('shockwave-active');
      void shockwaveEl.offsetWidth; // reflow
      shockwaveEl.classList.add('shockwave-active');
    }

    // Orb visual reaction
    orbBtn.classList.add('spent');

    // Draw next batch of up to 3 cards
    const batchSize = Math.min(3, allCards.length - revealIndex);
    const batch = allCards.slice(revealIndex, revealIndex + batchSize);
    revealIndex += batchSize;

    batch.forEach(c => revealedCards.add(c.id));
    updateCounter();

    // Hide orb with fade, present cards
    setTimeout(() => {
      orbContainer.style.display = 'none';
      drawBatchCards(batch);
      if (controlsEl) controlsEl.style.display = 'flex';
      updateButtonStates();
      isBursting = false;
    }, prefersReducedMotion ? 50 : 350);
  }

  function onReopenClick() {
    if (isBursting) return;
    if (revealIndex >= allCards.length) {
      showGridMode();
      return;
    }

    isBursting = true;
    cardArea.innerHTML = '';

    // Temporarily bring back orb with quick pulse
    orbContainer.style.display = 'flex';
    orbBtn.classList.remove('spent');
    orbBtn.focus();

    setTimeout(() => {
      onOrbClick();
    }, prefersReducedMotion ? 50 : 250);
  }

  function onRevealAllClick() {
    showGridMode();
  }

  /* ------------------------------------------------------------------ */
  /*  Card Rendering & Arc Flight                                        */
  /* ------------------------------------------------------------------ */
  function drawBatchCards(batch) {
    cardArea.innerHTML = '';
    const flyClasses = ['card-fly-left', 'card-fly-center', 'card-fly-right'];

    batch.forEach((cardData, idx) => {
      const cardEl = createCardElement(cardData);
      cardArea.appendChild(cardEl);

      if (!prefersReducedMotion) {
        const flyClass = flyClasses[idx % flyClasses.length];
        cardEl.classList.add(flyClass);

        // Auto flip card after fly animation
        setTimeout(() => {
          cardEl.classList.remove(flyClass);
          cardEl.classList.add('flipped');
        }, 500 + idx * 120);
      } else {
        cardEl.classList.add('flipped');
      }
    });
  }

  function createCardElement(cardData) {
    const isSelected = selectedCards.has(cardData.id);
    const rarity = (cardData.rarity || 'common').toLowerCase();

    const card = document.createElement('div');
    card.className = `talent-card talent-card--${rarity}${isSelected ? ' selected' : ''}`;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('data-id', cardData.id);
    card.setAttribute(
      'aria-label',
      `${cardData.name} (${cardData.rarity} talent in ${cardData.category}). ${isSelected ? 'Selected.' : 'Click to select.'}`
    );

    const tagsHtml = (cardData.tags || [])
      .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
      .join('');

    card.innerHTML = `
      <div class="talent-card__inner">
        <div class="talent-card__front" aria-hidden="true"></div>
        <div class="talent-card__back">
          <span class="talent-card__rarity">${rarity}</span>
          <div class="talent-card__icon">${getCardIcon(cardData.icon)}</div>
          <h4 class="talent-card__name">${escapeHtml(cardData.name)}</h4>
          <p class="talent-card__desc">${escapeHtml(cardData.description)}</p>
          <div class="talent-card__tags">${tagsHtml}</div>
          <div class="talent-card__glare"></div>
        </div>
      </div>
    `;

    // Interactivity
    setupCardInteractivity(card, cardData);

    return card;
  }

  /* ------------------------------------------------------------------ */
  /*  Card Tilt & Glare (3D Perspective)                                */
  /* ------------------------------------------------------------------ */
  function setupCardInteractivity(card, cardData) {
    const inner = card.querySelector('.talent-card__inner');
    const glare = card.querySelector('.talent-card__glare');

    // Pointer-based 3D Tilt (only when flipped & not reduced motion & not touch)
    if (!prefersReducedMotion) {
      card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('flipped')) return;

        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const tiltX = (py - 0.5) * -16;
        const tiltY = (px - 0.5) * 16;

        inner.style.transform = `rotateY(${180 + tiltY}deg) rotateX(${tiltX}deg) scale3d(1.03, 1.03, 1.03)`;

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`;
          glare.style.opacity = '1';
        }
      });

      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('flipped')) {
          inner.style.transform = 'rotateY(180deg)';
        } else {
          inner.style.transform = 'rotateY(0deg)';
        }
        if (glare) glare.style.opacity = '0';
      });
    }

    // Click / Enter Selection
    const handleSelect = () => {
      if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        return;
      }
      toggleCardSelection(card, cardData);
    };

    card.addEventListener('click', handleSelect);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Selection & Talent Hand Management                                 */
  /* ------------------------------------------------------------------ */
  function toggleCardSelection(cardEl, cardData) {
    const isSelected = selectedCards.has(cardData.id);

    if (isSelected) {
      selectedCards.delete(cardData.id);
      cardEl.classList.remove('selected');
      cardEl.setAttribute(
        'aria-label',
        `${cardData.name} (${cardData.rarity} talent). Click to select.`
      );
    } else {
      selectedCards.add(cardData.id);
      cardEl.classList.add('selected');
      cardEl.setAttribute(
        'aria-label',
        `${cardData.name} (${cardData.rarity} talent). Selected. Click to deselect.`
      );

      // Flash feedback animation
      if (!prefersReducedMotion) {
        cardEl.classList.remove('card-selecting');
        void cardEl.offsetWidth;
        cardEl.classList.add('card-selecting');
      }
    }

    Storage.set('selected_cards', Array.from(selectedCards));
    renderHand();
  }

  function renderHand() {
    if (!handCardsEl) return;
    handCardsEl.innerHTML = '';

    if (selectedCards.size === 0) {
      handCardsEl.innerHTML = `
        <span style="font-size:0.75rem; color:var(--text-dim); font-style:italic;">
          No talents equipped. Click any revealed card above to equip it to your hand.
        </span>`;
      return;
    }

    selectedCards.forEach(id => {
      const cardData = allCards.find(c => c.id === id);
      if (!cardData) return;

      const rarity = (cardData.rarity || 'common').toLowerCase();
      const pill = document.createElement('div');
      pill.className = `hand-card hand-card--${rarity} hand-card-enter`;
      pill.innerHTML = `
        <span class="hand-card__icon" style="display:inline-flex; width:16px; height:16px; vertical-align:middle; margin-right:4px;">
          ${getCardIcon(cardData.icon)}
        </span>
        <span>${escapeHtml(cardData.name)}</span>
        <button class="hand-card__remove" aria-label="Remove ${escapeHtml(cardData.name)} from hand">&times;</button>
      `;

      pill.querySelector('.hand-card__remove').addEventListener('click', (e) => {
        e.stopPropagation();
        selectedCards.delete(cardData.id);
        Storage.set('selected_cards', Array.from(selectedCards));
        renderHand();

        // Sync corresponding card element if currently visible in DOM
        const inDom = document.querySelector(`.talent-card[data-id="${cardData.id}"]`);
        if (inDom) {
          inDom.classList.remove('selected');
          inDom.setAttribute(
            'aria-label',
            `${cardData.name} (${cardData.rarity} talent). Click to select.`
          );
        }
      });

      handCardsEl.appendChild(pill);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Grid Mode ("Reveal All")                                          */
  /* ------------------------------------------------------------------ */
  function showGridMode() {
    orbContainer.style.display = 'none';
    cardArea.style.display = 'none';

    // Mark all as unlocked
    allCards.forEach(c => revealedCards.add(c.id));
    revealIndex = allCards.length;
    updateCounter();

    gridEl.innerHTML = '';
    gridEl.style.display = 'grid';

    allCards.forEach((cardData, idx) => {
      const cardEl = createCardElement(cardData);
      gridEl.appendChild(cardEl);

      if (!prefersReducedMotion) {
        cardEl.classList.add('card-dealing');
        cardEl.style.animationDelay = `${idx * 40}ms`;

        setTimeout(() => {
          cardEl.classList.add('flipped');
        }, 150 + idx * 40);
      } else {
        cardEl.classList.add('flipped');
      }
    });

    if (controlsEl) controlsEl.style.display = 'flex';
    updateButtonStates();
  }

  function updateButtonStates() {
    const allDone = revealIndex >= allCards.length;

    if (reopenBtn) {
      if (allDone) {
        reopenBtn.disabled = true;
        reopenBtn.textContent = 'All Unlocked';
        reopenBtn.style.opacity = '0.5';
        reopenBtn.style.cursor = 'default';
      } else {
        reopenBtn.disabled = false;
        reopenBtn.textContent = `Re-open Orb (${allCards.length - revealIndex} left)`;
      }
    }

    if (revealAllBtn) {
      if (allDone && gridEl && gridEl.style.display === 'grid') {
        revealAllBtn.disabled = true;
        revealAllBtn.textContent = 'All Revealed';
        revealAllBtn.style.opacity = '0.5';
        revealAllBtn.style.cursor = 'default';
      } else {
        revealAllBtn.disabled = false;
        revealAllBtn.textContent = 'Reveal All';
      }
    }
  }

  function updateCounter() {
    if (counterEl) {
      counterEl.textContent = `Talents unlocked: ${revealedCards.size} / ${allCards.length || 17}`;
    }
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
  /*  Bootstrap                                                          */
  /* ------------------------------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


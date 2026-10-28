/**
 * particles.js — Ambient deep-sea particle & fog system
 * Canvas-based, zero-dependency, Deepwoken-themed background.
 *
 * Exposes: window.updateParticleDepth(progress)  (0 = surface, 1 = abyss)
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  Canvas bootstrap                                                   */
  /* ------------------------------------------------------------------ */
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Hint the compositor
  canvas.style.willChange = 'transform';

  /* ------------------------------------------------------------------ */
  /*  Reduced-motion bail-out                                            */
  /* ------------------------------------------------------------------ */
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /*  Constants & tunables                                               */
  /* ------------------------------------------------------------------ */

  // Background gradient endpoints
  const BG_SURFACE = { r: 13, g: 26, b: 45 };   // #0d1a2d
  const BG_ABYSS   = { r: 4,  g: 7,  b: 13 };   // #04070d

  // Particle-type enum
  const TYPE_PLANKTON = 0;
  const TYPE_DUST     = 1;
  const TYPE_BLOB     = 2;

  // Counts — desktop
  const PLANKTON_COUNT_DESKTOP = 70;   // 60-80 range
  const DUST_COUNT_DESKTOP     = 35;   // 30-40 range
  const BLOB_COUNT_DESKTOP     = 6;    // 5-8  range

  // Mobile cap ≈ 80 total
  const PLANKTON_COUNT_MOBILE  = 50;
  const DUST_COUNT_MOBILE      = 22;
  const BLOB_COUNT_MOBILE      = 5;

  /* ------------------------------------------------------------------ */
  /*  State                                                              */
  /* ------------------------------------------------------------------ */
  let W = 0;
  let H = 0;
  let isMobile = false;
  let depthProgress = 0;          // 0 → surface, 1 → abyss
  let particles = [];             // object pool
  let animId = null;

  /* ------------------------------------------------------------------ */
  /*  Utility helpers                                                    */
  /* ------------------------------------------------------------------ */
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(c1, c2, t) {
    return {
      r: Math.round(lerp(c1.r, c2.r, t)),
      g: Math.round(lerp(c1.g, c2.g, t)),
      b: Math.round(lerp(c1.b, c2.b, t)),
    };
  }

  /** Debounce utility for resize */
  function debounce(fn, ms) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  /* ------------------------------------------------------------------ */
  /*  Particle factory (object-pooled — we mutate in place)              */
  /* ------------------------------------------------------------------ */

  /**
   * Resets / initialises a particle object in-place.
   * @param {Object} p  — the particle object to write into
   * @param {number} type — TYPE_PLANKTON | TYPE_DUST | TYPE_BLOB
   */
  function initParticle(p, type) {
    p.type = type;

    // Position — scatter across the canvas
    p.x = rand(0, W);
    p.y = rand(0, H);

    // Per-type visual & motion properties
    switch (type) {
      case TYPE_PLANKTON:
        p.radius   = rand(1, 3);
        p.baseR    = 45;
        p.baseG    = 212;
        p.baseB    = 191;
        p.alpha    = rand(0.1, 0.4);
        p.vx       = rand(-0.15, 0.15);       // slow sideways drift
        p.vy       = rand(-0.35, -0.08);       // upward drift
        p.wobbleAmp   = rand(0.3, 1.0);        // sinusoidal wobble strength
        p.wobbleSpeed = rand(0.005, 0.015);
        p.blinkSpeed  = rand(0.003, 0.01);     // opacity sine speed
        p.phase       = rand(0, Math.PI * 2);  // offset so they're not in sync
        break;

      case TYPE_DUST:
        p.radius = rand(2, 4);
        p.baseR  = 232;
        p.baseG  = 220;
        p.baseB  = 200;
        p.alpha  = rand(0.05, 0.15);
        p.vx     = rand(-0.08, 0.08);
        p.vy     = rand(0.05, 0.25);           // sinking
        p.wobbleAmp   = 0;
        p.wobbleSpeed = 0;
        p.blinkSpeed  = 0;
        p.phase       = rand(0, Math.PI * 2);
        break;

      case TYPE_BLOB:
        p.radius = rand(8, 20);
        p.baseR  = 45;
        p.baseG  = 212;
        p.baseB  = 191;
        p.alpha  = rand(0.03, 0.08);
        p.vx     = rand(-0.06, 0.06);
        p.vy     = rand(-0.06, 0.06);
        p.wobbleAmp   = 0;
        p.wobbleSpeed = 0;
        p.blinkSpeed  = 0;
        p.phase       = rand(0, Math.PI * 2);
        break;
    }

    // Track elapsed "time" per particle so wobble / blink is smooth
    p.age = rand(0, 1000);
    return p;
  }

  /* ------------------------------------------------------------------ */
  /*  Pool management                                                    */
  /* ------------------------------------------------------------------ */

  function buildPool() {
    const planktonN = isMobile ? PLANKTON_COUNT_MOBILE : PLANKTON_COUNT_DESKTOP;
    const dustN     = isMobile ? DUST_COUNT_MOBILE     : DUST_COUNT_DESKTOP;
    const blobN     = isMobile ? BLOB_COUNT_MOBILE     : BLOB_COUNT_DESKTOP;

    const total = planktonN + dustN + blobN;

    // Grow array if needed (never shrink — just mark inactive)
    while (particles.length < total) {
      particles.push({});
    }

    let idx = 0;
    for (let i = 0; i < planktonN; i++) initParticle(particles[idx++], TYPE_PLANKTON);
    for (let i = 0; i < dustN; i++)     initParticle(particles[idx++], TYPE_DUST);
    for (let i = 0; i < blobN; i++)     initParticle(particles[idx++], TYPE_BLOB);

    // Mark any leftover slots inactive
    for (let i = idx; i < particles.length; i++) {
      particles[i].type = -1;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Sizing                                                             */
  /* ------------------------------------------------------------------ */

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    isMobile = W < 768;

    // Rebuild pool — adapts count for mobile vs desktop
    buildPool();

    // If reduced motion, redraw the static frame after resize
    if (prefersReducedMotion) drawStaticFrame();
  }

  /* ------------------------------------------------------------------ */
  /*  Depth-dependent colour helpers                                     */
  /* ------------------------------------------------------------------ */

  /** Shift a particle's displayed colour based on depth progress. */
  function depthAdjustedColor(p) {
    // Surface palette leans teal/cyan; abyss shifts toward dim blue-purple
    const deepR = lerp(p.baseR, 20, depthProgress);
    const deepG = lerp(p.baseG, 40, depthProgress * 0.8);
    const deepB = lerp(p.baseB, 120 + p.baseB * 0.2, depthProgress * 0.6);
    return {
      r: Math.round(deepR),
      g: Math.round(deepG),
      b: Math.round(deepB),
    };
  }

  /** Overall brightness multiplier — dims as depth increases. */
  function depthBrightness() {
    return lerp(1.0, 0.55, depthProgress);
  }

  /**
   * Blob visibility multiplier:
   *   surface → 1, mid-depth → 1.6, abyss → 0.4
   *   (parabola peaking around 0.45)
   */
  function blobVisibility() {
    // -6*(p-0.45)^2 + 1.6   clipped to [0.4, 1.6]
    const p = depthProgress;
    const v = -6 * (p - 0.45) * (p - 0.45) + 1.6;
    return Math.max(0.4, Math.min(1.6, v));
  }

  /* ------------------------------------------------------------------ */
  /*  Draw helpers                                                       */
  /* ------------------------------------------------------------------ */

  function drawBackground() {
    const bg = lerpColor(BG_SURFACE, BG_ABYSS, depthProgress);
    ctx.fillStyle = 'rgb(' + bg.r + ',' + bg.g + ',' + bg.b + ')';
    ctx.fillRect(0, 0, W, H);
  }

  function drawParticle(p) {
    const col   = depthAdjustedColor(p);
    const bright = depthBrightness();

    // Compute effective alpha
    let alpha = p.alpha * bright;

    // Per-type blink / wobble
    if (p.type === TYPE_PLANKTON && p.blinkSpeed > 0) {
      // Sine-wave opacity modulation
      alpha *= 0.5 + 0.5 * Math.sin(p.age * p.blinkSpeed + p.phase);
    }

    // Blob visibility curve
    if (p.type === TYPE_BLOB) {
      alpha *= blobVisibility();
    }

    // Clamp
    alpha = Math.max(0, Math.min(1, alpha));
    if (alpha < 0.005) return; // invisible — skip draw call

    // Viewport culling (generous margin so blobs aren't clipped)
    const margin = p.radius + 4;
    if (p.x < -margin || p.x > W + margin || p.y < -margin || p.y > H + margin) {
      return;
    }

    if (p.type === TYPE_BLOB) {
      // Radial gradient blob
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',' + alpha + ')');
      grad.addColorStop(1, 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Simple filled circle
      ctx.fillStyle = 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',' + alpha + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Update (physics step)                                              */
  /* ------------------------------------------------------------------ */

  function updateParticle(p) {
    if (p.type === -1) return; // inactive slot

    p.age += 1;

    // Movement
    let dx = p.vx;
    let dy = p.vy;

    // Plankton wobble
    if (p.type === TYPE_PLANKTON && p.wobbleAmp > 0) {
      dx += Math.sin(p.age * p.wobbleSpeed + p.phase) * p.wobbleAmp * 0.1;
    }

    p.x += dx;
    p.y += dy;

    // Wrap-around so particles recycle seamlessly
    const margin = p.radius + 4;
    if (p.y < -margin)  p.y = H + margin;
    if (p.y > H + margin) p.y = -margin;
    if (p.x < -margin)  p.x = W + margin;
    if (p.x > W + margin) p.x = -margin;
  }

  /* ------------------------------------------------------------------ */
  /*  Static frame (reduced-motion fallback)                             */
  /* ------------------------------------------------------------------ */

  function drawStaticFrame() {
    drawBackground();
    // Draw particles once, frozen
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].type !== -1) drawParticle(particles[i]);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Animation loop                                                     */
  /* ------------------------------------------------------------------ */

  function animate() {
    drawBackground();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.type === -1) continue;
      updateParticle(p);
      drawParticle(p);
    }

    animId = requestAnimationFrame(animate);
  }

  /* ------------------------------------------------------------------ */
  /*  Public API — depth update                                          */
  /* ------------------------------------------------------------------ */

  /**
   * Called by the scroll/depth controller to update visual depth.
   * @param {number} progress  0.0 (surface) → 1.0 (abyss)
   */
  window.updateParticleDepth = function (progress) {
    depthProgress = Math.max(0, Math.min(1, progress));
  };

  /* ------------------------------------------------------------------ */
  /*  Initialise                                                         */
  /* ------------------------------------------------------------------ */

  // Size canvas & build pool
  resize();

  // Listen for resize (debounced 200 ms)
  window.addEventListener('resize', debounce(resize, 200));

  if (prefersReducedMotion) {
    // Draw a single static frame — no animation loop
    drawStaticFrame();
  } else {
    animate();
  }
})();

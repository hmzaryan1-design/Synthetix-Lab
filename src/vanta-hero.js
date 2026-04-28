/**
 * SYNTHETIX LAB — Hero 3D Animation
 * Stack: Vanta.js NET (Three.js) + GSAP ScrollTrigger + Lenis smooth scroll
 * Neon green palette: var(--neon) = #b2ff33 / #c8ff00
 */

// ─── Load Three.js (required by Vanta) ───────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ─── Vanta NET config ─────────────────────────────────────────────────────────
function initVanta() {
  if (!window.VANTA || !window.THREE) return;

  // Destroy previous instance if any (hot reload)
  if (window._vantaEffect) { window._vantaEffect.destroy(); }

  window._vantaEffect = VANTA.NET({
    el: '#vanta-bg',
    THREE: window.THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1.0,
    scaleMobile: 0.8,

    // Neon green palette — matches var(--neon)
    color: 0xb2ff33,           // node & line color
    backgroundColor: 0x000000, // pure black (hero bg)
    points: 14.0,              // density of nodes
    maxDistance: 22.0,         // max connection distance
    spacing: 18.0,             // spacing between points
    showDots: true,
  });
}

// ─── GSAP hero text entrance animation ───────────────────────────────────────
function initHeroEntrance() {
  if (!window.gsap) return;

  const tl = gsap.timeline({ delay: 1.0 }); // after loader

  // Pill label flies in
  tl.fromTo('#hero-label',
    { opacity: 0, y: 20, filter: 'blur(4px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
  );

  // Hero title words stagger
  const titleLines = document.querySelectorAll('.hero-title, .hero-title-outline');
  tl.fromTo(titleLines,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power4.out' },
    '-=0.2'
  );

  // Subtitle
  tl.fromTo('.hero-subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.3'
  );

  // CTA buttons
  tl.fromTo('.hero-actions .btn',
    { opacity: 0, y: 16, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
    '-=0.2'
  );

  // Badge float
  tl.fromTo('.badge-float',
    { opacity: 0, scale: 0.5, rotation: -15 },
    { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
    '-=0.3'
  );
}

// ─── GSAP ScrollTrigger — sections animate in ────────────────────────────────
function initScrollAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Service cards stagger on scroll
  gsap.fromTo('.service-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#services',
        start: 'top 80%',
      }
    }
  );

  // Case study cards
  gsap.fromTo('.case-card',
    { opacity: 0, x: -40 },
    {
      opacity: 1, x: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#case-studies',
        start: 'top 75%',
      }
    }
  );

  // Section titles
  document.querySelectorAll('.section-title, .section-header').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });

  // Service detail sections — slide in alternating
  document.querySelectorAll('.service-detail').forEach((el, i) => {
    const dir = i % 2 === 0 ? -60 : 60;
    gsap.fromTo(el.querySelector('.service-detail-text'),
      { opacity: 0, x: dir },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' }
      }
    );
    if (el.querySelector('.service-detail-visual')) {
      gsap.fromTo(el.querySelector('.service-detail-visual'),
        { opacity: 0, x: -dir, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 75%' }
        }
      );
    }
  });

  // CTA banner
  gsap.fromTo('.cta-box',
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1, scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-banner', start: 'top 80%' }
    }
  );

  // Marquee section
  gsap.fromTo('.marquee-section',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      scrollTrigger: { trigger: '.marquee-section', start: 'top 90%' }
    }
  );
}

// ─── Lenis smooth scroll ──────────────────────────────────────────────────────
function initLenis() {
  if (!window.Lenis) return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1.0,
  });

  // Connect Lenis to GSAP ScrollTrigger if available
  if (window.gsap && window.ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  return lenis;
}

// ─── Neon cursor glow on hero (subtle) ───────────────────────────────────────
function initHeroCursorGlow() {
  const hero = document.getElementById('vanta-bg');
  if (!hero || window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: absolute; pointer-events: none; z-index: 2;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(178,255,51,0.08) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    top: 50%; left: 50%;
  `;
  hero.style.position = 'relative';
  hero.appendChild(glow);

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left) + 'px';
    glow.style.top  = (e.clientY - r.top) + 'px';
  });
  hero.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  hero.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
}

// ─── Typewriter glitch on hero title ─────────────────────────────────────────
function initTitleGlitch() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

  function glitch(el) {
    const original = el.innerText;
    let iteration = 0;
    const interval = setInterval(() => {
      el.innerText = original.split('').map((char, idx) => {
        if (idx < iteration) return original[idx];
        if (char === '\n' || char === ' ') return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iteration >= original.length) clearInterval(interval);
      iteration += 1.5;
    }, 35);
  }

  // Trigger on hover
  title.style.cursor = 'default';
  title.addEventListener('mouseenter', () => glitch(title));
}

// ─── MAIN INIT ────────────────────────────────────────────────────────────────
export async function initVantaHero() {
  try {
    // Load all external libs in parallel where possible
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');

    // Load GSAP + plugins
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');

    // Load Lenis
    await loadScript('https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.29/bundled/lenis.min.js');

    // Init everything
    initVanta();
    initLenis();
    initHeroEntrance();
    initScrollAnimations();
    initHeroCursorGlow();
    initTitleGlitch();

  } catch (err) {
    console.warn('[Synthetix] 3D animation failed to load, falling back silently.', err);
  }
}

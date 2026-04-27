/* =============================================
   SHARED.JS — Runs on every page
   ============================================= */

// ---- LOADING SCREEN ----
export function initLoader() {
  const screen = document.getElementById('loading-screen');
  const bar = screen?.querySelector('.loader-bar');
  if (!screen) return;

  if (bar) {
    requestAnimationFrame(() => { bar.style.width = '100%'; });
  }
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 900);
  document.body.style.overflow = 'hidden';
}

// ---- PAGE TRANSITIONS ----
export function initPageTransitions() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // Slide out on load (reset)
  setTimeout(() => { overlay.classList.add('slide-out'); }, 50);

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.remove('slide-out');
      overlay.classList.add('slide-in');
      setTimeout(() => { window.location.href = href; }, 460);
    });
  });
}



// ---- SCROLL PROGRESS BAR ----
export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
}

// ---- ACTIVE NAV LINK ----
export function initActiveNav() {
  const links = document.querySelectorAll('.nav-links-pill a');
  const currentPath = window.location.pathname;
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    } else if (currentPath === '/' && href === 'index.html') {
      link.classList.add('active');
    }
  });
}

// ---- SCROLL REVEAL ----
export function initScrollReveal(selectors = '') {
  const defaultSelectors = '.section-header, .service-card, .case-card, .case-card-full, .testimonial-card, .pricing-card, .team-card, .value-card, .contact-info-card, .contact-form-wrap, .faq-item, .process-step, .about-stat-box, .service-full-detail';
  const all = selectors ? defaultSelectors + ', ' + selectors : defaultSelectors;

  document.querySelectorAll(all).forEach((el, i) => {
    el.classList.add('reveal');
    const delay = (i % 4) * 100; // Stagger by 100ms
    el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ---- SMOOTH SCROLL ----
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    });
  });
}

// ---- NAVBAR SCROLL ----
export function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 0 #000' : 'none';
  }, { passive: true });
}

// ---- ANIMATED COUNTERS ----
export function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(el);
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}

// ---- FAQ ACCORDION ----
export function initFAQ() {
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ---- MOBILE NAV ----
export function initMobileNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const burger = document.createElement('button');
  burger.innerHTML = '☰';
  burger.id = 'mobile-burger';
  burger.setAttribute('aria-label', 'Toggle navigation');
  burger.style.cssText = 'display:none;background:#000;color:#fff;border:3px solid #000;border-radius:8px;width:44px;height:44px;font-size:1.3rem;cursor:pointer;align-items:center;justify-content:center;';
  const navbarInner = document.querySelector('.navbar-inner');
  if (navbarInner) navbarInner.insertBefore(burger, nav);

  let open = false;
  burger.addEventListener('click', () => {
    open = !open;
    burger.innerHTML = open ? '✕' : '☰';
    if (open) {
      nav.style.cssText = 'display:flex;position:absolute;top:70px;left:16px;right:16px;flex-direction:column;background:#fff;border:3px solid #000;border-radius:12px;padding:12px;z-index:200;box-shadow:4px 4px 0 #000;';
    } else {
      nav.style.display = '';
    }
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { open = false; burger.innerHTML = '☰'; nav.style.display = ''; }));

  function checkWidth() {
    if (window.innerWidth <= 768) { burger.style.display = 'flex'; if (!open) nav.style.display = 'none'; }
    else { burger.style.display = 'none'; nav.style.display = ''; }
  }
  window.addEventListener('resize', checkWidth, { passive: true });
  checkWidth();
}

// ---- SHARED INIT ----
export function initAll() {
  injectAliveLayer();
  initLoader();
  initPageTransitions();
  initCustomCursor();
  initNavbarScroll();
  initScrollProgress();
  initMagnetic();
  initCardTilt();
  initActiveNav();
  initSmoothScroll();
  initMobileNav();
  initCaseFilters();
  initDynamicStatus();
}

function initMagnetic() {
  const elements = document.querySelectorAll('.btn, .nav-links-pill a, .logo');
  elements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

function initCardTilt() {
  document.querySelectorAll('.brutalist-card, .case-card, .team-card, .value-card, .pricing-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      card.style.transform = `translate(-2px,-2px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

function initCaseFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.case-card-full');
  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('filtering-out');
          card.style.display = 'block';
          setTimeout(() => card.classList.add('filtering-in'), 10);
        } else {
          card.classList.add('filtering-out');
          card.classList.remove('filtering-in');
          setTimeout(() => { if (card.classList.contains('filtering-out')) card.style.display = 'none'; }, 400);
        }
      });
    });
  });
}

function initDynamicStatus() {
  const statusEl = document.querySelector('.status-indicator span:last-child');
  if (!statusEl) return;
  
  let start = Date.now();
  setInterval(() => {
    const diff = Math.floor((Date.now() - start) / 1000);
    statusEl.innerHTML = `SYSTEMS ONLINE <span style="opacity:0.6;margin-left:8px;">LAST SYNC: ${diff}s AGO</span>`;
  }, 1000);
}

function injectAliveLayer() {
  if (document.getElementById('custom-cursor')) return;
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  const outline = document.createElement('div');
  outline.id = 'custom-cursor-outline';
  const noise = document.createElement('div');
  noise.className = 'noise-overlay';
  document.body.appendChild(cursor);
  document.body.appendChild(outline);
  document.body.appendChild(noise);
}

function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cursor = document.getElementById('custom-cursor');
  const outline = document.getElementById('custom-cursor-outline');
  if (!cursor || !outline) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;

    cursor.style.left = `${cursorX - 4}px`;
    cursor.style.top = `${cursorY - 4}px`;
    outline.style.left = `${outlineX - 16}px`;
    outline.style.top = `${outlineY - 16}px`;

    requestAnimationFrame(animate);
  }
  animate();

  const interactables = document.querySelectorAll('a, button, .btn, .nav-links-pill a, .logo, .case-card-full, .pricing-card, .filter-tab');
  interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      outline.classList.add('hover');
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      outline.classList.remove('hover');
      document.body.classList.remove('cursor-hover');
    });
  });
}

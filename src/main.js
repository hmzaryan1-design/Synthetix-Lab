import './style.css';
import { initAll, initScrollReveal, initCounters } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
  initAll();
  initScrollReveal('.hero-content, .hero-visual, .marquee-section, .cta-box');
  initCounters();
  initChartBars();
  initTypewriter();
});



function initChartBars() {
  document.querySelectorAll('.chart-bar').forEach((bar) => {
    const h = bar.style.height; bar.style.height = '0%';
    bar.style.transition = 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    bar.dataset.h = h;
  });
  const observer = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.chart-bar').forEach((b, i) => setTimeout(() => { b.style.height = b.dataset.h; }, i * 100));
    observer.unobserve(e.target);
  }, { threshold: 0.3 });
  document.querySelectorAll('.chart-bars').forEach((w) => observer.observe(w));
}

function initTypewriter() {
  const el = document.getElementById('hero-label');
  if (!el) return;
  const txt = el.textContent; el.textContent = ''; let i = 0;
  const type = () => { if (i < txt.length) { el.textContent += txt[i++]; setTimeout(type, 45); } };
  setTimeout(type, 900);
}

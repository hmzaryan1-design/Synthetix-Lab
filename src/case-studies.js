import './style.css';
import { initAll, initScrollReveal, initCounters } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
  initAll();
  initScrollReveal();
  initCounters();
  initFilter();
});

function initFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.case-card-full');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? 'flex' : 'none';
        if (show) {
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = '';
            card.classList.add('visible');
          });
        }
      });
    });
  });
}

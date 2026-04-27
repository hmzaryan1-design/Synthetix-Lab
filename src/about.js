import './style.css';
import { initAll, initScrollReveal, initCounters } from './shared.js';
document.addEventListener('DOMContentLoaded', () => {
  initAll();
  initScrollReveal();
  initCounters();
});

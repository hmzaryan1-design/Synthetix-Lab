import './style.css';
import { initAll, initScrollReveal } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
  initAll();
  initScrollReveal();
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('[required]');
    let valid = true;

    inputs.forEach((input) => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#ff4444';
        valid = false;
      }
    });

    if (!valid) {
      const firstError = form.querySelector('[required][style*="ff4444"]');
      if (firstError) firstError.focus();
      return;
    }

    const btn = form.querySelector('#contact-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      form.style.display = 'none';
      success.classList.add('show');
    })
    .catch((error) => console.error('Form submission error:', error))
    .finally(() => {
      btn.textContent = 'Send Message ↗';
      btn.disabled = false;
    });
  });

  // Clear errors on input
  form.querySelectorAll('.form-control').forEach((input) => {
    input.addEventListener('input', () => { input.style.borderColor = ''; });
  });
}

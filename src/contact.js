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

    // FORMSPREE — replace YOUR_FORM_ID with your real Formspree form ID
    // Go to formspree.io → New Form → copy your endpoint ID
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then((res) => {
      if (res.ok) {
        form.style.display = 'none';
        if (success) success.classList.add('show');
      } else {
        res.json().then((data) => {
          alert('Error sending message. Please email us at hello@synthetixlab.io');
          console.error('Formspree error:', data);
        });
      }
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      alert('Network error. Please email us at hello@synthetixlab.io');
    })
    .finally(() => {
      btn.textContent = 'Send Message ↗';
      btn.disabled = false;
    });
  });

  form.querySelectorAll('.form-control').forEach((input) => {
    input.addEventListener('input', () => { input.style.borderColor = ''; });
  });
}

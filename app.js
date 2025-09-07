// app.js — auth, validation, and simple helpers shared across pages.
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';

  // Utility helpers
  const q = sel => document.querySelector(sel);
  const showError = (el, msg) => { if (el) el.textContent = msg; };
  const isHTTPS = location.protocol === 'https:' || ['localhost','127.0.0.1'].includes(location.hostname);

  // -------- Auth page (index.html) --------
  if (path === 'index.html') {
    const form = q('#authForm');
    const err = q('#authError');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        err.textContent = '';
        const email = q('#email').value.trim();
        const pass = q('#password').value;

        // Validation
        const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRe.test(email)) return showError(err, 'Enter a valid email.');
        if (pass.length < 6) return showError(err, 'Password must be at least 6 characters.');

        localStorage.setItem('arhub_user', email);
        localStorage.setItem('arhub_loggedin', '1');
        location.href = 'dashboard.html';
      });
    }
  }

  // -------- Dashboard page --------
  if (path === 'dashboard.html') {
    if (!localStorage.getItem('arhub_loggedin')) return location.replace('index.html');
    const email = localStorage.getItem('arhub_user') || '';
    const emailSpan = q('#userEmail'); if (emailSpan) emailSpan.textContent = email;
    const logoutBtn = q('#logoutBtn');
    logoutBtn && logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('arhub_loggedin');
      localStorage.removeItem('arhub_user');
      location.href = 'index.html';
    });
  }

  // -------- Marker AR page --------
  if (path === 'ar-marker.html') {
    if (!isHTTPS) alert('For camera access, open this site via HTTPS or localhost.');
  }

  // -------- Markerless placement page --------
  if (path === 'ar-place.html') {
    if (!isHTTPS) alert('For AR placement, open this site via HTTPS or localhost.');
  }
});

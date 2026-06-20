'use strict';

// ---------- scroll reveal ----------
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

// ---------- dock active state (scroll spy) ----------
const dockFor = {};
document.querySelectorAll('[data-dock-link]').forEach(function (l) {
  dockFor[l.getAttribute('href').slice(1)] = l;
});
const spy = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    const link = dockFor[entry.target.id];
    if (link && entry.isIntersecting) {
      Object.values(dockFor).forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

// ---------- footer year ----------
document.querySelector('[data-year]').textContent = new Date().getFullYear();

/* Perfect Image Photography — behaviour, added phase by phase.
   Phase 2: header (scroll state, mobile menu), WhatsApp links, click tracking. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA_NUMBER = '2347065428557'; // TODO-CONFIRM this number is on WhatsApp

  /* GA4-ready event hook (no GA ID needed for the demo). */
  window.track = function (eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (el) window.track(el.getAttribute('data-track'), { link_text: el.textContent.trim() });
  });

  /* WhatsApp links: the base href works without JS; JS adds the pre-filled message from content.md. */
  var WA_MESSAGES = {
    general: "Hi Perfect Image Photography, I'd like to [TODO: book a session / check if you're available for my date]."
  };
  window.waLink = function (text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  };
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var msg = WA_MESSAGES[a.getAttribute('data-wa')];
    if (msg) a.href = window.waLink(msg);
  });

  /* Header: solid once scrolled */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile full-screen menu */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var root = document.documentElement;
  function setMenu(open) {
    root.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 62.01rem)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  window.PI = { reduceMotion: reduceMotion };
})();

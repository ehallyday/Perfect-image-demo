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
    var kind = a.getAttribute('data-wa');
    var msg;
    if (kind === 'package') {
      var pkg = a.closest('[data-package]');
      msg = "Hi Perfect Image Photography, I'd like to book the " + (pkg ? pkg.getAttribute('data-package') : '[Package name]') + '.';
    } else {
      msg = WA_MESSAGES[kind];
    }
    if (msg) a.href = window.waLink(msg);
  });

  /* "Book this": the link scrolls to #book; remember the package so the booking form (Phase 6)
     can pre-select it. */
  window.PI = window.PI || {};
  document.querySelectorAll('[data-book-package]').forEach(function (a) {
    a.addEventListener('click', function () {
      var pkg = a.closest('[data-package]');
      window.PI.selectedPackage = pkg ? pkg.getAttribute('data-package') : '';
      var select = document.getElementById('f-package');
      if (select && window.PI.selectedPackage) select.value = window.PI.selectedPackage;
    });
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

  /* Work: filters, frame numbers, strip arrows, lightbox (GLightbox) */
  var strip = document.getElementById('work-strip');
  if (strip) {
    var items = Array.prototype.slice.call(strip.children);
    var chips = document.querySelectorAll('.work-filters .chip');
    var count = document.querySelector('.work-count');
    var lightbox = null;

    function visibleItems() {
      return items.filter(function (li) { return !li.hidden; });
    }

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function buildLightbox() {
      if (typeof window.GLightbox !== 'function') return;
      if (lightbox) lightbox.destroy();
      var elements = visibleItems().map(function (li) {
        var a = li.querySelector('a');
        return {
          href: a.getAttribute('href'),
          type: 'image',
          alt: li.querySelector('img').alt,
          description: a.getAttribute('data-desc') || ''
        };
      });
      lightbox = window.GLightbox({ elements: elements, loop: true, touchNavigation: true });
    }

    function applyFilter(cat) {
      items.forEach(function (li) {
        li.hidden = !(cat === 'all' || li.getAttribute('data-cat') === cat);
      });
      var vis = visibleItems();
      vis.forEach(function (li, i) {
        li.querySelector('.frame-no').textContent = pad(i + 1) + ' / ' + pad(vis.length);
      });
      count.textContent = vis.length + (vis.length === 1 ? ' frame' : ' frames');
      strip.scrollLeft = 0;
      buildLightbox();
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        applyFilter(chip.getAttribute('data-filter'));
      });
    });

    strip.addEventListener('click', function (e) {
      var a = e.target.closest('a.work-item');
      if (!a) return;
      if (!lightbox) return; /* CDN blocked: the link just opens the image */
      e.preventDefault();
      lightbox.openAt(visibleItems().indexOf(a.parentNode));
    });

    function scrollStrip(dir) {
      strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    document.querySelector('.work-prev').addEventListener('click', function () { scrollStrip(-1); });
    document.querySelector('.work-next').addEventListener('click', function () { scrollStrip(1); });

    /* GLightbox loads deferred before this script, so it is ready here */
    applyFilter('all');
  }

  window.PI.reduceMotion = reduceMotion;
})();

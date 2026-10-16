/* Perfect Image Photography — behaviour.
   Phase 1: scaffold only. Features are added phase by phase. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* GA4-ready event hook (no GA ID needed for the demo).
     Phase 7 wires [data-track] buttons to this. */
  window.track = function (eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  };

  window.PI = { reduceMotion: reduceMotion };
})();

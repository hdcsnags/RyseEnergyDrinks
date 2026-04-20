import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js';

let initialized = false;
let reducedMotionQuery = null;

function getReducedMotionPreference() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  }

  return reducedMotionQuery.matches;
}

function getHeroGridLayer() {
  if (typeof document === 'undefined') {
    return null;
  }

  return document.querySelector('.hero-grid svg, .hero-grid');
}

export function initAnimation() {
  if (initialized) {
    return;
  }

  initialized = true;

  if (getReducedMotionPreference()) {
    return;
  }

  if (!gsap || !ScrollTrigger) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const heroGridLayer = getHeroGridLayer();
  if (!heroGridLayer) {
    return;
  }

  gsap.set(heroGridLayer, {
    opacity: 0.7,
    y: 0,
  });

  gsap.timeline({
    defaults: {
      ease: 'none',
    },
    scrollTrigger: {
      trigger: heroGridLayer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
    },
  })
    .to(heroGridLayer, {
      opacity: 0.95,
      y: -10,
      duration: 1,
    })
    .to(heroGridLayer, {
      opacity: 0.82,
      y: 6,
      duration: 1,
    });
}

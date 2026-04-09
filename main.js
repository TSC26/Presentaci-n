/* =============================================
   MAIN.JS — TSC Pitch Deck
   Trabajos San Cosme × UC Christus 2025
   ============================================= */

import { initProgressBar, animateCounter, initNavDots } from '../../shared/js/core.js';

/* ── Setup ────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ── Progress bar ─────────────────────────── */
initProgressBar();

/* ── Nav dots ─────────────────────────────── */
const sections = ['hero','indice','jefas','que-es','pilares','comisiones','cifras','fechas','innovacion','colaboracion','modelo-cua','modelo-uc','impacto','cierre'];
initNavDots(sections);

/* ── Hero entrance ───────────────────────── */
gsap.timeline({ delay: 0.2 })
  .fromTo('.hero .reveal', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
  });

/* Floating orbs parallax */
gsap.to('.orb--1', { y: -60, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});
gsap.to('.orb--2', { y: -40, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});

/* Hero cross parallax */
gsap.to('.hero__cross', { y: -80, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});

/* ── Generic scroll reveals ──────────────── */
document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 36 }, {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

document.querySelectorAll('.reveal-left').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: -44 }, {
    opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

document.querySelectorAll('.reveal-right').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: 44 }, {
    opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

/* ── Pillar tabs ─────────────────────────── */
const tabs = document.querySelectorAll('.pillar-tab');
const panels = document.querySelectorAll('.pillar-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.panel;
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + target)?.classList.add('active');
  });
});

/* Auto-cycle pillars while section in view */
let pillarInterval = null;
let pillarIdx = 0;
const pillarIds = ['salud', 'construccion', 'comunidad'];

ScrollTrigger.create({
  trigger: '#pilares',
  start: 'top 60%',
  end: 'bottom 40%',
  onEnter: () => {
    pillarInterval = setInterval(() => {
      pillarIdx = (pillarIdx + 1) % pillarIds.length;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      document.querySelector(`[data-panel="${pillarIds[pillarIdx]}"]`)?.classList.add('active');
      document.getElementById('panel-' + pillarIds[pillarIdx])?.classList.add('active');
    }, 3500);
  },
  onLeave: () => { clearInterval(pillarInterval); },
  onEnterBack: () => {
    pillarInterval = setInterval(() => {
      pillarIdx = (pillarIdx + 1) % pillarIds.length;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      document.querySelector(`[data-panel="${pillarIds[pillarIdx]}"]`)?.classList.add('active');
      document.getElementById('panel-' + pillarIds[pillarIdx])?.classList.add('active');
    }, 3500);
  },
  onLeaveBack: () => { clearInterval(pillarInterval); }
});

/* ── KPI counters ─────────────────────────── */
document.querySelectorAll('.kpi__number[data-target]').forEach(el => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let triggered = false;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      if (!triggered) {
        triggered = true;
        animateCounter(el, target, 1800, '', suffix);
      }
    }
  });
});

/* ── Impact counter ──────────────────────── */
const impactEl = document.getElementById('impactCounter');
if (impactEl) {
  let done = false;
  ScrollTrigger.create({
    trigger: impactEl,
    start: 'top 85%',
    onEnter: () => {
      if (!done) {
        done = true;
        animateCounter(impactEl, 8500000, 2000, '$', '');
      }
    }
  });
}

/* ── Chart.js donations chart ────────────── */
ScrollTrigger.create({
  trigger: '#donationsChart',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    const ctx = document.getElementById('donationsChart')?.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(29, 78, 216, 0.4)');
    gradient.addColorStop(1, 'rgba(29, 78, 216, 0)');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2019','2020','2021','2022','2023','2024'],
        datasets: [{
          label: 'Donaciones ($)',
          data: [2800000, 0, 1200000, 4500000, 6200000, 8500000],
          backgroundColor: gradient,
          borderColor: '#60a5fa',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1200, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1c232f',
            borderColor: 'rgba(96,165,250,0.3)',
            borderWidth: 1,
            titleColor: '#f0f4ff',
            bodyColor: '#94a3b8',
            callbacks: {
              label: ctx => `$${ctx.raw.toLocaleString('es-CL')}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#94a3b8', font: { size: 12 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: {
              color: '#94a3b8',
              font: { size: 12 },
              callback: v => '$' + (v / 1000000).toFixed(1) + 'M'
            }
          }
        }
      }
    });
  }
});

/* ── Card stagger animations ─────────────── */
document.querySelectorAll('.grid-3, .grid-4').forEach(grid => {
  const cards = grid.querySelectorAll('.card');
  if (!cards.length) return;
  gsap.fromTo(cards,
    { opacity: 0, y: 24, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.55, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});

/* ── Step items stagger ──────────────────── */
document.querySelectorAll('.steps').forEach(stepsEl => {
  const items = stepsEl.querySelectorAll('.step');
  if (!items.length) return;
  gsap.fromTo(items,
    { opacity: 0, x: -24 },
    {
      opacity: 1, x: 0,
      duration: 0.5, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: stepsEl, start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});

/* ── Timeline items ──────────────────────── */
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0,
      duration: 0.5, delay: i * 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* ── Closing logo animation ──────────────── */
gsap.fromTo('.closing-logo',
  { opacity: 0, scale: 0.7, filter: 'blur(12px)' },
  {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    duration: 1.2, ease: 'power4.out',
    scrollTrigger: { trigger: '.closing-section', start: 'top 70%', toggleActions: 'play none none none' }
  }
);

/* ── KPI item hover pulse ─────────────────── */
document.querySelectorAll('.kpi-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item, { scale: 1, duration: 0.25, ease: 'power2.out' });
  });
});

console.log('%c🏥 TSC × UC Christus 2025', 'color:#60a5fa; font-size:16px; font-weight:bold;');

/* =============================================
   CORE.JS — Shared utilities
   ============================================= */

/* ── Progress bar ─────────────────────────── */
export function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
}

/* ── Animated counter ─────────────────────── */
export function animateCounter(el, target, duration = 1800, prefix = '', suffix = '') {
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = ease * target;
    el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString('es-CL')) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = prefix + (isFloat ? target.toFixed(1) : target.toLocaleString('es-CL')) + suffix;
  };
  requestAnimationFrame(step);
}

/* ── Video autoplay on viewport ───────────── */
export function initVideoObserver() {
  const videos = document.querySelectorAll('video[data-autoplay]');
  if (!videos.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    });
  }, { threshold: 0.3 });
  videos.forEach(v => { v.muted = true; v.loop = true; obs.observe(v); });
}

/* ── Nav dots ─────────────────────────────── */
export function initNavDots(sections) {
  const container = document.getElementById('nav-dots');
  if (!container) return;
  const dots = sections.map((id, i) => {
    const d = document.createElement('div');
    d.className = 'nav-dot';
    d.title = id;
    d.addEventListener('click', () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
    container.appendChild(d);
    return d;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = sections.indexOf(e.target.id);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

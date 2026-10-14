import { useCallback, useEffect, useRef, useState } from 'react';

export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

// Tracks which section id is currently in the middle of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  const key = ids.join('|');

  useEffect(() => {
    const nodes = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

// 3D tilt + glare that follows the pointer. Spread the returned props onto the element.
export function useTilt(max = 8) {
  const ref = useRef(null);
  const frame = useRef(0);

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || e.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
        el.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
        el.style.setProperty('--mx', `${x * 100}%`);
        el.style.setProperty('--my', `${y * 100}%`);
      });
    },
    [max]
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}

// Counts from 0 to `target` once `start` becomes true.
export function useCountUp(target, start, { duration = 1400, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value.toFixed(decimals);
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

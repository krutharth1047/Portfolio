import React, { useEffect, useRef } from 'react';

// Hero background: drifting data points that link up with each other and with
// the cursor. Clicking sends a pulse that pushes nearby points away.
export default function DataField({ reducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false };
    const pulses = [];
    let points = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--accent-rgb').trim() || '124, 243, 196';
    const accent2 = styles.getPropertyValue('--accent-2-rgb').trim() || '122, 162, 255';

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(36, (width * height) / 14000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        hue: Math.random() < 0.7 ? accent : accent2,
      }));
    };

    const linkDist = () => Math.min(150, Math.max(90, width / 10));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const maxD = linkDist();

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        p.r += 6;
        p.alpha *= 0.94;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accent}, ${p.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (p.alpha < 0.02) pulses.splice(i, 1);
      }

      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        if (!reducedMotion) {
          // gentle pull toward the cursor
          if (pointer.active) {
            const dx = pointer.x - a.x;
            const dy = pointer.y - a.y;
            const d = Math.hypot(dx, dy);
            if (d < 220 && d > 1) {
              a.vx += (dx / d) * 0.012;
              a.vy += (dy / d) * 0.012;
            }
          }
          pulses.forEach((p) => {
            const dx = a.x - p.x;
            const dy = a.y - p.y;
            const d = Math.hypot(dx, dy);
            if (Math.abs(d - p.r) < 30 && d > 1) {
              a.vx += (dx / d) * 0.6 * p.alpha;
              a.vy += (dy / d) * 0.6 * p.alpha;
            }
          });
          a.vx *= 0.985;
          a.vy *= 0.985;
          const speed = Math.hypot(a.vx, a.vy);
          if (speed < 0.12) {
            a.vx += (Math.random() - 0.5) * 0.05;
            a.vy += (Math.random() - 0.5) * 0.05;
          }
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
          a.x = Math.max(0, Math.min(width, a.x));
          a.y = Math.max(0, Math.min(height, a.y));
        }

        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxD) {
            ctx.strokeStyle = `rgba(${a.hue}, ${(1 - d / maxD) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (d < maxD * 1.4) {
            ctx.strokeStyle = `rgba(${accent}, ${(1 - d / (maxD * 1.4)) * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${a.hue}, 0.85)`;
        ctx.fill();
      }

      if (running && !reducedMotion) raf = requestAnimationFrame(draw);
    };

    const toLocal = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      const p = toLocal(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = p.y >= 0 && p.y <= height;
      if (reducedMotion) draw();
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (e) => {
      if (e.target.closest('a, button, input')) return;
      const p = toLocal(e);
      if (p.y < 0 || p.y > height) return;
      pulses.push({ x: p.x, y: p.y, r: 4, alpha: 0.7 });
    };

    // Stop animating when the hero is off screen.
    const visibility = new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning && !reducedMotion) raf = requestAnimationFrame(draw);
    });

    resize();
    draw();
    visibility.observe(canvas);
    const host = canvas.parentElement;
    window.addEventListener('resize', resize);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);

    return () => {
      cancelAnimationFrame(raf);
      visibility.disconnect();
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="data-field" aria-hidden="true" />;
}

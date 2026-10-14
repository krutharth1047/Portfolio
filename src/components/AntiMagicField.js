import React, { useEffect, useRef } from 'react';

// Hero background, inspired by Black Clover: mana motes drift upward, the
// cursor is an anti-magic aura that negates (reddens) and repels them, and a
// click or tap swings a sword slash that blasts nearby motes away.
const MANA = [
  [242, 193, 78], // gold
  [150, 240, 170], // clover green
  [235, 230, 215], // pale
];
const ANTI = [255, 59, 79];

export default function AntiMagicField({ reducedMotion, onSlash }) {
  const canvasRef = useRef(null);
  const slashCb = useRef(onSlash);
  slashCb.current = onSlash;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false, moved: 0 };
    let motes = [];
    const embers = [];
    const slashes = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let t = 0;

    const spawnMote = (anywhere) => {
      const c = MANA[Math.random() < 0.55 ? 0 : Math.random() < 0.6 ? 1 : 2];
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : height + 10,
        vx: 0,
        vy: -(0.15 + Math.random() * 0.45),
        r: 0.6 + Math.random() * 1.8,
        c,
        neg: 0,
        phase: Math.random() * Math.PI * 2,
        sway: 0.3 + Math.random() * 0.7,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(150, Math.max(50, (width * height) / 9000)));
      motes = Array.from({ length: count }, () => spawnMote(true));
    };

    const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));

    const drawSlash = (s) => {
      const grow = Math.min(1, s.age / 7);
      const fade = Math.max(0, 1 - Math.max(0, s.age - 7) / 26);
      const len = s.len * grow;
      const dx = Math.cos(s.angle);
      const dy = Math.sin(s.angle);
      const x1 = s.x - dx * s.len * 0.5;
      const y1 = s.y - dy * s.len * 0.5;
      const x2 = x1 + dx * len;
      const y2 = y1 + dy * len;

      const grad = ctx.createLinearGradient(x1, y1, x1 + dx * s.len, y1 + dy * s.len);
      grad.addColorStop(0, `rgba(${ANTI}, 0)`);
      grad.addColorStop(0.5, `rgba(${ANTI}, ${0.9 * fade})`);
      grad.addColorStop(1, `rgba(${ANTI}, 0)`);
      ctx.lineCap = 'round';
      ctx.strokeStyle = grad;
      ctx.lineWidth = 14 * fade + 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(255, 245, 240, ${fade})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1 + dx * s.len * 0.15 * grow, y1 + dy * s.len * 0.15 * grow);
      ctx.lineTo(x2 - dx * s.len * 0.15 * grow, y2 - dy * s.len * 0.15 * grow);
      ctx.stroke();

      // shockwave ring
      ctx.strokeStyle = `rgba(${ANTI}, ${0.35 * fade})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.age * 7, 0, Math.PI * 2);
      ctx.stroke();
    };

    const frame = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const R = Math.min(170, Math.max(110, width / 9));

      // anti-magic aura around the cursor
      if (pointer.active) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, R);
        g.addColorStop(0, `rgba(${ANTI}, 0.18)`);
        g.addColorStop(0.55, `rgba(${ANTI}, 0.07)`);
        g.addColorStop(1, `rgba(${ANTI}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, R, 0, Math.PI * 2);
        ctx.fill();

        if (!reducedMotion && embers.length < 140) {
          const n = pointer.moved > 2 ? 3 : 1;
          for (let i = 0; i < n; i += 1) {
            const a = Math.random() * Math.PI * 2;
            const d = Math.random() * 18;
            embers.push({
              x: pointer.x + Math.cos(a) * d,
              y: pointer.y + Math.sin(a) * d,
              vx: (Math.random() - 0.5) * 0.8,
              vy: -(0.6 + Math.random() * 1.4),
              life: 1,
              r: 1 + Math.random() * 2.2,
            });
          }
        }
        pointer.moved *= 0.8;
      }

      // motes
      for (let i = 0; i < motes.length; i += 1) {
        const m = motes[i];
        if (!reducedMotion) {
          if (pointer.active) {
            const dx = m.x - pointer.x;
            const dy = m.y - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < R && d > 0.5) {
              const f = (1 - d / R) * 0.35;
              m.vx += (dx / d) * f;
              m.vy += (dy / d) * f;
              m.neg = Math.min(1, m.neg + 0.08);
            }
          }
          m.neg *= 0.985;
          m.vx *= 0.94;
          m.vy += (-(0.15 + m.r * 0.12) - m.vy) * 0.02;
          m.x += m.vx + Math.sin(t * 0.01 * m.sway + m.phase) * 0.25;
          m.y += m.vy;
          if (m.y < -12 || m.x < -20 || m.x > width + 20) motes[i] = spawnMote(false);
        }
        const flicker = 0.55 + 0.45 * Math.sin(t * 0.05 + m.phase);
        const col = mix(m.c, ANTI, m.neg);
        ctx.fillStyle = `rgba(${col}, ${0.12 * flicker})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${col}, ${0.85 * flicker})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // anti-magic embers: crimson that burns out to black
      ctx.globalCompositeOperation = 'source-over';
      for (let i = embers.length - 1; i >= 0; i -= 1) {
        const e = embers[i];
        e.x += e.vx + Math.sin((t + i) * 0.08) * 0.3;
        e.y += e.vy;
        e.life -= 0.022;
        if (e.life <= 0) {
          embers.splice(i, 1);
          continue;
        }
        const col = mix([20, 4, 8], ANTI, e.life);
        ctx.fillStyle = `rgba(${col}, ${e.life * 0.8})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * (0.5 + e.life * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'lighter';
      for (let i = slashes.length - 1; i >= 0; i -= 1) {
        const s = slashes[i];
        s.age += 1;
        drawSlash(s);
        if (s.age > 34) slashes.splice(i, 1);
      }
      ctx.globalCompositeOperation = 'source-over';

      if (running && !reducedMotion) raf = requestAnimationFrame(frame);
    };

    const toLocal = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const p = toLocal(e);
      pointer.moved += Math.hypot(p.x - pointer.x, p.y - pointer.y) > 4 ? 1 : 0;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = p.y >= 0 && p.y <= height;
      if (reducedMotion) frame();
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (e) => {
      if (reducedMotion || e.target.closest('a, button, input')) return;
      const p = toLocal(e);
      if (p.y < 0 || p.y > height) return;
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.9;
      const len = Math.min(720, width * 0.7);
      slashes.push({ x: p.x, y: p.y, angle, len, age: 0 });
      // blast motes away from the blade
      const nx = -Math.sin(angle);
      const ny = Math.cos(angle);
      motes.forEach((m) => {
        const rx = m.x - p.x;
        const ry = m.y - p.y;
        const along = rx * Math.cos(angle) + ry * Math.sin(angle);
        const across = rx * nx + ry * ny;
        if (Math.abs(along) < len / 2 && Math.abs(across) < 120) {
          const side = across >= 0 ? 1 : -1;
          const force = (1 - Math.abs(across) / 120) * 9;
          m.vx += nx * side * force;
          m.vy += ny * side * force;
          m.neg = 1;
        }
      });
      if (slashCb.current) slashCb.current();
    };

    const visibility = new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning && !reducedMotion) raf = requestAnimationFrame(frame);
    });

    resize();
    frame();
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

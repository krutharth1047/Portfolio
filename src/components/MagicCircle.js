import React from 'react';

const C = 300; // centre of the 600×600 viewBox
const RING_TEXT =
  'SURPASS YOUR LIMITS ✦ KRUTHARTH R KUMAR ✦ DATA ✦ PIPELINES ✦ FORECASTS ✦ ANTI-MAGIC ✦ AMSTERDAM ✦ ';

const point = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};

// Five-point star {5/2} inscribed in radius r.
const starPath = (r) =>
  [0, 2, 4, 1, 3].map((k, i) => `${i ? 'L' : 'M'}${point(r, k * 72).join(' ')}`).join(' ') + ' Z';

// One heart-shaped leaf pointing up from the centre; rotated five times for the clover.
const LEAF = `M ${C} ${C - 8}
  C ${C - 6} ${C - 30}, ${C - 34} ${C - 44}, ${C - 26} ${C - 66}
  C ${C - 20} ${C - 80}, ${C - 4} ${C - 78}, ${C} ${C - 64}
  C ${C + 4} ${C - 78}, ${C + 20} ${C - 80}, ${C + 26} ${C - 66}
  C ${C + 34} ${C - 44}, ${C + 6} ${C - 30}, ${C} ${C - 8} Z`;

// A grimoire-style magic circle with a five-leaf clover at its heart.
// `strike` changes on every sword slash in the hero and makes the circle flare.
export default function MagicCircle({ strike }) {
  return (
    <div className="magic-circle" aria-hidden="true">
      <svg viewBox="0 0 600 600">
        <defs>
          <path id="mc-ring" d={`M ${C} ${C} m -262 0 a 262 262 0 1 1 524 0 a 262 262 0 1 1 -524 0`} />
          <radialGradient id="mc-core">
            <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <circle cx={C} cy={C} r="150" fill="url(#mc-core)" className="mc-core" />

        <g className="mc-outer">
          <circle cx={C} cy={C} r="292" className="mc-line" />
          <circle cx={C} cy={C} r="284" className="mc-line mc-line--thin" />
          <text className="mc-text">
            <textPath href="#mc-ring" textLength={2 * Math.PI * 262} lengthAdjust="spacing">
              {RING_TEXT}
            </textPath>
          </text>
          <circle cx={C} cy={C} r="244" className="mc-line mc-ticks" />
        </g>

        <g className="mc-inner">
          <circle cx={C} cy={C} r="226" className="mc-line" />
          <path d={starPath(226)} className="mc-line mc-star" />
          {[0, 72, 144, 216, 288].map((deg) => {
            const [x, y] = point(226, deg);
            return (
              <g key={deg}>
                <circle cx={x} cy={y} r="16" className="mc-node" />
                <circle cx={x} cy={y} r="5" className="mc-node-dot" />
              </g>
            );
          })}
          <circle cx={C} cy={C} r="118" className="mc-line mc-line--thin" />
        </g>

        <g className="mc-clover">
          {[0, 72, 144, 216, 288].map((deg) => (
            <path key={deg} d={LEAF} transform={`rotate(${deg} ${C} ${C})`} className="mc-leaf" />
          ))}
          <circle cx={C} cy={C} r="9" className="mc-node-dot" />
        </g>
      </svg>
      <span key={strike} className={strike ? 'magic-circle__flash' : ''} />
    </div>
  );
}

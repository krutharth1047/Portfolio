import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles/ProjectDemos.css';

/* ------------------------------------------------------------------ */
/* Travel FP&A Copilot: revenue variance bridge                        */
/* ------------------------------------------------------------------ */

// A toy two-segment travel business. Revenue = volume × Σ(mix × price × take rate).
const BUDGET = {
  volume: 100000,
  segments: [
    { name: 'Hotels', mix: 0.6, price: 420, take: 0.15 },
    { name: 'Flights', mix: 0.4, price: 260, take: 0.06 },
  ],
};

const revenue = (volume, mixes, prices, takes) =>
  volume * mixes.reduce((sum, m, i) => sum + m * prices[i] * takes[i], 0);

// Sequential substitution, so the four effects always sum exactly to the variance.
function bridge({ volumePct, mixPp, pricePct, takePp }) {
  const seg = BUDGET.segments;
  const m0 = seg.map((s) => s.mix);
  const p0 = seg.map((s) => s.price);
  const t0 = seg.map((s) => s.take);
  const v1 = BUDGET.volume * (1 + volumePct / 100);
  const hotels = Math.min(0.95, Math.max(0.05, m0[0] + mixPp / 100));
  const m1 = [hotels, 1 - hotels];
  const p1 = p0.map((p) => p * (1 + pricePct / 100));
  const t1 = t0.map((t) => Math.max(0.005, t + takePp / 100));

  const r0 = revenue(BUDGET.volume, m0, p0, t0);
  const r1 = revenue(v1, m0, p0, t0);
  const r2 = revenue(v1, m1, p0, t0);
  const r3 = revenue(v1, m1, p1, t0);
  const r4 = revenue(v1, m1, p1, t1);

  return {
    budget: r0,
    actual: r4,
    effects: [
      { key: 'volume', label: 'Volume', value: r1 - r0, why: 'More or fewer bookings at budget mix, price and take rate.' },
      { key: 'mix', label: 'Mix', value: r2 - r1, why: 'Shift between hotels (high take rate) and flights (low take rate).' },
      { key: 'price', label: 'Price', value: r3 - r2, why: 'Change in average booking value.' },
      { key: 'take', label: 'Take rate', value: r4 - r3, why: 'Change in commission earned per euro booked.' },
    ],
  };
}

const eur = (v, digits = 0) => {
  const sign = v > 0.5 ? '+' : v < -0.5 ? '−' : '';
  return `${sign}€${Math.abs(v / 1000).toLocaleString('en-GB', { maximumFractionDigits: digits })}k`;
};
const eurM = (v) => `€${(v / 1e6).toFixed(2)}M`;

const SLIDERS = [
  { key: 'volumePct', label: 'Booking volume', min: -20, max: 20, step: 1, unit: '%' },
  { key: 'mixPp', label: 'Mix shift to hotels', min: -15, max: 15, step: 1, unit: ' pp' },
  { key: 'pricePct', label: 'Avg booking value', min: -15, max: 15, step: 1, unit: '%' },
  { key: 'takePp', label: 'Take rate', min: -3, max: 3, step: 0.5, unit: ' pp' },
];

const SCENARIOS = {
  'Summer surge': { volumePct: 8, mixPp: -6, pricePct: 4, takePp: -0.5 },
  'Price war': { volumePct: 3, mixPp: 0, pricePct: -6, takePp: -1.5 },
  'Hotel push': { volumePct: -2, mixPp: 10, pricePct: 2, takePp: 0.5 },
};

export function VarianceBridge() {
  const [inputs, setInputs] = useState(SCENARIOS['Summer surge']);
  const [hover, setHover] = useState(null);
  const data = useMemo(() => bridge(inputs), [inputs]);

  // Build the bars: two totals plus four floating deltas.
  const bars = [];
  let running = data.budget;
  bars.push({ key: 'budget', label: 'Budget', kind: 'total', from: 0, to: data.budget, value: data.budget });
  data.effects.forEach((e) => {
    const kind = Math.abs(e.value) < 500 ? 'flat' : e.value > 0 ? 'up' : 'down';
    bars.push({ ...e, kind, from: running, to: running + e.value });
    running += e.value;
  });
  bars.push({ key: 'actual', label: 'Actual', kind: 'total', from: 0, to: data.actual, value: data.actual });

  const levels = bars.filter((b) => b.kind !== 'total').flatMap((b) => [b.from, b.to]);
  levels.push(data.budget, data.actual);
  let lo = Math.min(...levels);
  let hi = Math.max(...levels);
  const span = Math.max(hi - lo, data.budget * 0.06);
  lo -= span * 0.9;
  hi += span * 0.35;

  const W = 460;
  const H = 250;
  const M = { l: 50, r: 6, t: 22, b: 30 };
  const iw = W - M.l - M.r;
  const ih = H - M.t - M.b;
  const y = (v) => M.t + ih - ((Math.max(v, lo) - lo) / (hi - lo)) * ih;
  const slot = iw / bars.length;
  const bw = Math.min(52, slot * 0.6);
  const x = (i) => M.l + slot * i + (slot - bw) / 2;
  const ticks = [0, 1, 2, 3].map((k) => lo + ((hi - lo) * k) / 3);

  const variance = data.actual - data.budget;
  const sumEffects = data.effects.reduce((s, e) => s + e.value, 0);
  const hovered = hover !== null ? bars[hover] : null;

  return (
    <div className="demo demo--bridge">
      <div className="demo__bar">
        <span className="mono small muted">variance_bridge.sql · try it</span>
        <div className="demo__scenarios">
          {Object.keys(SCENARIOS).map((name) => (
            <button key={name} type="button" className="mini-btn" onClick={() => setInputs(SCENARIOS[name])}>
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="bridge__chart">
        <div className="bridge__legend small">
          <span><i className="sw sw--total" /> Total</span>
          <span><i className="sw sw--up" /> Favourable</span>
          <span><i className="sw sw--down" /> Unfavourable</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Revenue bridge from budget ${eurM(data.budget)} to actual ${eurM(data.actual)}`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.l} x2={W - M.r} y1={y(t)} y2={y(t)} className="bridge__grid" />
              <text x={M.l - 8} y={y(t) + 4} className="bridge__tick" textAnchor="end">
                {eurM(t)}
              </text>
            </g>
          ))}

          {bars.map((b, i) => {
            const top = y(Math.max(b.from, b.to));
            const bottom = b.kind === 'total' ? M.t + ih : y(Math.min(b.from, b.to));
            const h = Math.max(2, bottom - top);
            const next = bars[i + 1];
            return (
              <g
                key={b.key}
                className={`bridge__bar bridge__bar--${b.kind} ${hover === i ? 'is-hover' : ''}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
              >
                <rect x={x(i) - (slot - bw) / 2} y={M.t} width={slot} height={ih} className="bridge__hit" />
                <rect x={x(i)} y={top} width={bw} height={h} rx="3" className="bridge__rect" />
                {b.kind === 'total' && (
                  <path
                    d={`M${x(i) - 3} ${M.t + ih - 10} l${bw + 6} -6 M${x(i) - 3} ${M.t + ih - 4} l${bw + 6} -6`}
                    className="bridge__break"
                  />
                )}
                <text x={x(i) + bw / 2} y={top - 7} textAnchor="middle" className="bridge__value">
                  {b.kind === 'total' ? eurM(b.value) : eur(b.value)}
                </text>
                <text x={x(i) + bw / 2} y={H - 12} textAnchor="middle" className="bridge__label">
                  {b.label}
                </text>
                {next && (
                  <line
                    x1={x(i) + bw}
                    x2={x(i + 1)}
                    y1={y(b.to)}
                    y2={y(b.to)}
                    className="bridge__connector"
                  />
                )}
              </g>
            );
          })}
        </svg>
        {hovered && (
          <div
            className="chart-tip small"
            style={{ left: `${((x(hover) + bw / 2) / W) * 100}%`, top: `${(y(Math.max(hovered.from, hovered.to)) / H) * 100}%` }}
          >
            <strong>{hovered.label}</strong>
            <span>{hovered.kind === 'total' ? eurM(hovered.value) : eur(hovered.value, 1)}</span>
            {hovered.why && <em>{hovered.why}</em>}
          </div>
        )}
        <span className="bridge__axis-note small muted">Axis starts at {eurM(lo)} so small effects stay visible.</span>
      </div>

      <div className="bridge__controls">
        {SLIDERS.map((s) => (
          <label key={s.key} className="slider">
            <span className="slider__top">
              <span>{s.label}</span>
              <span className="mono">
                {inputs[s.key] > 0 ? '+' : ''}
                {inputs[s.key]}
                {s.unit}
              </span>
            </span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={inputs[s.key]}
              onChange={(e) => setInputs((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))}
            />
          </label>
        ))}
      </div>

      <p className="bridge__check mono small">
        {data.effects.map((e) => eur(e.value)).join(' ')} = {eur(sumEffects)}{' '}
        <span className={Math.abs(sumEffects - variance) < 0.01 ? 'ok' : 'bad'}>
          {Math.abs(sumEffects - variance) < 0.01 ? '✓ reconciles to the variance' : '✗ does not reconcile'}
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Invoice Copilot: invoice routing simulation                         */
/* ------------------------------------------------------------------ */

const STAGES = ['Inbox', 'Extract', 'Accounting checks', '3-way match', 'Posted'];
const STAGE_X = [6, 27, 50, 73, 94];
const BATCH = 60;

function makeInvoice(id) {
  const llm = Math.random() < 0.22;
  const r = Math.random();
  // ~10% fail accounting checks, ~19% of the rest fail the PO/receipt match → ~73% touchless.
  const failAt = r < 0.1 ? 2 : r < 0.1 + 0.9 * 0.19 ? 3 : null;
  return { id, stage: 0, llm, failAt, done: false, age: 0 };
}

export function InvoiceFlow() {
  const [invoices, setInvoices] = useState([]);
  const [running, setRunning] = useState(false);
  const spawned = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setInvoices((prev) => {
        const next = prev.map((inv) => {
          if (inv.done) return inv;
          const age = inv.age + 1;
          if (age % 4 !== 0) return { ...inv, age };
          if (inv.failAt !== null && inv.stage === inv.failAt) return { ...inv, age, done: true, exception: true };
          const stage = inv.stage + 1;
          return { ...inv, age, stage, done: stage === STAGES.length - 1 };
        });
        if (spawned.current < BATCH) {
          next.push(makeInvoice(spawned.current));
          spawned.current += 1;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(timer);
  }, [running]);

  const finished = invoices.filter((i) => i.done);
  const touchless = finished.filter((i) => !i.exception).length;
  const exceptions = finished.length - touchless;
  const llmAssisted = invoices.filter((i) => i.llm && i.stage >= 1).length;
  const complete = spawned.current >= BATCH && finished.length === BATCH;

  useEffect(() => {
    if (complete) setRunning(false);
  }, [complete]);

  const start = () => {
    spawned.current = 0;
    setInvoices([]);
    setRunning(true);
  };

  const position = (inv) => {
    // scatter finished invoices into a small pile so each one stays visible
    const jx = ((inv.id * 37) % 9) - 4;
    const jy = ((inv.id * 53) % 7) - 3;
    if (inv.exception) {
      return { left: `calc(${STAGE_X[inv.stage] + 4}% + ${jx * 2}px)`, top: `calc(84% + ${jy * 3}px)` };
    }
    if (inv.done) return { left: `calc(${STAGE_X[inv.stage]}% + ${jx * 2}px)`, top: `calc(52% - 26px + ${jy * 3}px)` };
    const lane = inv.llm && inv.stage === 1 ? '24%' : '52%';
    return { left: `${STAGE_X[inv.stage]}%`, top: lane };
  };

  return (
    <div className="demo demo--flow">
      <div className="demo__bar">
        <span className="mono small muted">ap_pipeline.py · simulation</span>
        <button type="button" className="mini-btn mini-btn--accent" onClick={start} disabled={running}>
          {running ? 'Processing…' : invoices.length ? 'Run again' : `▶ Run ${BATCH} invoices`}
        </button>
      </div>

      <div className="flow">
        {STAGES.map((s, i) => (
          <div key={s} className={`flow__stage ${i === STAGES.length - 1 ? 'flow__stage--end' : ''}`} style={{ left: `${STAGE_X[i]}%` }}>
            <span className="flow__node" />
            <span className="flow__name small">{s}</span>
          </div>
        ))}
        <div className="flow__llm small mono" style={{ left: `${STAGE_X[1]}%` }}>
          LLM fallback
        </div>
        <div className="flow__exc small mono">exception queue →</div>
        <div className="flow__track" />
        {invoices.map((inv) => (
          <span
            key={inv.id}
            className={`flow__dot ${inv.llm && inv.stage >= 1 ? 'is-llm' : ''} ${inv.exception ? 'is-exc' : ''} ${
              inv.done && !inv.exception ? 'is-posted' : ''
            }`}
            style={position(inv)}
          />
        ))}
        {!invoices.length && <div className="flow__empty small muted">Press run to push a batch through the pipeline.</div>}
      </div>

      <div className="flow__stats">
        <div>
          <span className="mono">{finished.length}</span>
          <span className="small muted">processed</span>
        </div>
        <div>
          <span className="mono good">{finished.length ? Math.round((touchless / finished.length) * 100) : 0}%</span>
          <span className="small muted">touchless</span>
        </div>
        <div>
          <span className="mono llm">{llmAssisted}</span>
          <span className="small muted">LLM-assisted</span>
        </div>
        <div>
          <span className="mono warn">{exceptions}</span>
          <span className="small muted">to a human</span>
        </div>
      </div>
      <p className="small muted demo__note">
        Random routing tuned to the rates the project measured on synthetic data, so each run lands near 73%.
      </p>
    </div>
  );
}

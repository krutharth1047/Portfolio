import React, { useState } from 'react';
import Reveal from './Reveal';
import { experience } from '../data/content';
import './styles/Experience.css';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'data', label: 'Data roles' },
  { id: 'work', label: 'Part-time' },
];

export default function Experience() {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(
    () => new Set(experience.map((e) => e.company))
  );
  const shown = experience.filter((e) => filter === 'all' || e.kind === filter);

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow mono">02 · experience</span>
          <h2>Where I've worked</h2>
        </Reveal>

        <Reveal className="segmented" role="tablist" aria-label="Filter experience">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={filter === f.id ? 'is-active' : ''}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <ol className="timeline">
          {shown.map((job, i) => {
            const expanded = open.has(job.company);
            return (
              <Reveal as="li" key={job.company} delay={i * 90} className={`timeline__item ${job.current ? 'is-current' : ''}`}>
                <span className="timeline__dot" />
                <article className="card exp-card">
                  <button
                    type="button"
                    className="exp-card__head"
                    aria-expanded={expanded}
                    onClick={() =>
                      setOpen((prev) => {
                        const next = new Set(prev);
                        if (next.has(job.company)) next.delete(job.company);
                        else next.add(job.company);
                        return next;
                      })
                    }
                  >
                    <div>
                      <h3>{job.role}</h3>
                      <span className="exp-card__company">
                        {job.company}
                        {job.note && <span className="muted"> · {job.note}</span>}
                      </span>
                    </div>
                    <div className="exp-card__meta">
                      <span className="mono">{job.dates}</span>
                      <span className="muted small">{job.place}</span>
                    </div>
                    <span className={`exp-card__chev ${expanded ? 'is-open' : ''}`} aria-hidden="true" />
                  </button>
                  <div className={`collapse ${expanded ? 'is-open' : ''}`}>
                    <div className="collapse__inner">
                      <ul className="bullets">
                        {job.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <div className="chips">
                        {job.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

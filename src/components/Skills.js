import React, { useState } from 'react';
import Reveal from './Reveal';
import { profile, skillGroups, languages } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/Skills.css';

export default function Skills() {
  const [selected, setSelected] = useState(
    () => skillGroups.flatMap((g) => g.skills).find((s) => s.name === 'Python') || skillGroups[0].skills[0]
  );
  const [langRef, langVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow mono">05 · skills</span>
          <h2>Toolkit</h2>
          <p className="section-sub">Pick a skill to see where I've used it.</p>
        </Reveal>

        <div className="skills__layout">
          <Reveal className="skills__groups">
            {skillGroups.map((g) => (
              <div key={g.group} className="skills__group">
                <span className="skills__group-name mono small">{g.group}</span>
                <div className="skills__chips">
                  {g.skills.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      className={`skill ${selected.name === s.name ? 'is-active' : ''} ${s.used.length ? 'has-use' : ''}`}
                      onClick={() => setSelected(s)}
                      onMouseEnter={() => setSelected(s)}
                      aria-pressed={selected.name === s.name}
                    >
                      {s.name}
                      {s.used.length > 0 && <span className="skill__count">{s.used.length}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="skills__panel card" aria-live="polite">
            <span className="mono small muted">$ grep -r "{selected.name}" ~/work</span>
            <h3>{selected.name}</h3>
            {selected.used.length ? (
              <ul className="skills__used" key={selected.name}>
                {selected.used.map((u, i) => (
                  <li key={u} style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="accent">›</span> {u}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted small">Part of my toolkit from coursework and side projects.</p>
            )}
          </Reveal>
        </div>

        <Reveal className="langs">
          <h3 className="sub-head mono">languages</h3>
          <div className="langs__grid" ref={langRef}>
            {languages.map((l) => (
              <div key={l.name} className="lang">
                <div className="lang__top">
                  <strong>{l.name}</strong>
                  <span className="small muted">{l.level}</span>
                </div>
                <div className="lang__bar">
                  <span style={{ width: langVisible ? `${l.pct}%` : 0 }} />
                </div>
              </div>
            ))}
          </div>
          <p className="interests small">
            <span className="mono muted">interests:</span>{' '}
            {profile.interests.map((i) => (
              <span key={i} className="chip chip--quiet">
                {i}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

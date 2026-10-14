import React, { useState } from 'react';
import Reveal from './Reveal';
import { VarianceBridge, InvoiceFlow } from './ProjectDemos';
import { featuredProjects, moreProjects } from '../data/content';
import { useTilt } from '../hooks/interactions';
import './styles/Cards.css';

const DEMOS = { invoice: InvoiceFlow, fpa: VarianceBridge };

function Featured({ project, index }) {
  const Demo = DEMOS[project.id];
  return (
    <Reveal className={`feature ${index % 2 ? 'feature--flip' : ''}`}>
      <div className="feature__info">
        <span className="eyebrow mono">featured · {String(index + 1).padStart(2, '0')}</span>
        <h3>{project.name}</h3>
        <p className="feature__tagline">{project.tagline}</p>
        <ul className="bullets">
          {project.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="feature__metrics">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <span className="feature__metric">{m.value}</span>
              <span className="small muted">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="chips">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
        <a className="repo-link mono small" href={project.repo} target="_blank" rel="noreferrer">
          <i className="fab fa-github" /> {project.repoLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="feature__demo">{Demo && <Demo />}</div>
    </Reveal>
  );
}

function MiniCard({ project }) {
  const tilt = useTilt(8);
  return (
    <a className="mini tilt" href={project.url} target="_blank" rel="noreferrer" {...tilt}>
      <div className="mini__img">
        <img src={project.img} alt="" loading="lazy" />
        <span className="chip chip--float">{project.category}</span>
      </div>
      <div className="mini__body">
        <h4>
          {project.name} <span aria-hidden="true">↗</span>
        </h4>
        <p className="small">{project.text}</p>
        <div className="chips">
          {project.tags.map((t) => (
            <span key={t} className="chip chip--quiet">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="tilt__glare" />
    </a>
  );
}

export default function Cards() {
  const categories = ['All', ...new Set(moreProjects.map((p) => p.category))];
  const [cat, setCat] = useState('All');
  const shown = moreProjects.filter((p) => cat === 'All' || p.category === cat);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow mono">03 · projects</span>
          <h2>Things I've built</h2>
          <p className="section-sub">The two finance copilots have live demos. Drag the sliders and press run.</p>
        </Reveal>

        {featuredProjects.map((p, i) => (
          <Featured key={p.id} project={p} index={i} />
        ))}

        <Reveal className="more-head">
          <h3 className="sub-head mono">more projects</h3>
          <div className="segmented" role="tablist" aria-label="Filter projects">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                className={cat === c ? 'is-active' : ''}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mini-grid">
          {shown.map((p) => (
            <MiniCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Reveal from './Reveal';
import { publications } from '../data/content';
import { useTilt } from '../hooks/interactions';
import './styles/Research.css';

function PaperCard({ paper, index }) {
  const tilt = useTilt(6);
  return (
    <Reveal delay={index * 120}>
      <article className={`card paper tilt ${index === 0 ? 'paper--lead' : ''}`} {...tilt}>
        <div className="tilt__glare" />
        <div className="paper__top">
          <span className={`chip ${index === 0 ? 'chip--accent' : ''}`}>{paper.role}</span>
          <span className="mono muted">{paper.venue}</span>
        </div>
        <h3>{paper.title}</h3>
        <p>{paper.text}</p>
        <div className="chips">
          {paper.tags.map((t) => (
            <span key={t} className="chip chip--quiet">
              {t}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default function Research() {
  return (
    <section className="section research" id="research">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow mono">04 · research</span>
          <h2>Publications</h2>
          <p className="section-sub">Peer-reviewed work in generative AI and computer vision.</p>
        </Reveal>
        <div className="papers">
          {publications.map((p, i) => (
            <PaperCard key={p.title} paper={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

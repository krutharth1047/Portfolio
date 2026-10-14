import React, { useEffect, useState } from 'react';
import DataField from './DataField';
import { profile, stats } from '../data/content';
import { useCountUp, usePrefersReducedMotion, scrollToId } from '../hooks/interactions';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/Landing.css';

function useTypewriter(words, reducedMotion) {
  const [text, setText] = useState(reducedMotion ? words[0] : '');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const word = words[index];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reducedMotion]);

  return text;
}

function Stat({ stat, start, delay }) {
  const value = useCountUp(stat.value, start, { decimals: stat.decimals || 0, duration: 1400 + delay });
  return (
    <div className="stat">
      <span className="stat__value">
        {value}
        {stat.suffix}
      </span>
      <span className="stat__label">{stat.label}</span>
      <span className="stat__sub">{stat.sub}</span>
    </div>
  );
}

export default function Landing() {
  const reducedMotion = usePrefersReducedMotion();
  const typed = useTypewriter(profile.roles, reducedMotion);
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.4 });

  return (
    <section className="hero" id="home">
      <DataField reducedMotion={reducedMotion} />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content container">
        <a
          className="hero__badge"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToId('contact');
          }}
        >
          <span className="pulse-dot" />
          {profile.availability}
        </a>

        <h1 className="hero__title">
          <span className="hero__hi">Hi, I'm</span>
          <span className="hero__name">{profile.name}</span>
        </h1>

        <p className="hero__typed" aria-label={`I build ${profile.roles.join(', ')}`}>
          <span className="mono muted">~/amsterdam $</span> I build{' '}
          <span className="hero__typed-word">{typed}</span>
          <span className="caret" aria-hidden="true" />
        </p>

        <p className="hero__summary">{profile.summary}</p>

        <div className="hero__cta">
          <button type="button" className="btn btn--primary" onClick={() => scrollToId('projects')}>
            See my work
            <span aria-hidden="true">→</span>
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => scrollToId('contact')}>
            Get in touch
          </button>
          <div className="hero__socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <i className="far fa-envelope" />
            </a>
          </div>
        </div>

        <div className="hero__stats" ref={statsRef}>
          {stats.map((s, i) => (
            <Stat key={s.label} stat={s} start={statsVisible} delay={i * 150} />
          ))}
        </div>
      </div>

      <p className="hero__hint mono" aria-hidden="true">
        move your cursor · click the background
      </p>
      <button type="button" className="hero__scroll" onClick={() => scrollToId('about')} aria-label="Scroll to About">
        <span />
      </button>
    </section>
  );
}

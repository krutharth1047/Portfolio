import React, { useState } from 'react';
import Reveal from './Reveal';
import Terminal from './Terminal';
import { profile, resumeMailto } from '../data/content';
import './styles/Footer.css';

export function Contact({ focusSignal }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <Reveal className="contact__text">
          <span className="eyebrow mono">06 · contact</span>
          <h2>
            Let's build something <span className="gradient-text">with data</span>.
          </h2>
          <p className="section-sub">
            I'm looking for a six-month data, analytics engineering or finance-AI internship from February 2027. Happy
            to chat about pipelines, forecasting or anything in between.
          </p>
          <div className="contact__actions">
            <button type="button" className="btn btn--primary" onClick={copy}>
              <i className="far fa-copy" /> {copied ? 'Copied!' : profile.email}
            </button>
            <a className="btn btn--ghost" href={resumeMailto}>
              Request my CV
            </a>
          </div>
          <div className="contact__links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <i className="fab fa-github" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin" /> LinkedIn
            </a>
            <span>
              <i className="fas fa-map-marker-alt" /> {profile.location}
            </span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <Terminal focusSignal={focusSignal} />
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ year }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="mono small muted">
          © {year} {profile.name} · built with React
        </span>
        <span className="mono small muted">
          press <kbd>⌘</kbd>
          <kbd>K</kbd> to jump anywhere
        </span>
      </div>
    </footer>
  );
}

export default Footer;

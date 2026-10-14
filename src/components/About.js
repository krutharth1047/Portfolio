import React from 'react';
import Reveal from './Reveal';
import { profile, education } from '../data/content';
import { useTilt } from '../hooks/interactions';
import './styles/About.css';

export default function About() {
  const tilt = useTilt(10);

  return (
    <section className="section about" id="about">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow mono">01 · about</span>
          <h2>Data, finance and a bit of AI</h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__photo-col">
            <div className="about__photo tilt" {...tilt}>
              <img src="images/profile.jpg" alt={profile.name} loading="lazy" />
              <div className="tilt__glare" />
              <div className="about__photo-tag mono">
                <span className="pulse-dot" /> {profile.location}
              </div>
            </div>
          </Reveal>

          <div className="about__text">
            {profile.bio.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 80} className={i === 0 ? 'lead' : ''}>
                {p}
              </Reveal>
            ))}

            <Reveal delay={260} className="about__facts">
              <div>
                <span className="mono muted">based in</span>
                <strong>{profile.location}</strong>
              </div>
              <div>
                <span className="mono muted">studying</span>
                <strong>MSc CS · Big Data Eng.</strong>
              </div>
              <div>
                <span className="mono muted">looking for</span>
                <strong>6-month internship · Feb 2027</strong>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="edu">
          <h3 className="sub-head mono">education</h3>
          <ol className="edu__list">
            {education.map((e, i) => (
              <Reveal as="li" key={e.school} delay={i * 100} className={`edu__item ${e.current ? 'is-current' : ''}`}>
                <div className="edu__marker">{e.logo ? <img src={e.logo} alt="" /> : <span />}</div>
                <div className="edu__body">
                  <div className="edu__top">
                    <h4>{e.school}</h4>
                    <span className="mono muted">{e.dates}</span>
                  </div>
                  <p>
                    {e.degree}
                    {e.current && <span className="chip chip--live">Now</span>}
                  </p>
                  {(e.course || e.detail) && (
                    <p className="edu__grade">
                      {e.course && <span>{e.course}</span>}
                      {e.detail && <span className="chip chip--accent">{e.detail}</span>}
                    </p>
                  )}
                  <span className="muted small">{e.place}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

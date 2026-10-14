import React, { useEffect, useState } from 'react';
import { sections, resumeMailto } from '../data/content';
import { useActiveSection, scrollToId } from '../hooks/interactions';
import './styles/Navbar.css';

export function Navbar({ onOpenPalette, simple = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useActiveSection(simple ? [] : sections.map((s) => s.id));
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (simple) {
      window.location.href = `/#${id}`;
      return;
    }
    scrollToId(id);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="nav__inner">
        <a href="/#home" className="nav__logo" onClick={go('home')} aria-label="Back to top">
          <span className="nav__logo-mark">KRK</span>
          <span className="nav__logo-dot" />
        </a>

        <nav className="nav__links" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              onClick={go(s.id)}
              className={`nav__link ${active === s.id ? 'is-active' : ''}`}
            >
              {s.label}
            </a>
          ))}
          <a className="nav__link nav__link--cv" href={resumeMailto}>
            Request CV
          </a>
        </nav>

        <div className="nav__actions">
          {onOpenPalette && (
            <button type="button" className="nav__kbd" onClick={onOpenPalette} aria-label="Open command palette">
              <span>{isMac ? '⌘' : 'Ctrl'}</span>
              <span>K</span>
            </button>
          )}
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

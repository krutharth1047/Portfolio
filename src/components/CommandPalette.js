import React, { useEffect, useMemo, useRef, useState } from 'react';
import { profile, sections, featuredProjects, resumeMailto } from '../data/content';
import { scrollToId } from '../hooks/interactions';
import './styles/CommandPalette.css';

export default function CommandPalette({ open, onClose, onFocusTerminal }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(
    () => [
      ...sections.map((s) => ({ group: 'Navigate', label: `Go to ${s.label}`, icon: '→', run: () => scrollToId(s.id) })),
      { group: 'Navigate', label: 'Back to top', icon: '↑', run: () => scrollToId('home') },
      ...featuredProjects.map((p) => ({
        group: 'Projects',
        label: `Open ${p.name} on GitHub`,
        icon: '↗',
        run: () => window.open(p.repo, '_blank', 'noopener,noreferrer'),
      })),
      {
        group: 'Contact',
        label: 'Copy email address',
        icon: '⧉',
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      { group: 'Contact', label: 'Send an email', icon: '✉', run: () => (window.location.href = `mailto:${profile.email}`) },
      { group: 'Contact', label: 'Request CV', icon: '📄', run: () => (window.location.href = resumeMailto) },
      { group: 'Contact', label: 'Open LinkedIn', icon: '↗', run: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer') },
      { group: 'Contact', label: 'Open GitHub', icon: '↗', run: () => window.open(profile.github, '_blank', 'noopener,noreferrer') },
      {
        group: 'Fun',
        label: 'Open the terminal',
        icon: '>_',
        run: () => {
          scrollToId('contact');
          onFocusTerminal();
        },
      },
    ],
    [onFocusTerminal]
  );

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery('');
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  if (!open) return null;

  const choose = (action) => {
    onClose();
    if (action) setTimeout(action.run, 60);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      choose(filtered[index]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = '';

  return (
    <div className="palette" onMouseDown={onClose} role="presentation">
      <div
        className="palette__box"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="palette__search">
          <span className="mono accent">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            aria-label="Search commands"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette__list" role="listbox">
          {filtered.length === 0 && <li className="palette__empty muted small">No matches</li>}
          {filtered.map((a, i) => {
            const header = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <React.Fragment key={a.label}>
                {header && <li className="palette__group mono small muted">{header}</li>}
                <li
                  role="option"
                  aria-selected={i === index}
                  className={`palette__item ${i === index ? 'is-active' : ''}`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => choose(a)}
                >
                  <span className="palette__icon mono">{a.icon}</span>
                  {a.label}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
        <div className="palette__foot small muted">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
        </div>
      </div>
    </div>
  );
}

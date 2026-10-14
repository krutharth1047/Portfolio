import React, { useEffect, useRef, useState } from 'react';
import {
  profile,
  education,
  experience,
  featuredProjects,
  moreProjects,
  publications,
  skillGroups,
  languages,
} from '../data/content';
import { scrollToId } from '../hooks/interactions';

const PROMPT = 'guest@krk:~$';

const COMMANDS = {
  help: () => [
    'available commands:',
    '  whoami        who is this?',
    '  education     degrees and schools',
    '  experience    work history',
    '  projects      things I have built',
    '  papers        publications',
    '  skills        my toolkit',
    '  languages     spoken languages',
    '  interests     life outside the terminal',
    '  grimoire      ???',
    '  contact       how to reach me',
    '  open <x>      github | linkedin | email | <project name>',
    '  goto <x>      scroll to a section',
    '  clear         clear the screen',
  ],
  whoami: () => [profile.name, profile.title, profile.location, '', profile.availability + '.'],
  education: () =>
    education.flatMap((e) => [
      `▸ ${e.school}`,
      `  ${e.degree} · ${e.dates}`,
      ...(e.course || e.detail ? [`  ${[e.course, e.detail].filter(Boolean).join(' · ')}`] : []),
    ]),
  experience: () => experience.flatMap((e) => [`▸ ${e.role} @ ${e.company} (${e.dates})`, ...e.points.map((p) => `  - ${p}`)]),
  projects: () => [
    ...featuredProjects.map((p) => `★ ${p.name}: ${p.tagline}`),
    ...moreProjects.map((p) => `· ${p.name}: ${p.text}`),
    '',
    "tip: try 'open invoice copilot'",
  ],
  papers: () => publications.map((p) => `▸ [${p.role}] ${p.title} (${p.venue})`),
  skills: () => skillGroups.map((g) => `${g.group.padEnd(20, ' ')} ${g.skills.map((s) => s.name).join(', ')}`),
  languages: () => languages.map((l) => `${l.name.padEnd(9, ' ')} ${l.level}`),
  interests: () => [profile.interests.join(' · ').toLowerCase(), "challenge me to chess and I'll say yes."],
  contact: () => [`email     ${profile.email}`, `github    ${profile.github}`, `linkedin  ${profile.linkedin}`],
  ls: () => ['about/  experience/  projects/  research/  skills/  contact/  cv.pdf'],
  'cat cv.pdf': () => ["binary file. try 'open email' to ask me for a copy."],
  sudo: () => ['nice try. permission denied (but I am open to an internship offer).'],
  'sudo hire krutharth': () => ['[sudo] password for recruiter: ********', 'access granted ✓ opening email…'],
  grimoire: () => [
    '      ♣ the five-leaf grimoire opens…',
    '',
    '   no magic? no problem. just anti-magic,',
    '   a lot of SQL and refusing to give up.',
    '',
    '   "Surpass your limits. Right here, right now."',
    '',
    "   (try clicking the hero background to swing the sword)",
  ],
  coffee: () => ['☕ brewing… done. Amsterdam runs on stroopwafels and coffee.'],
};

const LINKS = {
  github: profile.github,
  linkedin: profile.linkedin,
  email: `mailto:${profile.email}`,
  mail: `mailto:${profile.email}`,
};

function run(raw) {
  const input = raw.trim();
  const cmd = input.toLowerCase();
  if (!cmd) return { lines: [] };
  if (cmd === 'clear') return { clear: true };
  if (cmd === 'sudo hire krutharth') return { lines: COMMANDS[cmd](), href: LINKS.email };
  if (COMMANDS[cmd]) return { lines: COMMANDS[cmd]() };
  if (cmd.startsWith('sudo')) return { lines: COMMANDS.sudo() };

  if (cmd.startsWith('open ')) {
    const target = cmd.slice(5).trim();
    const project = [...featuredProjects, ...moreProjects].find((p) => p.name.toLowerCase().includes(target));
    const href = LINKS[target] || (project && (project.repo || project.url));
    if (href) return { lines: [`opening ${target}…`], href };
    return { lines: [`open: '${target}' not found`] };
  }
  if (cmd.startsWith('goto ') || cmd.startsWith('cd ')) {
    const target = cmd.split(' ').slice(1).join(' ').replace(/[/.~]/g, '');
    const id = ['about', 'experience', 'projects', 'research', 'skills', 'contact'].find((s) => s.startsWith(target));
    if (id) return { lines: [`→ ${id}`], scroll: id };
    return { lines: [`no such section: ${target}`] };
  }
  return { lines: [`command not found: ${input}. type 'help'.`] };
}

export default function Terminal({ focusSignal }) {
  const [history, setHistory] = useState([
    { type: 'out', text: 'krk-shell v2.0 · type "help" to get started' },
  ]);
  const [value, setValue] = useState('');
  const [past, setPast] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (focusSignal) inputRef.current?.focus({ preventScroll: true });
  }, [focusSignal]);

  const submit = (cmdText) => {
    const result = run(cmdText);
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((h) => [
        ...h,
        { type: 'in', text: cmdText },
        ...result.lines.map((text) => ({ type: 'out', text })),
      ]);
    }
    if (cmdText.trim()) setPast((p) => [cmdText, ...p].slice(0, 30));
    setCursor(-1);
    setValue('');
    if (result.href) {
      setTimeout(() => {
        if (result.href.startsWith('mailto:')) window.location.href = result.href;
        else window.open(result.href, '_blank', 'noopener,noreferrer');
      }, 400);
    }
    if (result.scroll) setTimeout(() => scrollToId(result.scroll), 300);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') submit(value);
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, past.length - 1);
      if (past[next] !== undefined) {
        setCursor(next);
        setValue(past[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? past[next] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(value.toLowerCase()) && value);
      if (match) setValue(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const quick = ['whoami', 'projects', 'skills', 'contact'];

  return (
    <div className="term" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="term__bar">
        <span className="term__lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mono small muted">krk — zsh — 80×24</span>
      </div>
      <div className="term__body mono" ref={bodyRef}>
        {history.map((line, i) =>
          line.type === 'in' ? (
            <div key={i} className="term__line">
              <span className="term__prompt">{PROMPT}</span> {line.text}
            </div>
          ) : (
            <div key={i} className="term__line term__line--out">
              {line.text || ' '}
            </div>
          )
        )}
        <div className="term__line term__input-row">
          <label htmlFor="term-input" className="term__prompt">
            {PROMPT}
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
        </div>
      </div>
      <div className="term__quick">
        {quick.map((q) => (
          <button
            key={q}
            type="button"
            className="mini-btn"
            onClick={(e) => {
              e.stopPropagation();
              submit(q);
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Landing from '../Landing';
import About from '../About';
import Experience from '../Experience';
import Cards from '../Cards';
import Research from '../Research';
import Skills from '../Skills';
import Footer, { Contact } from '../Footer';
import CommandPalette from '../CommandPalette';
import CursorGlow from '../CursorGlow';
import { scrollToId } from '../../hooks/interactions';

export function HomePage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalFocus, setTerminalFocus] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Honour deep links like /#projects coming from other pages.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 120);
  }, []);

  const focusTerminal = useCallback(() => setTerminalFocus((n) => n + 1), []);

  return (
    <div className="home">
      <CursorGlow />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Landing />
        <About />
        <Experience />
        <Cards />
        <Research />
        <Skills />
        <Contact focusSignal={terminalFocus} />
      </main>
      <Footer year={new Date().getFullYear()} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onFocusTerminal={focusTerminal} />
    </div>
  );
}

export default HomePage;

import { useCallback, useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Work from './components/Work';
import Recognition from './components/Recognition';
import About from './components/About';
import Toolkit from './components/Toolkit';
import Lab from './components/Lab';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import CommandPalette from './components/CommandPalette';
import Toaster from './components/ui/Toaster';

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeProject = useCallback(() => setProjectId(null), []);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Nav onOpenPalette={openPalette} />
      <main>
        <Hero onOpenProject={setProjectId} />
        <Highlights />
        <Work onOpenProject={setProjectId} />
        <Recognition />
        <About />
        <Toolkit />
        <Lab />
        <Contact />
      </main>
      <Footer />

      <CaseStudy projectId={projectId} onClose={closeProject} onNavigate={setProjectId} />
      {paletteOpen && <CommandPalette onClose={closePalette} onOpenProject={setProjectId} />}
      <Toaster />
    </>
  );
}

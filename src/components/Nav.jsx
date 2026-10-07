import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Command, Menu, Moon, Sun, X } from 'lucide-react';
import { LogoMark } from './ui/Icons';
import { navLinks as NAV_LINKS, profile } from '../data/portfolio';
import { useActiveSection } from '../lib/hooks';
import { toggleTheme, useTheme } from '../lib/theme';

export function ThemeToggle({ className = '' }) {
  const theme = useTheme();
  return (
    <button
      type="button"
      onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
      className={`grid size-9 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export default function Nav({ onOpenPalette }) {
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pill, setPill] = useState(null);
  const linkRefs = useRef({});
  const listRef = useRef(null);
  const progressRef = useRef(null);
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Slide the highlight pill under the active link.
  useLayoutEffect(() => {
    const measure = () => {
      const el = active && linkRefs.current[active];
      if (!el || !listRef.current) return setPill(null);
      setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-500 ${
          scrolled || menuOpen ? 'border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150' : 'border-transparent'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <a href="#top" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <LogoMark className="size-6" />
            <span className="text-[15px] font-medium tracking-tight">{profile.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul ref={listRef} className="relative flex items-center rounded-full border border-line bg-surface/50 p-1 backdrop-blur">
              <li
                aria-hidden="true"
                className="absolute inset-y-1 rounded-full bg-surface-2 shadow-sm ring-1 ring-line transition-all duration-500 ease-out-expo"
                style={{
                  left: pill?.left ?? 0,
                  width: pill?.width ?? 0,
                  opacity: pill ? 1 : 0,
                }}
              />
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    ref={(el) => (linkRefs.current[link.id] = el)}
                    href={`#${link.id}`}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                      active === link.id ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-[13px] text-muted transition hover:border-line-strong hover:text-fg sm:inline-flex"
              aria-label="Open command menu"
            >
              <span>Menu</span>
              <kbd className="inline-flex items-center gap-0.5 rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-subtle">
                {isMac ? <Command className="size-2.5" /> : 'Ctrl'}K
              </kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-fg md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        <div
          ref={progressRef}
          aria-hidden="true"
          className="h-px origin-left bg-accent/70"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 bg-bg/95 backdrop-blur-xl transition-all duration-500 ease-out-expo md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="shell flex h-full flex-col justify-between pb-10 pt-8">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.id}
                className="transition-all duration-500 ease-out-expo"
                style={{
                  transitionDelay: menuOpen ? `${60 + i * 40}ms` : '0ms',
                  opacity: menuOpen ? 1 : 0,
                  translate: menuOpen ? '0 0' : '0 12px',
                }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-medium tracking-tight"
                >
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenPalette();
            }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm text-muted"
          >
            <Command className="size-3.5" /> Command menu
          </button>
        </nav>
      </div>
    </header>
  );
}

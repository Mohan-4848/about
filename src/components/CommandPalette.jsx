import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  Mail,
  Moon,
  Play,
  Search,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import { navLinks, profile, projects } from '../data/portfolio';
import { copyText } from '../lib/toast';
import { toggleTheme } from '../lib/theme';

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/** Mounted only while open, so its state resets each time. */
export default function CommandPalette({ onClose, onOpenProject }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(
    () => [
      ...navLinks.map((l) => ({
        group: 'Navigate',
        label: l.label,
        icon: ArrowRight,
        run: () => goTo(l.id),
      })),
      ...projects.map((p) => ({
        group: 'Projects',
        label: p.name,
        hint: p.category,
        icon: FolderGit2,
        run: () => onOpenProject(p.id),
      })),
      { group: 'Actions', label: 'Copy email address', icon: Copy, run: () => copyText(profile.email, 'Email copied') },
      { group: 'Actions', label: 'Send an email', icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { group: 'Actions', label: 'Toggle light / dark', icon: Moon, run: () => toggleTheme() },
      {
        group: 'Actions',
        label: 'Submit a job to the sandbox',
        icon: Play,
        run: () => {
          goTo('top');
          window.dispatchEvent(new Event('mb:dispatch'));
        },
      },
      ...(profile.resume
        ? [{ group: 'Links', label: 'Résumé', icon: FileText, run: () => window.open(profile.resume, '_blank', 'noopener') }]
        : []),
      { group: 'Links', label: 'GitHub', hint: '@mohanbalaji', icon: GithubIcon, run: () => window.open(profile.socials.github, '_blank', 'noopener') },
      { group: 'Links', label: 'LinkedIn', hint: 'in/mohanbalaji', icon: LinkedinIcon, run: () => window.open(profile.socials.linkedin, '_blank', 'noopener') },
    ],
    [onOpenProject],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const returnFocus = document.activeElement;
    inputRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      returnFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const execute = (cmd) => {
    if (!cmd) return;
    onClose();
    // Let the dialog close before scrolling / opening anything.
    setTimeout(cmd.run, 10);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(filtered[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = null;

  return createPortal(
    <div className="fixed inset-0 z-[65]">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 starting:opacity-0"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className={`absolute left-1/2 top-[12vh] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-surface/95 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.5)] backdrop-blur-2xl transition-[opacity,scale] duration-300 ease-out-expo starting:scale-[0.97] starting:opacity-0`}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search sections, projects, actions…"
            className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-subtle"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={filtered[active] ? `cmd-${active}` : undefined}
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">esc</kbd>
        </div>

        <ul ref={listRef} id="command-list" role="listbox" className="max-h-[min(24rem,55vh)] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-10 text-center text-sm text-subtle">No results for “{query}”</li>}
          {filtered.map((cmd, i) => {
            const showGroup = cmd.group !== lastGroup;
            lastGroup = cmd.group;
            const Icon = cmd.icon;
            return (
              <li key={`${cmd.group}-${cmd.label}`} role="presentation">
                {showGroup && (
                  <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle first:pt-1">
                    {cmd.group}
                  </p>
                )}
                <button
                  id={`cmd-${i}`}
                  data-index={i}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  tabIndex={-1}
                  onMouseMove={() => setActive(i)}
                  onClick={() => execute(cmd)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === active ? 'bg-surface-2 text-fg' : 'text-muted'
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${i === active ? 'text-accent' : 'text-subtle'}`} />
                  <span className="flex-1 truncate">{cmd.label}</span>
                  {cmd.hint && <span className="truncate font-mono text-[11px] text-subtle">{cmd.hint}</span>}
                  {i === active && <CornerDownLeft className="size-3.5 shrink-0 text-subtle" />}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
          <span>↑↓ to navigate · ↵ to select</span>
          <span>{profile.domain}</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

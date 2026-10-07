import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Chip from './ui/Chip';
import ProjectVisual from './visuals/ProjectVisual';
import { GithubIcon } from './ui/Icons';
import { projects } from '../data/portfolio';

export default function CaseStudy({ projectId, onClose, onNavigate }) {
  const open = Boolean(projectId);
  // Keep the last project rendered while the drawer animates out.
  const [shownId, setShownId] = useState(projectId);
  if (projectId && projectId !== shownId) setShownId(projectId);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    returnFocus.current = document.activeElement;
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [shownId]);

  const idx = projects.findIndex((p) => p.id === shownId);
  const project = projects[idx];
  if (!project) return null;
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const hasVisual = project.featured;

  return createPortal(
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} inert={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[44rem] flex-col overflow-y-auto border-l border-line bg-bg shadow-2xl transition-transform duration-700 ease-out-expo ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/80 px-6 py-4 backdrop-blur-xl sm:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            <span className="text-accent">Case study</span> · {project.category}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 px-6 pb-12 pt-10 sm:px-10">
          <h2 id="case-study-title" className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            {project.name}
          </h2>
          <p className="mt-4 text-pretty text-xl leading-snug text-muted">{project.tagline}</p>

          {hasVisual && (
            <ProjectVisual id={project.id} className="mt-10 h-[340px] rounded-2xl border border-line sm:h-[400px]" />
          )}

          <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-surface p-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{m.label}</dt>
                <dd className="mt-1.5 text-sm leading-snug sm:text-[15px]">{m.value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-12">
            <h3 className="eyebrow">Overview</h3>
            <p className="mt-4 text-pretty text-[17px] leading-[1.7] text-fg/85">{project.longDescription}</p>
          </section>

          <section className="mt-12">
            <h3 className="eyebrow">How it works</h3>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {project.architecture.map((item, i) => (
                <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-2 py-4 text-[15px] leading-relaxed">
                  <span className="font-mono text-xs leading-[1.7rem] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-fg/85">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h3 className="eyebrow">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Chip key={t} className="!text-xs">
                  {t}
                </Chip>
              ))}
            </div>
          </section>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-12 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
            >
              <GithubIcon className="size-4" /> View on GitHub
            </a>
          )}
        </div>

        <nav aria-label="More projects" className="grid grid-cols-2 border-t border-line">
          <button
            type="button"
            onClick={() => onNavigate(prev.id)}
            className="group flex flex-col items-start gap-1 border-r border-line px-6 py-6 text-left transition hover:bg-surface sm:px-10"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" /> Previous
            </span>
            <span className="font-medium">{prev.name}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate(next.id)}
            className="group flex flex-col items-end gap-1 px-6 py-6 text-right transition hover:bg-surface sm:px-10"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
              Next <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="font-medium">{next.name}</span>
          </button>
        </nav>
      </div>
    </div>,
    document.body,
  );
}

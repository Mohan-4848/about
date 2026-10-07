import { ArrowUpRight } from 'lucide-react';
import Chip from './ui/Chip';
import ProjectVisual from './visuals/ProjectVisual';
import { GithubIcon } from './ui/Icons';
import { spotlightHandlers } from '../lib/hooks';

const LAYOUTS = {
  wide: { grid: 'lg:grid-cols-2', visual: 'min-h-[320px] border-t border-line lg:order-2 lg:min-h-[460px] lg:border-l lg:border-t-0' },
  'wide-reverse': { grid: 'lg:grid-cols-2', visual: 'min-h-[420px] border-t border-line lg:order-1 lg:min-h-[460px] lg:border-r lg:border-t-0' },
  tall: { grid: '', visual: 'order-first aspect-[16/10] border-b border-line' },
};

export default function ProjectCard({ project, index, layout = 'wide', onOpen }) {
  const l = LAYOUTS[layout];
  const compact = layout === 'tall';

  return (
    <article
      {...spotlightHandlers()}
      className="spotlight group overflow-hidden rounded-[1.75rem] border border-line bg-surface transition-colors duration-500 hover:border-line-strong"
    >
      <div className={`grid h-full ${l.grid}`}>
        <div className={`flex flex-col p-7 sm:p-10 ${layout === 'wide-reverse' ? 'lg:order-2' : ''}`}>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {project.category}
          </p>

          <h3 className={`mt-6 font-medium tracking-[-0.035em] ${compact ? 'text-3xl' : 'text-3xl sm:text-4xl'}`}>
            <button type="button" onClick={() => onOpen(project.id)} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {project.name}
            </button>
          </h3>
          <p className="mt-3 text-pretty text-lg leading-snug text-fg/80">{project.tagline}</p>
          {!compact && <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted">{project.description}</p>}

          {/* Pushes the metrics to the bottom of wide cards */}
          <div aria-hidden="true" className={compact ? 'h-7' : 'min-h-8 flex-1'} />
          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{m.label}</dt>
                <dd className="mt-1.5 text-[13px] leading-snug sm:text-sm">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.slice(0, compact ? 4 : 7).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>

          <div className="relative z-10 mt-8 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              className="group/btn inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong pl-4 pr-3 text-sm transition hover:bg-fg hover:text-bg"
            >
              Case study
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
              >
                <GithubIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        <ProjectVisual id={project.id} className={l.visual} />
      </div>
    </article>
  );
}

import { Braces, Cpu, PanelsTopLeft, Server } from 'lucide-react';
import Reveal from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import { toolkit } from '../data/portfolio';
import { spotlightHandlers } from '../lib/hooks';

const ICONS = { languages: Braces, frontend: PanelsTopLeft, backend: Server, systems: Cpu };

export default function Toolkit() {
  return (
    <Section id="toolkit">
      <SectionHeader
        index="04"
        label="Toolkit"
        title={
          <>
            The stack I <span className="serif-em text-muted">build</span> with.
          </>
        }
        intro="Comfortable across the whole request path — from the kernel limits a process runs under to the pixels a user sees."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {toolkit.map((group, i) => {
          const Icon = ICONS[group.id];
          return (
            <Reveal key={group.id} delay={i * 80} className="h-full">
              <div
                {...spotlightHandlers()}
                className="spotlight flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-fg">
                    <Icon className="size-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[11px] text-subtle">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 text-xl font-medium tracking-tight">{group.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{group.description}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-bg/60 px-2.5 py-1 text-[13px] text-fg/85 transition-colors hover:border-accent/50 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

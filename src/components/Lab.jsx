import { Laptop, Terminal } from 'lucide-react';
import Reveal from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import { lab } from '../data/portfolio';

export default function Lab() {
  return (
    <Section id="lab">
      <SectionHeader
        index="05"
        label="Lab"
        title={
          <>
            Where the <span className="serif-em text-muted">experiments</span> run.
          </>
        }
        intro="A homelab that mirrors production — local virtualization, a mesh-networked fleet and self-hosted services I run day to day."
      />

      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
          <div className="flex items-center justify-between">
            <p className="eyebrow flex items-center gap-2">
              <Laptop className="size-3.5" /> Workstations
            </p>
            <p className="font-mono text-[11px] text-subtle">2 nodes</p>
          </div>
          <div className="mt-6 divide-y divide-line">
            {lab.workstations.map((w) => (
              <div key={w.name} className="py-5 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-medium tracking-tight">{w.name}</h3>
                  <span className="text-sm text-muted">{w.role}</span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12.5px] text-muted">
                  {w.specs.map((s, i) => (
                    <li key={s} className="flex items-center gap-3">
                      {i > 0 && <span className="size-1 rounded-full bg-line-strong" aria-hidden="true" />}
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-subtle">{w.os}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 border-t border-line pt-5 font-mono text-[12px] text-subtle">
            <Terminal className="size-3.5" /> {lab.dotfiles}
          </p>
        </Reveal>

        <Reveal delay={80} className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:col-span-5">
          <p className="eyebrow">Self-hosted services</p>
          <ul className="mt-6 space-y-5">
            {lab.services.map((s) => (
              <li key={s.name} className="grid grid-cols-[auto_1fr] gap-x-3">
                <span className="relative mt-[7px] flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-40 [animation-duration:2.4s]" />
                  <span className="relative size-2 rounded-full bg-ok" />
                </span>
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-medium">{s.name}</h3>
                    <span className="font-mono text-[11px] text-ok">{s.status}</span>
                  </div>
                  <p className="mt-0.5 text-sm leading-snug text-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

      </div>
    </Section>
  );
}

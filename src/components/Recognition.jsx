import { Trophy } from 'lucide-react';
import Reveal from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import { recognition as r } from '../data/portfolio';
import { spotlightHandlers } from '../lib/hooks';

export default function Recognition() {
  return (
    <Section id="recognition">
      <SectionHeader
        index="02"
        label="Recognition"
        title={
          <>
            Second place, <span className="serif-em text-muted">24 hours</span>, one shipped prototype.
          </>
        }
      />

      <Reveal>
        <article
          {...spotlightHandlers()}
          className="spotlight overflow-hidden rounded-[1.75rem] border border-line bg-surface"
        >
          <div className="grid lg:grid-cols-12">
            <div className="relative flex flex-col justify-between gap-10 overflow-hidden border-b border-line p-8 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, var(--glow), transparent 70%)' }}
              />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent">
                  <Trophy className="size-3" /> {r.badge}
                </span>
                <span className="font-mono text-xs tabular-nums text-subtle">{r.date}</span>
              </div>
              <p className="relative text-[clamp(6rem,16vw,11rem)] font-semibold leading-[0.8] tracking-[-0.07em]">
                {r.place.replace(/\D/g, '')}
                <span className="serif-em align-top text-[0.42em] font-normal tracking-normal text-accent">
                  {r.place.replace(/\d/g, '')}
                </span>
              </p>
              <p className="relative eyebrow">Prize · out of all competing teams</p>
            </div>

            <div className="p-8 sm:p-10 lg:col-span-7">
              <h3 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl">{r.title}</h3>
              <p className="mt-2 text-muted">
                {r.org} · {r.date}
              </p>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-fg/85">{r.description}</p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {r.highlights.map((h, i) => (
                  <li key={h} className="grid grid-cols-[2.5rem_1fr] py-4 text-[15px] leading-snug text-fg/85">
                    <span className="font-mono text-xs leading-[1.4rem] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

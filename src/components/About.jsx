import Reveal from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import { about } from '../data/portfolio';

export default function About() {
  return (
    <Section id="about" className="overflow-hidden">
      <SectionHeader
        index="03"
        label="About"
        title={
          <>
            Low-level curiosity, <span className="serif-em text-muted">product-level</span> polish.
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <blockquote className="relative">
            <span aria-hidden="true" className="serif-em absolute -left-1 -top-10 text-8xl leading-none text-accent/80">
              “
            </span>
            <p className="serif-em text-pretty text-3xl leading-[1.15] sm:text-4xl">{about.statement}</p>
          </blockquote>

          <dl className="mt-12 divide-y divide-line border-y border-line">
            {about.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 text-[15px]">
                <dt className="font-mono text-[11px] uppercase leading-6 tracking-[0.14em] text-subtle">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="space-y-6 text-pretty text-lg leading-[1.7] text-muted lg:col-span-6 lg:col-start-7">
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 80} className={i === 0 ? 'text-fg' : ''}>
              {p}
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <Reveal as="p" className="eyebrow mb-6">
          How I work
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {about.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="flex flex-col bg-bg p-7">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-10 text-lg font-medium tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

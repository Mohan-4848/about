import Reveal from './Reveal';

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHeader({ index, label, title, intro }) {
  return (
    <header className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12">
      <Reveal className="lg:col-span-3 lg:pt-3">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          <span>{label}</span>
        </p>
      </Reveal>
      <div className="lg:col-span-9">
        <Reveal
          as="h2"
          delay={60}
          className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[4.25rem]"
        >
          {title}
        </Reveal>
        {intro && (
          <Reveal as="p" delay={120} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {intro}
          </Reveal>
        )}
      </div>
    </header>
  );
}

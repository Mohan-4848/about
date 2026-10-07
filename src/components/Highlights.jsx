import { highlights } from '../data/portfolio';
import { useInView } from '../lib/hooks';

export default function Highlights() {
  const [ref, inView] = useInView();
  return (
    <section aria-label="Highlights" className="border-y border-line">
      <div ref={ref} className="shell">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <div
              key={h.label}
              className={`reveal flex flex-col gap-2 border-line py-8 pr-4 sm:py-10 ${
                i % 2 === 1 ? 'border-l pl-5 sm:pl-8' : ''
              } ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-8' : ''}`}
              data-shown={inView}
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <dd className="order-1 text-4xl font-medium tracking-[-0.04em] tabular-nums sm:text-5xl">
                <span className="text-subtle">{h.prefix}</span>
                {h.value}
                <span className="text-accent">{h.suffix}</span>
              </dd>
              <dt className="order-2 max-w-[14rem] text-sm leading-snug text-muted">{h.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

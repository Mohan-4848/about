import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import ProjectCard from './ProjectCard';
import MemeVisual from './visuals/MemeVisual';
import { projects } from '../data/portfolio';

const LAYOUT = {
  codearena: 'wide',
  speedpot: 'tall',
  'hybrid-node': 'tall',
  'aims-portal': 'wide-reverse',
};

export default function Work({ onOpenProject }) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const [first, second, third, ...rest] = featured;

  return (
    <Section id="work">
      <SectionHeader
        index="01"
        label="Selected work"
        title={
          <>
            Systems I’ve designed, built <span className="serif-em text-muted">and</span> shipped.
          </>
        }
        intro="From container sandboxes and zero-trust networking to sensor pipelines and accessible interfaces — each one taught me something about making software predictable."
      />

      <div className="space-y-5 md:space-y-6">
        <Reveal>
          <ProjectCard project={first} index={0} layout={LAYOUT[first.id]} onOpen={onOpenProject} />
        </Reveal>
        <div className="grid gap-5 md:gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <ProjectCard project={second} index={1} layout={LAYOUT[second.id]} onOpen={onOpenProject} />
          </Reveal>
          <Reveal delay={100} className="h-full">
            <ProjectCard project={third} index={2} layout={LAYOUT[third.id]} onOpen={onOpenProject} />
          </Reveal>
        </div>
        {rest.map((p, i) => (
          <Reveal key={p.id}>
            <ProjectCard project={p} index={3 + i} layout={LAYOUT[p.id] ?? 'wide'} onOpen={onOpenProject} />
          </Reveal>
        ))}
      </div>

      {others.length > 0 && (
        <Reveal className="mt-14">
          <p className="eyebrow mb-4">Also built</p>
          <ul className="divide-y divide-line border-y border-line">
            {others.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onOpenProject(p.id)}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-6 text-left sm:grid-cols-[14rem_1fr_auto_auto]"
                >
                  <span className="text-xl font-medium tracking-tight">{p.name}</span>
                  <span className="hidden text-muted sm:block">{p.tagline}</span>
                  <MemeVisual className="hidden h-7 w-28 md:block" />
                  <ArrowUpRight className="size-5 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}

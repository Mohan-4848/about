import { ArrowDown, Copy, FileText } from 'lucide-react';
import { Rise } from './ui/Reveal';
import SandboxCluster from './SandboxCluster';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import { profile } from '../data/portfolio';
import { useClock } from '../lib/hooks';
import { copyText } from '../lib/toast';

export default function Hero({ onOpenProject }) {
  const time = useClock(profile.timezone);

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_10%,transparent_75%)] opacity-70" />
        <div
          className="absolute right-[-10%] top-[8%] size-[720px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }}
        />
      </div>

      <div className="shell relative grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <Rise>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2.5 pr-3.5 text-[13px] text-muted backdrop-blur transition hover:border-line-strong hover:text-fg"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-ok" />
              </span>
              {profile.availability}
            </a>
          </Rise>

          <Rise
            as="h1"
            delay={80}
            className="mt-8 text-[clamp(3.6rem,11vw,8.25rem)] font-semibold leading-[0.88] tracking-[-0.06em]"
          >
            Mohan
            <br />
            Balaji<span className="text-accent">.</span>
          </Rise>

          <Rise
            as="p"
            delay={160}
            className="mt-8 max-w-xl text-pretty text-xl leading-[1.45] tracking-[-0.01em] text-muted sm:text-2xl"
          >
            Full-stack &amp; systems engineer building{' '}
            <em className="serif-em text-[1.12em] text-fg">isolated sandboxes</em>, high-concurrency backends and{' '}
            <em className="serif-em text-[1.12em] text-fg">fast, polished</em> web interfaces.
          </Rise>

          <Rise delay={240} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
            >
              See selected work
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => copyText(profile.email, 'Email copied')}
              className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 text-sm text-muted backdrop-blur transition hover:border-line-strong hover:text-fg"
            >
              {profile.email}
              <Copy className="size-3.5 opacity-60 transition group-hover:opacity-100" />
            </button>
            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition hover:border-line-strong hover:text-fg"
              >
                <FileText className="size-4" /> Résumé
              </a>
            )}
            <div className="flex items-center gap-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-11 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
              >
                <GithubIcon className="size-[18px]" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
              >
                <LinkedinIcon className="size-[17px]" />
              </a>
            </div>
          </Rise>

          <Rise delay={320} className="mt-14 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              { label: 'Studying', value: profile.education },
              { label: 'Local time', value: `Hyderabad · ${time}` },
              { label: 'Focus', value: 'Systems · Backend · Web' },
            ].map((item) => (
              <div key={item.label} className="bg-bg/80 px-4 py-3.5 backdrop-blur">
                <p className="eyebrow !text-[10px]">{item.label}</p>
                <p className="mt-1 text-sm tabular-nums">{item.value}</p>
              </div>
            ))}
          </Rise>
        </div>

        <Rise delay={200} className="relative lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[500px]">
            <SandboxCluster onOpenProject={onOpenProject} />
          </div>
        </Rise>
      </div>
    </section>
  );
}

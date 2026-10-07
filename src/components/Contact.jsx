import { ArrowUpRight, Copy } from 'lucide-react';
import Reveal from './ui/Reveal';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import { profile } from '../data/portfolio';
import { copyText } from '../lib/toast';

export default function Contact() {
  const links = [
    { label: 'GitHub', handle: '@mohanbalaji', href: profile.socials.github, Icon: GithubIcon },
    { label: 'LinkedIn', handle: 'in/mohanbalaji', href: profile.socials.linkedin, Icon: LinkedinIcon },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line pb-16 pt-28 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 100%, var(--glow), transparent 70%)' }}
      />
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_top,#000,transparent_70%)]" />

      <div className="shell relative">
        <Reveal as="p" className="eyebrow flex items-center gap-3">
          <span className="text-accent">06</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          Contact
        </Reveal>

        <Reveal
          as="h2"
          delay={60}
          className="mt-8 max-w-5xl text-balance text-[clamp(3rem,8.5vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.055em]"
        >
          Let’s build something <span className="serif-em text-accent">reliable</span>.
        </Reveal>

        <Reveal as="p" delay={120} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          Open to full-stack and systems engineering roles, hackathon collaborations and open-source work. I respond promptly.
        </Reveal>

        <Reveal delay={180} className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex h-14 items-center justify-between gap-6 rounded-full bg-fg pl-6 pr-2 text-base font-medium text-bg transition hover:opacity-90 sm:text-lg"
          >
            {profile.email}
            <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-fg transition-transform duration-500 ease-out-expo group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
          </a>
          <button
            type="button"
            onClick={() => copyText(profile.email, 'Email copied')}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-sm text-muted transition hover:text-fg"
          >
            <Copy className="size-4" /> Copy address
          </button>
        </Reveal>

        <Reveal delay={240} className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {links.map(({ label, handle, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between bg-bg/80 p-6 backdrop-blur transition-colors hover:bg-surface sm:p-8"
            >
              <span className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-line text-fg">
                  <Icon className="size-[18px]" />
                </span>
                <span>
                  <span className="block font-medium">{label}</span>
                  <span className="block font-mono text-xs text-subtle">{handle}</span>
                </span>
              </span>
              <ArrowUpRight className="size-5 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

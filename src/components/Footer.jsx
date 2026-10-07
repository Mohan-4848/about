import { ArrowUp } from 'lucide-react';
import { LogoMark } from './ui/Icons';
import { profile } from '../data/portfolio';
import { useClock } from '../lib/hooks';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const time = useClock(profile.timezone);
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 text-sm text-subtle md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="size-5" />
          <span>
            © {YEAR} {profile.fullName}
          </span>
        </div>
        <p className="font-mono text-xs">
          Hyderabad, IN · <span className="tabular-nums text-muted">{time}</span> IST
        </p>
        <div className="flex items-center gap-6">
          <span className="text-xs">Built with React, Vite &amp; Tailwind</span>
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-fg"
          >
            Back to top <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

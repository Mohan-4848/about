import { useEffect, useState } from 'react';
import Frame from './Frame';
import { useInView, usePrefersReducedMotion } from '../../lib/hooks';

const LINES = [
  { text: '$ arena submit solution.cpp --lang cpp20', tone: 'cmd' },
  { text: 'queued    job #8231 → bullmq:exec-pool', tone: 'dim' },
  { text: 'spawn     sandbox  cpu.max=2.0s  mem.max=256M', tone: 'dim' },
  { text: 'seccomp   syscall filter loaded', tone: 'dim' },
  { text: 'run       test cases 1–12', tone: 'dim' },
  { text: '✓ accepted  12/12 · 78 ms · 28.4 MB', tone: 'ok' },
  { text: 'teardown  container removed', tone: 'dim' },
];
const RUN_STEP = 4;

const TONE = { cmd: 'text-fg', dim: 'text-muted', ok: 'text-ok' };
const JOBS = [8229, 8230, 8231, 8232, 8233, 8234];

function jobState(job, step) {
  if (job < 8231) return 'done';
  if (job === 8231) return step >= LINES.length - 1 ? 'done' : step >= 2 ? 'active' : 'queued';
  return 'queued';
}

const JOB_STYLE = {
  done: 'border-ok/30 text-ok',
  active: 'border-accent/60 text-accent',
  queued: 'border-line text-subtle',
};

function Meter({ label, value, max, unit, fill }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[10px] uppercase tracking-wider text-subtle">
        <span>{label}</span>
        <span className="tabular-nums normal-case">
          {fill ? value : 0}
          <span className="text-subtle">/{max}{unit}</span>
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-[1200ms] ease-out-expo"
          style={{ width: fill ? `${(value / max) * 100}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function CodeArenaVisual() {
  const [ref, inView] = useInView({ once: false });
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const id = setInterval(() => setStep((s) => (s >= LINES.length + 4 ? 0 : s + 1)), 650);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const running = step > RUN_STEP && step < LINES.length + 1;

  return (
    <div ref={ref} className="absolute inset-0 flex p-5 sm:p-8">
      <Frame title="exec-pool — worker 03">
        <div className="min-h-0 flex-1 space-y-2.5 overflow-hidden p-4 font-mono text-[11.5px] leading-relaxed sm:p-5 sm:text-[12.5px]">
          {LINES.map((line, i) => (
            <div
              key={line.text}
              className={`truncate whitespace-pre transition-all duration-500 ease-out-expo ${TONE[line.tone]} ${
                i < step ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
              }`}
            >
              {line.text}
              {i === step - 1 && i < LINES.length - 1 && <span className="caret ml-1 text-accent">▍</span>}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 overflow-hidden border-t border-line px-4 py-3 font-mono text-[10px] sm:px-5">
          <span className="mr-1.5 uppercase tracking-wider text-subtle">queue</span>
          {JOBS.map((job) => {
            const state = jobState(job, step);
            return (
              <span
                key={job}
                className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 tabular-nums transition-colors duration-500 ${JOB_STYLE[state]}`}
              >
                {state === 'done' ? '✓' : state === 'active' ? '●' : '○'} {job}
              </span>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-line px-4 py-3 font-mono sm:px-5">
          <Meter label="cpu" value={0.08} max={2} unit="s" fill={running} />
          <Meter label="mem" value={28} max={256} unit="M" fill={running} />
          <Meter label="pids" value={1} max={64} unit="" fill={running} />
        </div>
      </Frame>
    </div>
  );
}

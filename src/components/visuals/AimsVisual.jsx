import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Frame from './Frame';
import { useInView, usePrefersReducedMotion } from '../../lib/hooks';

const QUERY = 'cardio';
const RESULTS = [
  { name: 'Cardiology', meta: '4 doctors' },
  { name: 'Cardiothoracic surgery', meta: '2 doctors' },
  { name: 'Paediatric cardiology', meta: '1 doctor' },
];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIMES = ['09:00', '10:30', '12:00', '14:00', '15:30'];
// b = booked, c = would conflict with an existing appointment
const GRID = [
  ['', 'b', '', '', 'b'],
  ['b', '', '', 'c', ''],
  ['', '', 'b', '', ''],
  ['', '', '', 'b', ''],
  ['', 'b', '', '', 'c'],
];
const PICKS = [
  [1, 2],
  [3, 1],
  [0, 3],
  [2, 4],
  [4, 0],
];

function Highlight({ text }) {
  const i = text.toLowerCase().indexOf(QUERY);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-accent/20 text-fg">{text.slice(i, i + QUERY.length)}</mark>
      {text.slice(i + QUERY.length)}
    </>
  );
}

export default function AimsVisual() {
  const [ref, inView] = useInView({ once: false });
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(reduced ? QUERY.length : 0);
  const [pick, setPick] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    let n = 0;
    const typer = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= QUERY.length) clearInterval(typer);
    }, 140);
    const picker = setInterval(() => setPick((p) => (p + 1) % PICKS.length), 2200);
    return () => {
      clearInterval(typer);
      clearInterval(picker);
    };
  }, [inView, reduced]);

  const [row, col] = PICKS[pick];
  const showResults = typed >= 3;

  return (
    <div ref={ref} className="absolute inset-0 flex p-5 sm:p-8">
      <Frame title="aims.health / book">
        <div className="flex min-h-0 flex-1 text-[12px]">
          <aside className="hidden w-[40%] shrink-0 flex-col border-r border-line p-3 sm:flex">
            <div className="flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-2.5 py-2">
              <Search className="size-3.5 text-subtle" />
              <span className="font-mono">
                {QUERY.slice(0, typed)}
                <span className="caret text-accent">▍</span>
              </span>
            </div>
            <ul className="mt-2 space-y-1">
              {RESULTS.map((r, i) => (
                <li
                  key={r.name}
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 transition-all duration-300 ${
                    i === 0 ? 'bg-surface-2' : ''
                  } ${showResults ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="truncate">
                    <Highlight text={r.name} />
                  </span>
                  <span className="ml-2 shrink-0 text-[10px] text-subtle">{r.meta}</span>
                </li>
              ))}
            </ul>
            <p
              className={`mt-auto font-mono text-[10px] text-subtle transition-opacity ${showResults ? 'opacity-100' : 'opacity-0'}`}
            >
              3 matches · 2.1 ms
            </p>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col p-3">
            <div className="flex items-baseline justify-between">
              <p className="font-medium">Cardiology</p>
              <p className="font-mono text-[10px] text-subtle">this week</p>
            </div>
            <div className="mt-2.5 grid grid-cols-[auto_repeat(5,1fr)] gap-1 text-center">
              <span />
              {DAYS.map((d) => (
                <span key={d} className="pb-0.5 text-[10px] text-subtle">
                  {d}
                </span>
              ))}
              {TIMES.map((t, r) => (
                <div key={t} className="contents">
                  <span className="pr-1.5 text-right font-mono text-[9.5px] leading-8 text-subtle">{t}</span>
                  {GRID[r].map((cell, c) => {
                    const selected = r === row && c === col;
                    return (
                      <span
                        key={c}
                        className={`h-8 rounded-md border text-[9px] leading-[30px] transition-all duration-300 ${
                          selected
                            ? 'border-accent bg-accent text-accent-fg'
                            : cell === 'b'
                              ? 'border-transparent bg-line text-transparent'
                              : cell === 'c'
                                ? 'border-dashed'
                                : 'border-line bg-surface'
                        }`}
                        style={
                          cell === 'c' && !selected
                            ? { borderColor: 'color-mix(in oklab, var(--danger) 60%, transparent)', color: 'var(--danger)' }
                            : undefined
                        }
                      >
                        {selected ? '✓' : cell === 'c' ? 'clash' : ''}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-2 pt-3">
              <span className="truncate font-mono text-[10px] text-subtle">
                {DAYS[col]} · {TIMES[row]}
              </span>
              <span className="shrink-0 rounded-md bg-fg px-2.5 py-1.5 text-[11px] font-medium text-bg">Confirm slot</span>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { usePrefersReducedMotion } from '../lib/hooks';

/*
 * Simulated CodeArena scheduler: jobs drop into a 3×3 grid of isolated containers,
 * run, and either pass or get killed by their cgroup limits. Rendered as an
 * orthographic (isometric) CSS 3D scene — no canvas, no WebGL.
 */

const COLS = 3;
const W = 76; // container footprint (px)
const H = 24; // container height
const GAP = 22;
const PAD = 28;
const PLATE = COLS * W + (COLS - 1) * GAP + PAD * 2;
const SLAB = 12; // plate thickness
const PACKET = 20;
const LANGS = ['cpp', 'py', 'java'];
const RUNTIME_MS = { cpp: [38, 112], py: [64, 188], java: [92, 236] };
const SCENE = 500; // design width the scene is laid out for

const rand = (min, max) => Math.round(min + Math.random() * (max - min));

function slotPosition(i) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return { x: PAD + col * (W + GAP), y: PAD + row * (W + GAP) };
}

function initialSlots() {
  return Array.from({ length: COLS * COLS }, (_, i) => ({
    i,
    lang: LANGS[(i + Math.floor(i / COLS)) % LANGS.length],
    state: 'idle',
    job: null,
  }));
}

/** A box with its three camera-facing faces (top, south, east). */
function Box({ w, d, h, className = '', style, children, ...rest }) {
  return (
    <div className={className} style={style} {...rest}>
      <div className="iso-face iso-top" style={{ width: w, height: d, transform: `translateZ(${h}px)` }}>
        {children}
      </div>
      <div
        className="iso-face iso-south"
        style={{ width: w, height: h, transformOrigin: '0 0', transform: `translateY(${d}px) rotateX(90deg)` }}
      />
      <div
        className="iso-face iso-east"
        style={{ width: h, height: d, transformOrigin: '0 0', transform: `translateX(${w}px) rotateY(-90deg)` }}
      />
    </div>
  );
}

export default function SandboxCluster({ onOpenProject }) {
  const reduced = usePrefersReducedMotion();
  const [slots, setSlots] = useState(initialSlots);
  const [packets, setPackets] = useState([]);
  const [log, setLog] = useState([]);
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const nextJob = useRef(8231);
  const timers = useRef(new Set());
  const slotsRef = useRef(slots);
  const visibleRef = useRef(true);

  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  const later = useCallback((fn, ms) => {
    const t = setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, ms);
    timers.current.add(t);
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const patch = (i, values) => setSlots((prev) => prev.map((s) => (s.i === i ? { ...s, ...values } : s)));

  const dispatch = useCallback(() => {
    const idle = slotsRef.current.filter((s) => s.state === 'idle');
    if (idle.length === 0) return;
    const slot = idle[Math.floor(Math.random() * idle.length)];
    const job = nextJob.current++;
    slotsRef.current = slotsRef.current.map((s) => (s.i === slot.i ? { ...s, state: 'queued' } : s));
    patch(slot.i, { state: 'queued', job });
    setPackets((prev) => [...prev, { job, slot: slot.i }]);

    later(() => {
      setPackets((prev) => prev.filter((p) => p.job !== job));
      patch(slot.i, { state: 'running' });
    }, 650);

    const killed = Math.random() < 0.12;
    const [lo, hi] = RUNTIME_MS[slot.lang];
    const run = rand(1100, 2300);
    later(() => {
      patch(slot.i, { state: killed ? 'killed' : 'done' });
      setLog((prev) =>
        [{ job, lang: slot.lang, slot: slot.i, killed, ms: killed ? 2000 : rand(lo, hi) }, ...prev].slice(0, 3),
      );
    }, 650 + run);
    later(() => patch(slot.i, { state: 'idle', job: null }), 650 + run + 900);
  }, [later]);

  // Keep a few jobs flowing while the hero is on screen.
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => {
      if (!visibleRef.current || document.hidden) return;
      const busy = slotsRef.current.filter((s) => s.state !== 'idle').length;
      if (busy < 5 && Math.random() < 0.8) dispatch();
    }, 650);
    return () => clearInterval(id);
  }, [dispatch, reduced]);

  useEffect(() => {
    const onDispatch = () => dispatch();
    window.addEventListener('mb:dispatch', onDispatch);
    return () => window.removeEventListener('mb:dispatch', onDispatch);
  }, [dispatch]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e.isIntersecting;
    });
    io.observe(stageRef.current);
    return () => io.disconnect();
  }, []);

  // Scale the fixed-size scene to the available width.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const apply = () => stage.style.setProperty('--k', String(Math.min(1, stage.clientWidth / SCENE)));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const tilt = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    worldRef.current?.style.setProperty('--rz', `${45 + nx * 14}deg`);
    worldRef.current?.style.setProperty('--rx', `${58 - ny * 10}deg`);
  };
  const untilt = () => {
    worldRef.current?.style.removeProperty('--rz');
    worldRef.current?.style.removeProperty('--rx');
  };

  const running = slots.filter((s) => s.state === 'running' || s.state === 'queued').length;
  const passed = log.filter((l) => !l.killed).map((l) => l.ms);
  const avg = passed.length ? Math.round(passed.reduce((a, b) => a + b, 0) / passed.length) : null;

  return (
    <div className="flex flex-col">
      <div
        ref={stageRef}
        className="relative h-[calc(360px*var(--k,1))] w-full"
        onPointerMove={tilt}
        onPointerLeave={untilt}
        role="img"
        aria-label="Animated illustration of CodeArena's scheduler: code-execution jobs drop into a grid of isolated containers, run, and pass or get killed by their resource limits."
      >
        <div className="absolute left-1/2 top-1/2 size-0" style={{ scale: 'var(--k, 1)' }}>
          <div
            ref={worldRef}
            className="iso-world"
            style={{ width: PLATE, height: PLATE, marginLeft: -PLATE / 2, marginTop: -PLATE / 2 + 8 }}
          >
            <div className="iso-sway">
              {/* plate */}
              <div className="iso-face iso-plate-top rounded-[6px]" style={{ width: PLATE, height: PLATE }} />
              <div
                className="iso-face iso-plate-side"
                style={{ width: PLATE, height: SLAB, transformOrigin: '0 0', transform: `translateY(${PLATE}px) rotateX(-90deg)` }}
              />
              <div
                className="iso-face iso-plate-side"
                style={{ width: SLAB, height: PLATE, transformOrigin: '0 0', transform: `translateX(${PLATE}px) rotateY(90deg)` }}
              />

              {slots.map((s) => {
                const { x, y } = slotPosition(s.i);
                const lifted = s.state === 'running';
                return (
                  <Box
                    key={s.i}
                    w={W}
                    d={W}
                    h={H}
                    className="iso-block"
                    data-state={s.state}
                    style={{ transform: `translate3d(${x}px, ${y}px, ${lifted ? 10 : 0}px)` }}
                  >
                    <span className="absolute left-2.5 top-2 font-mono text-[12px] font-medium">{s.lang}</span>
                    <span className="absolute bottom-2 right-2.5 font-mono text-[9px] opacity-70">
                      {s.state === 'running' ? `#${s.job}` : s.state === 'killed' ? 'tle' : s.state === 'done' ? 'ok' : '256M'}
                    </span>
                  </Box>
                );
              })}

              {packets.map((p) => {
                const { x, y } = slotPosition(p.slot);
                return (
                  <Box
                    key={p.job}
                    w={PACKET}
                    d={PACKET}
                    h={PACKET}
                    className="iso-packet"
                    style={{
                      '--x': `${x + (W - PACKET) / 2}px`,
                      '--y': `${y + (W - PACKET) / 2}px`,
                      '--z': `${H}px`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 w-full max-w-[25rem]">
        <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-ok" />
            CodeArena · simulated
          </span>
          <span className="whitespace-nowrap normal-case tabular-nums">
            {running} running
            {avg != null && <span className="hidden sm:inline"> · avg {avg} ms</span>}
          </span>
        </div>
        <ol className="mt-3 min-h-[4.5rem] space-y-1.5 border-t border-line pt-3 font-mono text-[12px]" aria-hidden="true">
          {log.map((l) => (
            <li key={l.job} className="grid grid-cols-[3.5rem_2.5rem_1fr_auto] items-baseline gap-2">
              <span className="text-subtle">#{l.job}</span>
              <span>{l.lang}</span>
              <span className="truncate text-subtle">sandbox-0{l.slot + 1}</span>
              {l.killed ? (
                <span className="text-danger">✕ cpu.max</span>
              ) : (
                <span className="tabular-nums text-ok">✓ {l.ms} ms</span>
              )}
            </li>
          ))}
          {log.length === 0 && <li className="text-subtle">waiting for jobs…</li>}
        </ol>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={dispatch}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-muted backdrop-blur transition hover:border-line-strong hover:text-fg"
          >
            <Play className="size-3 fill-current" />
            Submit a job
          </button>
          <button
            type="button"
            onClick={() => onOpenProject('codearena')}
            className="inline-flex items-center gap-1 text-xs text-subtle transition hover:text-fg"
          >
            How CodeArena works <ArrowUpRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

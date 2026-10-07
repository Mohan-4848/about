import { useId } from 'react';
import { useInView, usePrefersReducedMotion } from '../../lib/hooks';

const W = 480;
const MID = 92;

// Deterministic pseudo-random so the waveform is stable between renders.
const rand = (i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function buildSignal() {
  const n = 160;
  const spike = { 108: -30, 109: 44, 110: -38, 111: 26, 112: -16, 113: 9 };
  const pts = [];
  for (let i = 0; i < n; i++) {
    const v = Math.sin(i * 0.5) * 3 + Math.sin(i * 1.9) * 2.4 + (rand(i) - 0.5) * 8 + (spike[i] ?? 0);
    pts.push([16 + (i / (n - 1)) * (W - 32), MID - v]);
  }
  return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
}

const SIGNAL = buildSignal();
const ROAD = 'M-10 262 C 70 236, 120 290, 200 258 S 330 214, 380 248 S 470 266, 500 236';

export default function SpeedPotVisual() {
  const [ref, inView] = useInView({ once: false });
  const reduced = usePrefersReducedMotion();
  const signal = SIGNAL;
  const uid = useId().replace(/:/g, '');
  const spikeX = 16 + (110 / 159) * (W - 32);

  return (
    <div ref={ref} className="absolute inset-0">
      <svg viewBox="0 0 480 300" className="size-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Accelerometer trace with a detected pothole spike, above a map with hazard pins">
        <defs>
          <clipPath id={`${uid}-spike`}>
            <rect x={spikeX - 14} y="0" width="26" height="190" />
          </clipPath>
          <linearGradient id={`${uid}-fade`} x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* chart */}
        <text x="16" y="24" className="fill-subtle font-mono text-[10px] uppercase tracking-[0.14em]">accel · z-axis · 50 Hz</text>
        <text x="464" y={MID + 32} textAnchor="end" className="fill-subtle font-mono text-[10px]">threshold ±18</text>
        {[MID - 18, MID + 18].map((y) => (
          <line key={y} x1="16" x2="464" y1={y} y2={y} stroke="var(--line-strong)" strokeDasharray="3 5" />
        ))}
        <path
          d={signal}
          pathLength="1"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.3"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView || reduced ? 0 : 1,
            transition: 'stroke-dashoffset 2.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        <path d={signal} clipPath={`url(#${uid}-spike)`} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
        <g style={{ opacity: inView || reduced ? 1 : 0, transition: 'opacity .6s 1.6s' }}>
          <circle cx={spikeX} cy={MID - 44} r="4" fill="var(--accent)" />
          {!reduced && <circle cx={spikeX} cy={MID - 44} r="4" fill="var(--accent)" className="pulse-ring" />}
          <line x1={spikeX} x2={spikeX - 30} y1={MID - 44} y2={MID - 58} stroke="var(--accent)" />
          <text x={spikeX - 34} y={MID - 55} textAnchor="end" className="fill-fg font-mono text-[11px]">pothole · 2.6 g</text>
        </g>
        {!reduced && (
          <line x1="16" x2="16" y1="36" y2="160" stroke={`url(#${uid}-fade)`} strokeWidth="1">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="448 0" dur="5s" repeatCount="indefinite" />
          </line>
        )}

        {/* map */}
        <line x1="0" x2="480" y1="190" y2="190" stroke="var(--line)" />
        <g opacity="0.6">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`v${i}`} x1={i * 44} x2={i * 44 + 30} y1="190" y2="300" stroke="var(--line)" />
          ))}
          {[220, 250, 280].map((y) => (
            <line key={y} x1="0" x2="480" y1={y} y2={y - 6} stroke="var(--line)" />
          ))}
        </g>
        <path id={`${uid}-road`} d={ROAD} fill="none" stroke="var(--line-strong)" strokeWidth="9" strokeLinecap="round" />
        <path d={ROAD} fill="none" stroke="var(--bg)" strokeWidth="1" strokeDasharray="6 7" />
        {[
          [126, 266],
          [262, 238],
          [404, 250],
        ].map(([x, y], i) => (
          <g key={x} transform={`translate(${x} ${y - 20})`} style={{ opacity: inView || reduced ? 1 : 0, transition: `opacity .5s ${1.8 + i * 0.25}s` }}>
            <path d="M0 0c-5.5 0-9 3.9-9 8.6C-9 14.8 0 21 0 21s9-6.2 9-12.4C9 3.9 5.5 0 0 0Z" fill="var(--accent)" />
            <circle cx="0" cy="8.5" r="3" fill="var(--bg)" />
          </g>
        ))}
        {!reduced && (
          <circle r="5" fill="var(--fg)" stroke="var(--bg)" strokeWidth="2">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${uid}-road`} />
            </animateMotion>
          </circle>
        )}
        <text x="464" y="212" textAnchor="end" className="fill-subtle font-mono text-[10px]">firestore · 3 hazards synced</text>
      </svg>
    </div>
  );
}

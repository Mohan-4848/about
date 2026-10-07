import { useInView, usePrefersReducedMotion } from '../../lib/hooks';

function Box({ x, y, w, h, title, sub, accent = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={h}
        rx="10"
        fill="var(--surface)"
        stroke={accent ? 'var(--accent)' : 'var(--line-strong)'}
        strokeOpacity={accent ? 0.7 : 1}
      />
      <text x="12" y={sub ? h / 2 - 3 : h / 2 + 4} className="fill-fg text-[12px] font-medium">
        {title}
      </text>
      {sub && (
        <text x="12" y={h / 2 + 13} className="fill-subtle font-mono text-[9.5px]">
          {sub}
        </text>
      )}
    </g>
  );
}

export default function HybridNodeVisual() {
  const [ref, inView] = useInView({ once: false });
  const reduced = usePrefersReducedMotion();
  const flow = inView && !reduced ? 'dash-flow' : '';

  return (
    <div ref={ref} className="absolute inset-0">
      <svg viewBox="0 0 480 300" className="size-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagram: Bedrock and Java clients connect through Cloudflare's edge and an outbound tunnel to an ARM64 node running Geyser, Floodgate and the game server, with zero open inbound ports">
        {/* links */}
        <path d="M128 78 C 152 78, 148 140, 172 140" fill="none" stroke="var(--line-strong)" />
        <path d="M128 222 C 152 222, 148 160, 172 160" fill="none" stroke="var(--line-strong)" />
        <path d="M128 78 C 152 78, 148 140, 172 140" fill="none" stroke="var(--fg)" strokeOpacity="0.55" className={flow} />
        <path d="M128 222 C 152 222, 148 160, 172 160" fill="none" stroke="var(--fg)" strokeOpacity="0.55" className={flow} />

        {/* tunnel */}
        <path d="M272 150 L 330 150" stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="10" strokeLinecap="round" />
        <path d="M272 150 L 330 150" stroke="var(--accent)" strokeWidth="1.5" className={flow} />
        <text x="301" y="136" textAnchor="middle" className="fill-accent font-mono text-[9px] uppercase tracking-[0.12em]">tunnel</text>

        <Box x={14} y={52} w={114} h={52} title="Bedrock" sub="UDP · mobile" />
        <Box x={14} y={196} w={114} h={52} title="Java" sub="TCP · desktop" />
        <Box x={172} y={118} w={100} h={64} title="Cloudflare" sub="edge · anycast" />

        {/* node */}
        <g transform="translate(330 30)">
          <rect width="138" height="240" rx="14" fill="var(--surface-2)" stroke="var(--line-strong)" />
          <text x="14" y="24" className="fill-subtle font-mono text-[9.5px] uppercase tracking-[0.14em]">oci · arm64</text>
          <circle cx="122" cy="20" r="3.5" fill="var(--ok)" />
          {!reduced && <circle cx="122" cy="20" r="3.5" fill="var(--ok)" className="pulse-ring" />}
        </g>
        <Box x={342} y={68} w={114} h={44} title="cloudflared" accent />
        <Box x={342} y={124} w={114} h={52} title="Geyser" sub="+ Floodgate" />
        <Box x={342} y={188} w={114} h={44} title="Java server" />
        <path d="M399 112 V124 M399 176 V188" stroke="var(--line-strong)" />

        {/* zero ports badge */}
        <g transform="translate(344 244)">
          <rect width="110" height="18" rx="9" fill="color-mix(in oklab, var(--ok) 14%, transparent)" />
          <text x="55" y="12.5" textAnchor="middle" className="fill-ok font-mono text-[9.5px]">0 inbound ports</text>
        </g>
      </svg>
    </div>
  );
}

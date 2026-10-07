/** Compact waveform glyph used on the "also built" row. */
export default function MemeVisual({ className = '' }) {
  const bars = Array.from({ length: 28 }, (_, i) => 4 + Math.abs(Math.sin(i * 0.9) * 14 + Math.sin(i * 2.3) * 6));
  return (
    <svg viewBox="0 0 168 40" className={className} aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 6}
          y={20 - h / 2}
          width="3"
          height={h}
          rx="1.5"
          fill={i > 9 && i < 15 ? 'var(--accent)' : 'var(--line-strong)'}
        />
      ))}
    </svg>
  );
}

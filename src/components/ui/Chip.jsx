export default function Chip({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted ${className}`}
    >
      {children}
    </span>
  );
}

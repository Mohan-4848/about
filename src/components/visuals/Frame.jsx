/** Shared window chrome for the project visuals. */
export default function Frame({ title, children, className = '' }) {
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line-strong bg-bg/85 shadow-[0_30px_60px_-20px_rgb(var(--shadow-color)/0.45)] backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="truncate font-mono text-[11px] text-subtle">{title}</span>
      </div>
      {children}
    </div>
  );
}

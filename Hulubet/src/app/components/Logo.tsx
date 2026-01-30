export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center rounded-2xl border border-edge bg-panel/80 text-sm font-semibold uppercase text-text shadow-glow">
        H
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-brand pulse-slow" />
      </span>
      <div className="leading-tight">
        <p className="bg-gradient-to-r from-brand via-brand2 to-brand text-base font-semibold uppercase tracking-[0.3em] text-transparent bg-clip-text">
          Hulubet
        </p>
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted">
          Automate. Scale. Succeed.
        </p>
      </div>
    </div>
  );
}

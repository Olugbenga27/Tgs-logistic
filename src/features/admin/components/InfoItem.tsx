interface InfoItemProps {
  label: string
  value: string
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">{value}</p>
    </div>
  )
}

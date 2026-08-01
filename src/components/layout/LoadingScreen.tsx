import { Spinner } from '@/components/ui/Spinner'

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)]">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-[var(--text-muted)]">Loading...</p>
      </div>
    </div>
  )
}

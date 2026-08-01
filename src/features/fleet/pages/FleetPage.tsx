import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useFleet } from '../api'

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  idle: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  maintenance: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export function FleetPage() {
  const { data: fleet = [] } = useFleet()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Fleet</h2>
        <p className="mt-0.5 text-sm text-[var(--text-muted)]">Monitor your fleet vehicles and drivers.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fleet.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{vehicle.id}</CardTitle>
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', statusStyles[vehicle.status])}>
                  {vehicle.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Driver</span>
                <span className="font-medium text-[var(--text-primary)]">{vehicle.driver}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Last Service</span>
                <span className="font-medium text-[var(--text-primary)]">{vehicle.lastService}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Next Service</span>
                <span className="font-medium text-[var(--text-primary)]">{vehicle.nextService}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

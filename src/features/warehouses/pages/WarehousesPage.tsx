import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useWarehouses } from '../api'

export function WarehousesPage() {
  const { data: warehouses = [] } = useWarehouses()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Warehouses</h2>
        <p className="mt-0.5 text-sm text-[var(--text-muted)]">Manage your warehouse network.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {warehouses.map((wh) => (
          <Card key={wh.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{wh.name}</CardTitle>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-alt)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                  {wh.id}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Location</span>
                <span className="font-medium text-[var(--text-primary)]">{wh.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Capacity</span>
                <span className="font-medium text-[var(--text-primary)]">{wh.capacity} units</span>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Utilization</span>
                  <span className="font-medium text-[var(--text-primary)]">{wh.utilization}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--border-subtle)]">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-tsg-500 to-gold-500"
                    style={{ width: `${wh.utilization}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

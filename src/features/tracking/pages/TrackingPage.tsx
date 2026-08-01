import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiSearch } from 'react-icons/hi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useTrackingEvents } from '../api'

export function TrackingPage() {
  const [trackingId, setTrackingId] = useState('')
  const [searched, setSearched] = useState(false)
  const { data: trackingEvents = [] } = useTrackingEvents()

  const handleSearch = () => {
    if (trackingId.trim()) setSearched(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Tracking</h2>
        <p className="mt-0.5 text-sm text-[var(--text-muted)]">Track shipments in real time.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Track a Shipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter tracking ID (e.g. SH-001)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <HiSearch className="h-4 w-4" />
              Track
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tracking History — {trackingId}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {trackingEvents.map((event, i) => (
                  <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-tsg-500 ring-4 ring-tsg-500/15" />
                      {i < trackingEvents.length - 1 && (
                        <div className="mt-1 h-full w-px bg-[var(--border-subtle)]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[var(--text-primary)]">{event.location}</p>
                      <p className="text-sm text-[var(--text-muted)]">{event.timestamp}</p>
                      <span className="inline-block mt-1 rounded-full bg-tsg-500/10 px-2.5 py-0.5 text-xs font-medium capitalize text-tsg-500">
                        {event.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

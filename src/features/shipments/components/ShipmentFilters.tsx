import { motion } from 'framer-motion'
import { HiSearch, HiX } from 'react-icons/hi'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { ShipmentFilters as Filters } from '../types'

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  onClear: () => void
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
]

const carrierOptions = [
  { value: '', label: 'All Carriers' },
  { value: 'FedEx', label: 'FedEx' },
  { value: 'UPS', label: 'UPS' },
  { value: 'DHL', label: 'DHL' },
  { value: 'Aramex', label: 'Aramex' },
]

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export function ShipmentFilters({ filters, onChange, onClear }: Props) {
  const hasFilters = filters.status || filters.carrier || filters.priority

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <Input
          placeholder="Search by ID, origin, or destination..."
          value={filters.search}
          leftIcon={<HiSearch className="h-4 w-4 text-[var(--text-muted)]" />}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="w-full sm:w-auto">
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select
            options={carrierOptions}
            value={filters.carrier}
            onChange={(e) => onChange({ ...filters, carrier: e.target.value })}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select
            options={priorityOptions}
            value={filters.priority}
            onChange={(e) => onChange({ ...filters, priority: e.target.value })}
          />
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <HiX className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </motion.div>
  )
}

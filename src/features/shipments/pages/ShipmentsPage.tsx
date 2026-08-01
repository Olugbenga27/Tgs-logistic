import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiViewGrid, HiViewList, HiPlus } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { ShipmentTable } from '../components/ShipmentTable'
import { ShipmentCard } from '../components/ShipmentCard'
import { ShipmentFilters } from '../components/ShipmentFilters'
import { ShipmentDetailModal } from '../components/ShipmentDetailModal'
import { useShipments } from '../api'
import type { Shipment, ShipmentFilters as Filters } from '../types'

const ITEMS_PER_PAGE = 8

export function ShipmentsPage() {
  const { data: shipments = [] } = useShipments()
  const [filters, setFilters] = useState<Filters>({ search: '', status: '', carrier: '', priority: '' })
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const q = filters.search.toLowerCase()
      if (q && !s.id.toLowerCase().includes(q) && !s.origin.toLowerCase().includes(q) && !s.destination.toLowerCase().includes(q)) {
        return false
      }
      if (filters.status && s.status !== filters.status) return false
      if (filters.carrier && s.carrier !== filters.carrier) return false
      if (filters.priority && s.priority !== filters.priority) return false
      return true
    })
  }, [filters, shipments])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const handleViewDetails = useCallback((shipment: Shipment) => {
    setSelectedShipment(shipment)
    setDetailOpen(true)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({ search: '', status: '', carrier: '', priority: '' })
    setCurrentPage(1)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">My Shipments</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {filtered.length} shipment{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--surface-alt)]">
            <button
              onClick={() => setViewMode('table')}
              aria-label="Table view"
              aria-pressed={viewMode === 'table'}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-all duration-200 ${
                viewMode === 'table'
                  ? 'bg-[var(--surface)] text-tsg-500 shadow-soft'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <HiViewList className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              aria-label="Card view"
              aria-pressed={viewMode === 'cards'}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-all duration-200 ${
                viewMode === 'cards'
                  ? 'bg-[var(--surface)] text-tsg-500 shadow-soft'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <HiViewGrid className="h-4 w-4" />
            </button>
          </div>
          <Button variant="primary" size="sm">
            <HiPlus className="h-4 w-4" />
            New Shipment
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <ShipmentFilters
        filters={filters}
        onChange={(f) => { setFilters(f); setCurrentPage(1) }}
        onClear={handleClearFilters}
      />

      {/* Table View (hidden on small screens for cards) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hidden md:block"
      >
        <Card>
          <CardContent className="p-0">
            <ShipmentTable shipments={paginated} onViewDetails={handleViewDetails} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Card View (shown on small screens, optional toggle) */}
      {viewMode === 'cards' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={viewMode === 'cards' ? 'md:hidden' : 'md:hidden'}
        >
          <div className="grid gap-3">
            {paginated.length === 0 ? (
              <EmptyState
                title="No shipments found"
                description="No shipments match your current filters."
                compact
              />
            ) : (
              paginated.map((s, i) => (
                <ShipmentCard key={s.id} shipment={s} index={i} onViewDetails={handleViewDetails} />
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* Mobile table fallback when viewMode is 'table' */}
      {viewMode === 'table' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:hidden"
        >
          <div className="grid gap-3">
            {paginated.length === 0 ? (
              <EmptyState
                title="No shipments found"
                description="No shipments match your current filters."
                compact
              />
            ) : (
              paginated.map((s, i) => (
                <ShipmentCard key={s.id} shipment={s} index={i} onViewDetails={handleViewDetails} />
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </motion.div>

      {/* Detail Modal */}
      <ShipmentDetailModal
        shipment={selectedShipment}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  )
}

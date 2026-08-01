import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiPencil, HiTrash, HiLocationMarker, HiHome, HiOfficeBuilding } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface Address {
  id: string
  label: string
  type: 'home' | 'office'
  line1: string
  line2: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

const initialAddresses: Address[] = [
  { id: '1', label: 'Home', type: 'home', line1: '123 Logistics Ave', line2: 'Suite 200', city: 'New York', state: 'NY', zip: '10001', country: 'United States', isDefault: true },
  { id: '2', label: 'Office', type: 'office', line1: '456 Commerce Blvd', line2: 'Floor 5', city: 'Newark', state: 'NJ', zip: '07101', country: 'United States', isDefault: false },
]

export function AddressesForm() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)

  const setDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))
  }

  const remove = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Addresses</h3>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage your saved addresses</p>
        </div>
        <Button variant="primary" size="sm">
          <HiPlus className="h-4 w-4" />
          Add Address
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {addresses.map((addr) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
              className={cn(
                'rounded-xl border-2 p-4 transition-all',
                addr.isDefault
                  ? 'border-tsg-500/30 bg-tsg-50/50 dark:bg-tsg-500/5'
                  : 'border-[var(--border-subtle)]',
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    addr.type === 'home' ? 'bg-tsg-50 text-tsg-500 dark:bg-tsg-500/20' : 'bg-purple-50 text-purple-500 dark:bg-purple-500/20',
                  )}>
                    {addr.type === 'home' ? <HiHome className="h-4 w-4" /> : <HiOfficeBuilding className="h-4 w-4" />}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{addr.label}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] capitalize text-[var(--text-muted)]">{addr.type}</span>
                      {addr.isDefault && <Badge variant="default" size="sm">Default</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-tsg-500 hover:bg-tsg-50 dark:hover:bg-tsg-500/20">
                    <HiPencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => remove(addr.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20"
                  >
                    <HiTrash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <HiLocationMarker className="h-4 w-4 text-[var(--text-muted)] mt-0.5 shrink-0" />
                <div>
                  <p>{addr.line1}</p>
                  {addr.line2 && <p>{addr.line2}</p>}
                  <p>{addr.city}, {addr.state} {addr.zip}</p>
                  <p>{addr.country}</p>
                </div>
              </div>
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="mt-3 text-xs font-medium text-tsg-500 hover:text-tsg-600 transition-colors"
                >
                  Set as default
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

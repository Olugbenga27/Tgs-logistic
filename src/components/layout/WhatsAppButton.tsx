import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SiWhatsapp } from 'react-icons/si'
import { HiX, HiChevronRight } from 'react-icons/hi'
import { cn } from '@/lib/utils'

const WHATSAPP_NUMBER = '2347047930464'
const WHATSAPP_MESSAGE = 'Hello T.S.G Grateful Logistics, I have an enquiry.'

function getWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-72 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-elevated"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#1DA851] to-[#25D366] px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                <SiWhatsapp className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">T.S.G Grateful Logistics</p>
                <p className="text-xs text-white/80">Typically replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close WhatsApp chat"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/15 hover:text-white"
              >
                <HiX className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-3 rounded-xl rounded-tl-sm border border-[var(--border-subtle)] bg-[var(--surface-alt)]/60 px-3.5 py-2.5 text-sm text-[var(--text-secondary)]">
                {WHATSAPP_MESSAGE}
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1DA851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
              >
                <SiWhatsapp className="h-4 w-4" />
                Start chat
                <HiChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
        aria-expanded={open}
        className={cn(
          'group relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]',
          open ? 'bg-[var(--text-primary)]' : 'bg-[#25D366] hover:bg-[#1DA851]',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 rounded-full bg-[#25D366]/60',
            !open && 'animate-ping',
          )}
        />
        {open ? (
          <HiX className="relative h-6 w-6" />
        ) : (
          <SiWhatsapp className="relative h-7 w-7" />
        )}
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] shadow-elevated sm:block">
            Chat with us
          </span>
        )}
      </button>
    </div>
  )
}

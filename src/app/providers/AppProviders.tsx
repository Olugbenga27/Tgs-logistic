import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './ThemeProvider'
import { QueryProvider } from './QueryProvider'
import { ToastProvider } from '@/components/ui/Toast'
import { router } from '@/app/routers'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function AppProviders() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      <ThemeProvider>
        <QueryProvider>
          <ToastProvider>
            <Suspense fallback={<LoadingScreen />}>
              <RouterProvider router={router} />
            </Suspense>
            <WhatsAppButton />
          </ToastProvider>
        </QueryProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

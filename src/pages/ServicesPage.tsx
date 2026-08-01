import { ServicesHero } from '@/features/services/components/ServicesHero'
import { ServicesGrid } from '@/features/services/components/ServicesGrid'
import { ServicesCTA } from '@/features/services/components/ServicesCTA'

export function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesCTA />
    </>
  )
}

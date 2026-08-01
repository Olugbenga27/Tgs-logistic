import { HeroSection } from '@/features/landing/components/HeroSection'
import { StatisticsSection } from '@/features/landing/components/StatisticsSection'
import { ServicesSection } from '@/features/landing/components/ServicesSection'
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection'
import { CalculatorSection } from '@/features/landing/components/CalculatorSection'
import { TrackingPreviewSection } from '@/features/landing/components/TrackingPreviewSection'
import { CountriesSection } from '@/features/landing/components/CountriesSection'
import { PartnersSection } from '@/features/landing/components/PartnersSection'
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection'
import { FAQSection } from '@/features/landing/components/FAQSection'
import { NewsletterSection } from '@/features/landing/components/NewsletterSection'
import { CTASection } from '@/features/landing/components/CTASection'

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <HowItWorksSection />
      <CalculatorSection />
      <TrackingPreviewSection />
      <CountriesSection />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
      <CTASection />
    </>
  )
}

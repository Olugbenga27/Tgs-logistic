import { SectionWrapper } from './SectionWrapper'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'

const faqs = [
  {
    q: 'What services does T.S.G Grateful Logistics offer?',
    a: 'We offer 13 services: freight forwarding, express courier, air freight, ocean freight, road freight, rail freight, warehousing & storage, customs brokerage, cargo insurance, personal shopping service, door-to-door delivery, bulk shipping, and supply chain consulting.',
  },
  {
    q: 'How long does shipping to the USA/UK take?',
    a: 'Shipping to the USA and UK typically takes 5–10 business days depending on the service level selected. Express options are available for faster delivery. Use our shipping calculator for precise estimates.',
  },
  {
    q: 'Can you ship hair extensions and jewelry?',
    a: 'Yes, these are our specialty items. We have extensive experience shipping hair extensions, jewelry, fashion accessories, and other personal effects. We handle proper packaging, customs documentation, and insurance for high-value items.',
  },
  {
    q: 'Do you offer door-to-door delivery?',
    a: 'Yes, we offer door-to-door delivery services with real-time tracking from pickup to final destination. Our team handles all customs clearance and last-mile delivery so you don\'t have to worry about a thing.',
  },
  {
    q: 'What is personal shopping service?',
    a: 'Our personal shopping service allows us to purchase items on your behalf from stores that do not ship directly to your country. We buy the items, receive them at our facility, and ship them to your doorstep anywhere in the world.',
  },
  {
    q: 'How do I track my shipment?',
    a: 'You can track your shipment through our online tracking portal using your unique tracking number. You\'ll receive real-time updates at every stage — pickup, transit, customs clearance, and delivery.',
  },
  {
    q: 'What countries do you ship to?',
    a: 'We ship to the USA, UK, Canada, Europe (EU & Schengen countries), UAE (all Emirates), West Africa (Nigeria, Ghana, etc.), Asia (China, Japan, India, Singapore, etc.), and worldwide destinations. New routes are added regularly.',
  },
  {
    q: 'Do you offer bulk shipping discounts?',
    a: 'Yes, we offer competitive discounts for bulk and commercial shipping. Contact our sales team for a custom quote tailored to your volume and shipping requirements.',
  },
]

export function FAQSection() {
  return (
    <SectionWrapper
      badge="FAQ"
      title="Frequently Asked Questions"
      description="Everything you need to know about T.S.G Grateful Logistics services."
      variant="alt"
    >
      <div className="max-w-3xl mx-auto">
        <Accordion>
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} title={faq.q}>
              {faq.a}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  )
}

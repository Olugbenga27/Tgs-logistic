import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { SectionWrapper } from './SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Text } from '@/components/ui/Text'

export function CalculatorSection() {
  const [estimated, setEstimated] = useState<number | null>(null)

  const handleCalculate = () => {
    setEstimated(Math.floor(Math.random() * 3000) + 500)
  }

  return (
    <SectionWrapper
      badge="Shipping Calculator"
      title="Estimate Your Shipping Cost"
      description="Get an instant rate estimate for your shipment. Final pricing confirmed at booking."
    >
      <div className="max-w-4xl mx-auto">
        <Card variant="elevated">
          <CardContent className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input label="Origin" placeholder="City or ZIP" />
              <Input label="Destination" placeholder="City or ZIP" />
              <Select
                label="Weight"
                placeholder="Select range"
                options={[
                  { value: '0-10', label: '0 – 10 kg' },
                  { value: '10-50', label: '10 – 50 kg' },
                  { value: '50-100', label: '50 – 100 kg' },
                  { value: '100-500', label: '100 – 500 kg' },
                  { value: '500+', label: '500+ kg' },
                ]}
              />
              <Select
                label="Service Type"
                placeholder="Select type"
                options={[
                  { value: 'economy', label: 'Economy' },
                  { value: 'standard', label: 'Standard' },
                  { value: 'express', label: 'Express' },
                  { value: 'same-day', label: 'Same Day' },
                ]}
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="gold" size="lg" onClick={handleCalculate}>
                Calculate Rate
                <HiArrowRight className="h-4 w-4" />
              </Button>

              {estimated !== null && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 rounded-lg bg-tsg-500/10 px-4 py-2.5"
                >
                  <Text variant="bodySm" className="text-[var(--text-secondary)]">
                    Estimated cost:
                  </Text>
                  <Text variant="h5" className="text-tsg-500">
                    ${estimated.toLocaleString()}
                  </Text>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}

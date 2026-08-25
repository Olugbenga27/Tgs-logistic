import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from '../components/StepIndicator'
import { SenderStep } from '../components/steps/SenderStep'
import { ReceiverStep } from '../components/steps/ReceiverStep'
import { PackageStep } from '../components/steps/PackageStep'
import { ShippingMethodStep } from '../components/steps/ShippingMethodStep'
import { CourierStep } from '../components/steps/CourierStep'
import { ReviewStep } from '../components/steps/ReviewStep'
import { ConfirmationStep } from '../components/steps/ConfirmationStep'
import { defaultFormData, stepFields } from '../components/booking-types'
import type { BookingFormData } from '../components/booking-types'

export function BookShipmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    defaultValues: defaultFormData,
    mode: 'onChange',
  })

  const data = watch()

  const handleNext = useCallback(async () => {
    if (currentStep >= 6) return
    const fields = stepFields[currentStep]
    if (fields.length === 0) {
      setCurrentStep(s => s + 1)
      return
    }
    const valid = await trigger(fields)
    if (valid) setCurrentStep(s => s + 1)
  }, [currentStep, trigger])

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep(s => s - 1)
  }, [currentStep])

  const onSubmit = useCallback(() => {
    setCurrentStep(6)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--surface)] py-8 sm:py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Book a Shipment</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Fill in the details to create a new shipment booking</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <StepIndicator currentStep={currentStep} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardContent className="p-5 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  <div key={currentStep}>
                    {currentStep === 0 && <SenderStep register={register} errors={errors} watch={watch} setValue={setValue} />}
                    {currentStep === 1 && <ReceiverStep register={register} errors={errors} watch={watch} setValue={setValue} />}
                    {currentStep === 2 && <PackageStep register={register} errors={errors} />}
                    {currentStep === 3 && <ShippingMethodStep register={register} errors={errors} watch={watch} />}
                    {currentStep === 4 && <CourierStep register={register} errors={errors} watch={watch} />}
                    {currentStep === 5 && <ReviewStep data={data} />}
                    {currentStep === 6 && <ConfirmationStep />}
                  </div>
                </AnimatePresence>

                {currentStep < 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border-subtle)]"
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                    >
                      <HiArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    {currentStep === 5 ? (
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Confirm Booking
                            <HiCheck className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleNext}
                      >
                        Next
                        <HiArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

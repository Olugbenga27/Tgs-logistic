import { useMemo } from 'react'
import { Select } from '@/components/ui/Select'
import { countries } from '@/features/booking/components/countries'
import { getCityOptions } from '@/features/booking/components/cities'

interface CountryCitySelectProps {
  label: string
  countryValue: string
  cityValue: string
  countryError?: string
  cityError?: string
  onCountryChange: (value: string) => void
  onCityChange: (value: string) => void
}

export function CountryCitySelect({
  label,
  countryValue,
  cityValue,
  countryError,
  cityError,
  onCountryChange,
  onCityChange,
}: CountryCitySelectProps) {
  const cityOptions = useMemo(() => getCityOptions(countryValue), [countryValue])

  const handleCountryChange = (value: string) => {
    onCountryChange(value)
    onCityChange('')
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Select
        label={`${label} Country *`}
        placeholder="Select country"
        options={countries}
        searchable
        value={countryValue}
        onValueChange={handleCountryChange}
        error={countryError}
      />
      <Select
        label={`${label} City *`}
        placeholder={countryValue ? 'Search city' : 'Select country first'}
        options={cityOptions}
        searchable
        value={cityValue}
        onValueChange={onCityChange}
        error={cityError}
        disabled={!countryValue}
      />
    </div>
  )
}

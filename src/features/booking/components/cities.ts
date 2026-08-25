import { City } from 'country-state-city'

const cityCache = new Map<string, { value: string; label: string }[]>()

export function getCityOptions(countryCode?: string): { value: string; label: string }[] {
  if (!countryCode) return []

  const code = countryCode.toUpperCase()

  const cached = cityCache.get(code)
  if (cached) return cached

  const raw = City.getCitiesOfCountry(code) ?? []

  const nameCounts = new Map<string, number>()
  for (const city of raw) {
    nameCounts.set(city.name, (nameCounts.get(city.name) ?? 0) + 1)
  }

  const seen = new Set<string>()
  const options: { value: string; label: string }[] = []

  for (const city of raw) {
    const isDuplicate = (nameCounts.get(city.name) ?? 0) > 1
    const label = isDuplicate ? `${city.name} (${city.stateCode})` : city.name
    const value = `${code}-${city.stateCode}-${city.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    if (seen.has(value)) continue
    seen.add(value)

    options.push({ value, label })
  }

  options.sort((a, b) => a.label.localeCompare(b.label))

  cityCache.set(code, options)
  return options
}

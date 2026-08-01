import { cn } from '@/lib/utils'
import { initials } from './format'

const hues = [
  'from-tsg-400 to-tsg-600',
  'from-gold-400 to-gold-600',
  'from-emerald-400 to-emerald-600',
  'from-sky-400 to-sky-600',
  'from-purple-400 to-purple-600',
]

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const hue = hues[(name.charCodeAt(0) + name.length) % hues.length]
  const sizeClass =
    size === 'sm' ? 'h-8 w-8 text-[10px]' : size === 'lg' ? 'h-11 w-11 text-sm' : 'h-9 w-9 text-xs'
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white',
        hue,
        sizeClass,
        className,
      )}
    >
      {initials(name)}
    </div>
  )
}

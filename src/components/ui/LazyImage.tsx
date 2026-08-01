import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  overlay?: boolean
  overlayColor?: string
  aspectRatio?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  objectFit?: 'cover' | 'contain' | 'fill'
  priority?: boolean
}

const roundedMap = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

export function LazyImage({
  src,
  alt,
  className,
  wrapperClassName,
  overlay = false,
  overlayColor = 'from-tsg-900/60 via-tsg-900/30 to-transparent',
  aspectRatio,
  rounded = 'xl',
  objectFit = 'cover',
  priority = false,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) { setInView(true); return }
    const el = imgRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [priority])

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        roundedMap[rounded],
        aspectRatio && `aspect-[${aspectRatio}]`,
        wrapperClassName,
      )}
    >
      {inView && (
        <>
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setLoaded(true)}
            className={cn(
              'w-full h-full transition-all duration-700',
              objectFit === 'cover' && 'object-cover',
              objectFit === 'contain' && 'object-contain',
              objectFit === 'fill' && 'object-fill',
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              className,
            )}
          />
          {overlay && (
            <div
              className={cn(
                'pointer-events-none absolute inset-0 bg-gradient-to-t',
                overlayColor,
              )}
            />
          )}
        </>
      )}
      {(!inView || !loaded) && (
        <div className="absolute inset-0 bg-[var(--surface-alt)] animate-pulse" />
      )}
    </div>
  )
}

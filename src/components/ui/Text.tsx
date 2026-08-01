import { type HTMLAttributes, forwardRef, type ElementType } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-bold tracking-tight lg:text-4xl',
      h3: 'text-2xl font-semibold tracking-tight lg:text-3xl',
      h4: 'text-xl font-semibold tracking-tight lg:text-2xl',
      h5: 'text-lg font-semibold lg:text-xl',
      h6: 'text-base font-semibold lg:text-lg',
      subtitle: 'text-lg font-medium text-[var(--text-secondary)]',
      body: 'text-base leading-relaxed',
      bodySm: 'text-sm leading-relaxed',
      caption: 'text-xs leading-relaxed text-[var(--text-muted)]',
      overline: 'text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TextTags = 'p' | 'span' | 'div' | 'label' | 'caption'
type AllowedTags = HeadingTags | TextTags

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: AllowedTags
  asChild?: boolean
}

const tagMap: Record<string, AllowedTags> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  subtitle: 'p', body: 'p', bodySm: 'p', caption: 'p', overline: 'p',
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant = 'body', as, ...props }, ref) => {
    const Component = as ?? (tagMap[variant ?? 'body'] || 'p') as ElementType
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant }), className)}
        {...props}
      />
    )
  },
)
Text.displayName = 'Text'

export { Text, textVariants }

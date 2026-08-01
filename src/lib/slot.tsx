import {
  isValidElement,
  cloneElement,
  type ReactNode,
  type HTMLAttributes,
} from 'react'

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export function Slot({ children, ...props }: SlotProps) {
  if (isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>
    return cloneElement(children, {
      ...props,
      ...childProps,
      className: [props.className || '', childProps.className || ''].filter(Boolean).join(' '),
    } as Record<string, unknown>)
  }
  return null
}

import { cva, type VariantProps } from 'class-variance-authority'
import { AnimatePresence } from 'framer-motion'
import * as React from 'react'

import { cn } from '../../../../utils'
import AnimateHeightWrapper from '../../utils/AnimateHeight'

const validationMessageVariants = cva('text-default-text text-sm p-3 rounded mt-2', {
  variants: {
    variant: {
      error: 'bg-[#FEE7EB]',
      warning: 'bg-[#FCF5CF]',
      info: 'bg-[#CEF]',
    },
  },
  defaultVariants: {
    variant: 'warning',
  },
})

export interface ValidationMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof validationMessageVariants> {
  message?: string
  label?: string
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  className,
  variant,
  message,
  label,
}) => (
  <AnimatePresence>
    {message && (
      <AnimateHeightWrapper layoutId={`${variant}-${label}`}>
        <div className={cn(validationMessageVariants({ variant }), className)}>{message}</div>
      </AnimateHeightWrapper>
    )}
  </AnimatePresence>
)

ValidationMessage.displayName = 'ValidationMessage'

export { ValidationMessage }

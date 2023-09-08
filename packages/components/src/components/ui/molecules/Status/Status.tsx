import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../../utils'
import { Icon } from '../../atoms'
import { IconNames } from '../../atoms/Icon/Icon'

const statusVariants = cva(
  'rounded-full space-x-1.5 inline-flex items-center text-default-text whitespace-nowrap',
  {
    variants: {
      variant: {
        paid: ['bg-[#D8F2EA]', 'text-[#004D33]'],
        partial: ['bg-[#FCF5CF]', 'text-[#663300]'],
        unpaid: ['bg-[#F1F3F4]'],
        pending: ['bg-information-bg'],
        pending_approval: ['bg-warning-yellow', 'text-[#663300]'],
        failed: ['bg-[#FEE7EB]', 'text-[#4D000D]'],
        inprogress: ['bg-main-grey'],
      },
      size: {
        small: ['text-xs', 'font-normal', 'py-1', 'px-2', 'h-fit'],
        large: ['text-sm', 'font-medium', 'px-3', 'py-1.5', 'h-fit', 'w-fit'],
      },
    },
    defaultVariants: {
      variant: 'unpaid',
      size: 'small',
    },
  },
)

const iconVariants = cva('w-auto mb-0.5', {
  variants: {
    variant: {
      paid: ['text-[#29A37A]'],
      partial: ['text-[#B25900]'],
      unpaid: ['text-[#C8D0D0]'],
      pending: ['text-control-grey-hover'],
      pending_approval: ['text-[#B25900]'],
      failed: ['text-[#F32448]'],
      inprogress: ['text-grey-text'],
    },
  },
  defaultVariants: {
    variant: 'unpaid',
  },
})

export interface StatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {}

type TVariant = Exclude<
  Required<Pick<VariantProps<typeof statusVariants>, 'variant'>>['variant'],
  null | undefined
>

const iconName: Record<TVariant, Record<'small' | 'large', IconNames>> = {
  paid: {
    small: 'done/12',
    large: 'done/16',
  },
  partial: {
    small: 'partial/12',
    large: 'partial/12',
  },
  unpaid: {
    small: 'not-started/12',
    large: 'not-started/12',
  },
  pending: {
    small: 'pending/12',
    large: 'pending/12',
  },
  failed: {
    small: 'failed/12',
    large: 'failed/16',
  },
  pending_approval: {
    small: 'pending-approval/12',
    large: 'pending-approval/16',
  },
  inprogress: {
    small: 'inprogress/12',
    large: 'inprogress/16',
  },
}

const Status: React.FC<StatusProps> = ({
  className,
  size = 'small',
  variant = 'unpaid',
  ...props
}) => (
  <div className={cn(statusVariants({ variant, size }), className)} {...props}>
    {variant && (
      <Icon name={iconName[variant][size ?? 'small']} className={cn(iconVariants({ variant }))} />
    )}
    <span className="uppercase">
      {size === 'large' && variant === 'partial'
        ? 'partially paid'
        : variant === 'inprogress'
        ? 'in progress'
        : variant === 'pending_approval'
        ? 'pending approval'
        : variant}
    </span>
  </div>
)

Status.displayName = 'Status'

export { Status }

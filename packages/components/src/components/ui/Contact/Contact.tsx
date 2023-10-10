import { cva, VariantProps } from 'class-variance-authority'

import { LocalContact } from '../../../types/LocalTypes'
import { defaultAnonymousUserName } from '../../../utils/constants'

const containerVariant = cva('flex flex-col', {
  variants: {
    size: {
      small: [''],
      large: ['pr-6'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

const nameVariants = cva('', {
  variants: {
    size: {
      small: ['truncate text-13px'],
      large: ['text-[1.25rem]', 'font-semibold', 'leading-7', 'mb-2'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

const emailVariants = cva('text-grey-text break-all', {
  variants: {
    size: {
      small: ['text-xs truncate'],
      large: ['text-sm'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

export interface ContactProps extends LocalContact {
  size?: VariantProps<typeof nameVariants>['size']
}

const Contact = ({ name, email, size = 'small' }: ContactProps) => {
  return (
    <div className={containerVariant({ size })}>
      <p className={nameVariants({ size })}>{name ?? defaultAnonymousUserName}</p>
      {email && <p className={emailVariants({ size })}>{email}</p>}
    </div>
  )
}

export default Contact

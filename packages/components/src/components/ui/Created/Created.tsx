import { cva, VariantProps } from 'class-variance-authority'

import { LocalUser } from '../../../types/LocalTypes'
import { formatDateWithYear } from '../../../utils/formatters'
import InfoTooltip from '../InfoTooltip/InfoTooltip'

const createdAtVariants = cva('', {
  variants: {
    size: {
      small: ['text-13px'],
      large: ['text-[1.25rem]', 'font-semibold'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

const createdByVariants = cva('text-grey-text truncate', {
  variants: {
    size: {
      small: ['text-xs'],
      large: ['text-sm'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

export interface CreatedProps {
  createdAt: Date
  createdByUser?: LocalUser
  createdByMerchantTokenDescription?: string
  size?: VariantProps<typeof createdAtVariants>['size']
}

const Created = ({
  createdAt,
  createdByUser,
  createdByMerchantTokenDescription,
  size = 'small',
}: CreatedProps) => {
  const createdByUserName = createdByUser
    ? `${createdByUser.firstName} ${createdByUser.lastName}`
    : ''
  return (
    <div className="flex flex-col">
      <span className={createdAtVariants({ size: size })}>{formatDateWithYear(createdAt)}</span>
      {((createdByUser && createdByUserName.length > 21) ||
        (createdByMerchantTokenDescription && createdByMerchantTokenDescription.length > 21)) && (
        <InfoTooltip
          content={
            createdByUser
              ? createdByUserName
              : createdByMerchantTokenDescription
              ? createdByMerchantTokenDescription
              : ''
          }
          className="w-full"
        >
          {createdByUser && (
            <span className={createdByVariants({ size: size })}>
              {createdByUser.firstName} {createdByUser.lastName}
            </span>
          )}
          {createdByMerchantTokenDescription && (
            <span className={createdByVariants({ size: size })}>
              {createdByMerchantTokenDescription}
            </span>
          )}
        </InfoTooltip>
      )}

      {createdByUser && createdByUserName.length <= 21 && (
        <span className={createdByVariants({ size: size })}>
          {createdByUser.firstName} {createdByUser.lastName}
        </span>
      )}

      {createdByMerchantTokenDescription && createdByMerchantTokenDescription.length <= 21 && (
        <span className={createdByVariants({ size: size })}>
          {createdByMerchantTokenDescription}
        </span>
      )}
    </div>
  )
}

export default Created

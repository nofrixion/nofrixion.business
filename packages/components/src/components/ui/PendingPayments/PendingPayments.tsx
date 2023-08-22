import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { LocalPayout } from '../../../types/LocalTypes'
import { formatAmount } from '../../../utils/formatters'
import { formatCurrency } from '../../../utils/uiFormaters'
import { Icon } from '../atoms'
import AnimateHeightWrapper from '../utils/AnimateHeight'

export interface PendingPaymentsProps extends React.HTMLAttributes<HTMLDivElement> {
  pendingPayments: LocalPayout[]
  onSeeMore: () => void
}

export const PendingPayments: React.FC<PendingPaymentsProps> = ({
  pendingPayments,
  onSeeMore,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible {...props}>
      <CollapsibleTrigger className="w-full">
        <div
          className="flex justify-end text-xs font-normal leading-4 items-center gap-2 text-grey-text"
          onClick={() => setIsOpen(!isOpen)}
          aria-hidden="true"
        >
          <span>{pendingPayments.length} pending payments</span>
          <span>
            <Icon name={isOpen ? 'arrow-down/8' : 'arrow-up/8'} />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <AnimatePresence initial={true}>
          {pendingPayments && (
            <AnimateHeightWrapper layoutId="content" layout="size">
              <div className="flex-row mt-4">
                {pendingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex justify-between py-2 text-xs items-center text-default-text flex-shrink-0 border-t font-normal"
                  >
                    <span className="mr-4 w-[128px] text-default-text">{payment.createdBy}</span>
                    <span className="">{payment.description}</span>
                    <span className="text-right font-medium tabular-nums font-inter-fontFeatureSettings">
                      - {formatCurrency(payment.currency)} {formatAmount(payment.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end py-2 border-t">
                {pendingPayments.length > 3 && (
                  <span
                    onClick={() => onSeeMore()}
                    aria-hidden="true"
                    className="text-right text-xs font-normal underline text-default-text cursor-pointer hover:no-underline"
                  >
                    See all
                  </span>
                )}
              </div>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  )
}

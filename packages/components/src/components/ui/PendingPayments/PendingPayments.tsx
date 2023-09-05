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
}

export const PendingPayments: React.FC<PendingPaymentsProps> = ({ pendingPayments, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible {...props}>
      <CollapsibleTrigger
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-end text-xs font-normal leading-4 items-center gap-2 text-grey-text mt-1"
      >
        <span>{pendingPayments.length} pending payments</span>
        <span>
          <Icon name={isOpen ? 'arrow-up/8' : 'arrow-down/8'} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent forceMount>
        <AnimatePresence initial={isOpen}>
          {isOpen && pendingPayments && (
            <AnimateHeightWrapper layoutId="pendingPayments">
              <div className="flex-row mt-4">
                {pendingPayments.slice(0, 3).map((payment) => (
                  <div
                    key={payment.id}
                    className="flex justify-between py-2 text-xs items-center text-default-text flex-shrink-0 border-t font-normal"
                  >
                    <div className="flex text-default-text text-left">
                      <span className="mr-4 w-[128px] ">{payment.createdBy}</span>
                      <span className="w-[144px]">{payment.description}</span>
                    </div>
                    <span className="text-right font-medium tabular-nums font-inter-fontFeatureSettings whitespace-nowrap">
                      - {formatCurrency(payment.currency)} {formatAmount(payment.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end py-2 border-t">
                {pendingPayments.length > 3 && (
                  <span
                    aria-hidden="true"
                    className="text-right text-xs font-normal text-default-text"
                  >
                    +{pendingPayments.length - 3} more
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

import { Currency } from '@nofrixion/moneymoov'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { AnimatePresence } from 'framer-motion'

import { formatAmount } from '../../../utils/formatters'
import { formatCurrency } from '../../../utils/uiFormaters'
import { Icon } from '../atoms'
import AnimateHeightWrapper from '../utils/AnimateHeight'

export interface PendingPaymentsProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  reference: string
  amount: number
  onSeeMore: () => void
}

const PendingPayments: React.FC<PendingPaymentsProps> = ({
  name,
  reference,
  amount,
  onSeeMore,
  ...props
}) => {
  const getTotalPendingPayments = () => {
    console.log(name, reference, amount)
    return pendingPaymentsList.length
  }

  const pendingPaymentsList = [
    {
      id: 1,
      name: 'Daniel Kowalski',
      reference: 'Insurance payment',
      amount: 1200.0,
      currency: Currency.EUR,
    },
    {
      id: 2,
      name: 'John Smith',
      reference: '123456789877675',
      amount: 29.0,
      currency: Currency.GBP,
    },
    {
      id: 3,
      name: 'Facebook Inc.',
      reference: 'Reference title',
      amount: 897.56,
      currency: Currency.EUR,
    },
  ]

  return (
    <Collapsible {...props}>
      <CollapsibleTrigger className="w-full">
        <div className="flex justify-end text-xs font-normal leading-4 items-center gap-2 text-grey-text">
          <span>{getTotalPendingPayments()} pending payments</span>
          <span>
            <Icon name="arrow-up/8" />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <AnimatePresence initial={true}>
          {pendingPaymentsList && (
            <AnimateHeightWrapper layoutId="content" layout="size">
              <div className="flex-row mt-4">
                {pendingPaymentsList.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex justify-between py-2 text-xs items-center text-default-text flex-shrink-0 border-t font-normal"
                  >
                    <span className="mr-4 w-[128px] text-default-text">{payment.name}</span>
                    <span className="">{payment.reference}</span>
                    <span className="text-right font-medium tabular-nums font-inter-fontFeatureSettings">
                      - {formatCurrency(payment.currency)} {formatAmount(payment.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <span onClick={() => onSeeMore()} aria-hidden="true">
                  See more
                </span>
              </div>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default PendingPayments

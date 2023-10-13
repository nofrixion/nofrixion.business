import { LocalTransaction } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatAmount, formatDate } from '../../../../utils/formatters'
import { formatCurrency } from '../../../../utils/uiFormaters'
import Card from '../../atoms/Card/Card'

export interface LatestTransactionsCardProps {
  transactions?: LocalTransaction[]
  isLoading?: boolean
  className?: string
}

interface TransactionRowWithTransaction {
  transaction: LocalTransaction
  isLoading?: never
}
interface TransactionRowWithLoading {
  transaction?: never
  isLoading: true
}

type TransactionRowProps = TransactionRowWithTransaction | TransactionRowWithLoading

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction: tx, isLoading }) => {
  const loadingClasses = 'bg-[#E0E9EB] animate-pulse rounded-md h-4'

  const mergedClasses = (classes: string) => cn(classes, isLoading && loadingClasses)

  return (
    <div
      className={cn(
        'flex flex-row items-center py-2 text-[13px]/6 text-default-text border-border-grey space-x-9 w-full',
        {
          'border-b': !isLoading,
        },
      )}
    >
      <span className={mergedClasses('text-grey-text w-24')}>
        {!isLoading && formatDate(tx.date)}
      </span>
      <span className={mergedClasses('w-40')}>{!isLoading && tx.counterParty.name}</span>
      <span className={mergedClasses('flex-1')}>{!isLoading && (tx.accountName ?? '-')}</span>
      <span
        className={mergedClasses(
          cn(
            'text-sm/6 font-medium tabular-nums text-right ml-auto',
            !isLoading && tx.amount >= 0 ? 'text-positive-green' : 'text-negative-red',
          ),
        )}
      >
        {!isLoading &&
          `${tx.amount < 0 ? '-' : ''} ${formatCurrency(tx.currency)}${formatAmount(
            Math.abs(tx.amount),
          )}`}
      </span>
    </div>
  )
}

const LatestTransactionsCard: React.FC<LatestTransactionsCardProps> = ({
  transactions,
  isLoading = false,
  className,
}) => (
  <Card title="Latest transactions" className={className}>
    <div className="mt-12 w-full">
      {/* TODO: Do loading state with skeleton. Map 10 elements and show skeleton */}
      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => (
          <TransactionRow key={`loading-tx-${i}`} isLoading />
        ))}

      {/* Emtpy state - if no transactions have happened yet */}
      {/* TODO: Show message saying no transactions yet */}
      {!isLoading && (!transactions || transactions.length == 0) && (
        <span>
          No transactions yet. <br />
          Start by sending money to your account or paying a bill.
        </span>
      )}

      {/* Show transactions */}
      {!isLoading &&
        transactions &&
        transactions.length > 0 &&
        transactions.map((tx) => (
          <TransactionRow key={`latest-transaction-${tx.id}`} transaction={tx} />
        ))}
    </div>
  </Card>
)

export default LatestTransactionsCard

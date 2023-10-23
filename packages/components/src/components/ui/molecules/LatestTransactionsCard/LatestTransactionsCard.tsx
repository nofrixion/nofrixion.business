import { LocalTransaction } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatAmount, formatDate } from '../../../../utils/formatters'
import { formatCurrency } from '../../../../utils/uiFormaters'
import Card from '../../atoms/Card/Card'
import { EmptyState } from '../../atoms/EmptyState/EmptyState'

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
        'flex flex-row md:items-center py-2 text-[13px]/6 text-default-text border-border-grey space-x-6 xl:space-x-9 w-full',
      )}
    >
      <div className="flex flex-col flex-1 md:flex-none md:flex-row-reverse">
        <span className={mergedClasses('text-13px/4 w-40 md:leading-6')}>
          {!isLoading && tx.counterParty.name}
        </span>
        <span
          className={mergedClasses(
            'text-13px/4 text-grey-text md:leading-6 md:mr-6 md:w-24 xl:mr-9',
          )}
        >
          {!isLoading && formatDate(tx.date)}
        </span>
      </div>

      <span className={mergedClasses('hidden md:block flex-1')}>
        {!isLoading && (tx.accountName ?? '-')}
      </span>

      <span
        className={mergedClasses(
          cn(
            'text-sm/4 md:text-sm/6 font-medium tabular-nums text-right ml-auto',
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
    <div
      className={cn('mt-8 md:mt-10 w-full', {
        'divide-y': !isLoading,
      })}
    >
      {isLoading &&
        Array.from({ length: 9 }).map((_, i) => (
          <TransactionRow key={`loading-tx-${i}`} isLoading />
        ))}

      {/* Emtpy state - if no transactions have happened yet */}
      {!isLoading && (!transactions || transactions.length == 0) && (
        <EmptyState>
          Here you will see the latest transactions <br /> from all your accounts.
        </EmptyState>
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

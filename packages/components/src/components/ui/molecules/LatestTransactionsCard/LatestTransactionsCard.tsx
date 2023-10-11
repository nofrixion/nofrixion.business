import { LocalTransaction } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatAmount, formatDate } from '../../../../utils/formatters'
import Card from '../../atoms/Card/Card'

export interface LatestTransactionsCardProps {
  transactions?: LocalTransaction[]
  isLoading?: boolean
  className?: string
}

const TransactionRow: React.FC<LocalTransaction> = (tx) => (
  <div className="flex flex-row items-center py-2 text-[13px]/6 text-default-text border-b border-border-grey space-x-9 w-full">
    <span className="text-grey-text w-24">{formatDate(tx.date)}</span>
    <span className="w-40">{tx.counterParty.name}</span>
    <span className="flex-1">Account - TODO</span>
    <span
      className={cn(
        'text-sm/6 font-medium tabular-nums text-right ml-auto',
        tx.amount >= 0 ? 'text-positive-green' : 'text-negative-red',
      )}
    >
      {formatAmount(tx.amount)}
    </span>
  </div>
)

const LatestTransactionsCard: React.FC<LatestTransactionsCardProps> = ({
  transactions,
  isLoading = false,
  className,
}) => (
  <Card title="Latest transactions" subtext="Last 30 days" className={className}>
    <div className="mt-12 w-full">
      {/* TODO: Do loading state with skeleton. Map 10 elements and show skeleton */}
      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`loading-tx-${i}`}
            className={`h-6 w-full bg-[#E0E9EB] animate-pulse rounded-md my-2`}
          />
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
        transactions.map((tx) => <TransactionRow key={`latest-transaction-${tx.id}`} {...tx} />)}
    </div>
  </Card>
)

export default LatestTransactionsCard

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

type TransactionRowProps = { transaction: LocalTransaction }

const LoadingTransactionRow: React.FC = () => {
  const loadingClass = 'bg-[#EFF4F5] animate-pulse rounded-lg h-2'
  return (
    <div
      className={cn(
        'flex flex-row md:items-center py-4 border-border-grey space-x-6 xl:space-x-9 w-full h-6 flex-1',
      )}
    >
      <div className="flex flex-col flex-1 md:flex-none md:flex-row-reverse">
        <span className={cn('w-40', loadingClass)} />
        <span className={cn('md:mr-6 md:w-24 xl:mr-9', loadingClass)} />
      </div>

      <span className={cn('hidden md:block w-28', loadingClass)} />

      <span className={cn('!ml-auto w-20', loadingClass)} />
    </div>
  )
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction: tx }) => {
  return (
    <div
      className={cn(
        'flex flex-row md:items-center py-2 text-[13px]/6 text-default-text border-border-grey space-x-6 xl:space-x-9 w-full',
      )}
    >
      <div className="flex flex-col flex-1 md:flex-none md:flex-row-reverse">
        <span className="text-13px/4 w-40 md:leading-6">{tx.counterParty.name}</span>
        <span className={'tet-13px/4 text-grey-text md:leading-6 md:mr-6 md:w-24 xl:mr-9'}>
          {formatDate(tx.date)}
        </span>
      </div>

      <span className="hidden md:block flex-1">{tx.accountName ?? '-'}</span>

      <span
        className={cn('text-sm/4 md:text-sm/6 font-medium tabular-nums text-right ml-auto', {
          'text-positive-green': tx.amount >= 0,
          'text-negative-red': tx.amount < 0,
        })}
      >
        {`${tx.amount < 0 ? '-' : ''} ${formatCurrency(tx.currency)}${formatAmount(
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
    <div className="mt-8 md:mt-10 w-full divide-y">
      {isLoading &&
        Array.from({ length: 9 }).map((_, i) => <LoadingTransactionRow key={`loading-tx-${i}`} />)}

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

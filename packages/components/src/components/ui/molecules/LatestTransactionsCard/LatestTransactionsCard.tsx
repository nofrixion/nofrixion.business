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
      {!isLoading && (!transactions || transactions.length == 0) && (
        <div className="flex flex-col -mx-6 md:-mx-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="656"
            height="145"
            viewBox="0 0 656 145"
            fill="none"
            className="w-full mt-20 mb-16"
          >
            <path
              d="M0 103.751L82.4258 103.751C108.402 103.751 129.46 82.6931 129.46 56.7166V25.1817C129.46 16.6215 136.4 9.68203 144.96 9.68203V9.68203C153.52 9.68203 160.46 16.6215 160.46 25.1817L160.46 115.793C160.46 123.787 166.94 130.267 174.934 130.267V130.267C182.927 130.267 189.408 123.787 189.408 115.793L189.408 66.3325C189.408 57.7094 196.398 50.7189 205.021 50.7189V50.7189C213.644 50.7189 220.635 57.7093 220.635 66.3325V83.1303C220.635 90.6834 226.758 96.8064 234.311 96.8064V96.8064C241.864 96.8064 247.987 90.6834 247.987 83.1303V31.0657C247.987 23.3237 254.263 17.0476 262.005 17.0476V17.0476C269.747 17.0476 276.023 23.3237 276.023 31.0657V126.754C276.023 134.622 282.401 141 290.269 141V141C298.137 141 304.515 134.622 304.515 126.754V59.3354C304.515 51.0898 311.2 44.4055 319.445 44.4055V44.4055C327.691 44.4055 334.375 51.0898 334.375 59.3354V111.479C334.375 120.229 341.467 127.321 350.216 127.321V127.321C358.966 127.321 366.058 120.229 366.058 111.479V17.4482C366.058 10.021 372.079 4 379.506 4V4C386.933 4 392.954 10.021 392.954 17.4482V107.384C392.954 114.559 398.771 120.376 405.947 120.376V120.376C413.122 120.376 418.939 114.559 418.939 107.384V48.892C418.939 40.8354 425.47 34.3041 433.527 34.3041V34.3041C441.584 34.3041 448.115 40.8354 448.115 48.892V67.7243C448.115 76.3475 455.105 83.3379 463.729 83.3379V83.3379C472.352 83.3379 479.342 76.3475 479.342 67.7243V34.7048C479.342 27.2775 485.363 21.2565 492.791 21.2565V21.2565C500.218 21.2565 506.239 27.2775 506.239 34.7048V79.8156C506.239 86.9911 512.056 92.808 519.231 92.808V92.808C526.407 92.808 532.223 86.9911 532.223 79.8156V74.1836C532.223 63.8976 540.562 55.5591 550.848 55.5591L655.5 55.5591"
              stroke="#F0F5F4"
              strokeWidth="8"
            />
          </svg>
          <span className="text-base mx-auto text-center text-grey-text">
            Here you will see the latest transactions <br /> from all your accounts.
          </span>
        </div>
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

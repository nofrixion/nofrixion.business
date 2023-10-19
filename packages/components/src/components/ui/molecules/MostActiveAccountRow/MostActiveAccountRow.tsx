import { LocalAccountWithTransactionMetrics } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatAmount } from '../../../../utils/formatters'
import AccountBalance from '../../Account/AccountBalance/AccountBalance'
import { Icon } from '../../atoms'

interface MostActiveAccountRowWithAccount {
  account: LocalAccountWithTransactionMetrics
  isLoading?: never
}
interface MostActiveAccountWithLoading {
  account?: never
  isLoading: true
}

type MostActiveAccountRowProps = MostActiveAccountRowWithAccount | MostActiveAccountWithLoading

export const MostActiveAccountRow: React.FC<MostActiveAccountRowProps> = ({
  account,
  isLoading,
}) => {
  const loadingClasses = 'bg-[#E0E9EB] animate-pulse rounded-md '

  const mergedClasses = (classes?: string) => cn(classes, isLoading && loadingClasses)

  return (
    <div
      className={
        'flex flex-row items-center py-2 text-[13px]/6 text-default-text border-border-grey justify-between w-full'
      }
    >
      <div className={cn(isLoading && 'w-1/2 flex flex-col gap-3')}>
        <div className={mergedClasses(isLoading && 'w-1/2 h-3')}>
          {!isLoading && (
            <span className="text-sm leading-8 font-semibold">{account.accountName}</span>
          )}
        </div>

        <div className={cn('flex gap-4', isLoading && 'w-1/2 h-2')}>
          <div className={mergedClasses(isLoading && 'w-1/4')}>
            {!isLoading && (
              <div className="flex items-center h-full justify-end font-medium text-xs tabular-nums text-positive-green">
                <div className="mr-1">
                  <Icon name="incoming/8" />
                </div>
                {formatAmount(account.totalIncomingAmount)}
              </div>
            )}
          </div>
          <div className={mergedClasses(isLoading && 'w-1/4')}>
            {!isLoading && (
              <div className="flex items-center h-full justify-end font-medium text-xs tabular-nums text-negative-red">
                <div className="mr-1">
                  <Icon name="outgoing/8" />
                </div>
                {formatAmount(account.totalOutgoingAmount)}
              </div>
            )}
          </div>
        </div>
      </div>
      <span className={cn(isLoading && 'w-1/2 flex')}>
        {isLoading && (
          <div className="flex flex-col gap-3 w-full items-end">
            <div className={mergedClasses(isLoading && 'w-1/4 h-3')}></div>
            <div className={mergedClasses(isLoading && 'w-1/3 h-2')}></div>
          </div>
        )}
        {!isLoading && (
          <AccountBalance
            size={'small'}
            balance={account.balance}
            availableBalance={account.availableBalance}
            currency={account.currency}
            className="py-[7.11px]"
            hideAvailableBalanceIfSameAsBalance={true}
          ></AccountBalance>
        )}
      </span>
    </div>
  )
}

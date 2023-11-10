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

interface AccountProps {
  onAccountClick?: (accountID: string) => void
}

type MostActiveAccountRowProps =
  | (MostActiveAccountRowWithAccount | MostActiveAccountWithLoading) & AccountProps

export const MostActiveAccountRow: React.FC<MostActiveAccountRowProps> = ({
  account,
  isLoading,
  onAccountClick,
}) => {
  const loadingClasses = 'bg-[#E0E9EB] animate-pulse rounded-md'

  const mergedClasses = (classes?: string) => cn(classes, isLoading && loadingClasses)

  return (
    <div
      className={cn(
        'flex flex-row sm:items-center text-[13px]/6 text-default-text border-border-grey justify-between w-full',
        isLoading ? 'py-4' : 'py-2',
      )}
    >
      <div className={cn(isLoading && 'flex flex-col gap-4')}>
        <div className={mergedClasses(isLoading && 'w-40 h-2')}>
          {!isLoading && (
            <button
              className={cn('text-sm leading-8 font-semibold text-left', {
                'cursor-pointer hover:underline hover:underline-offset-4': onAccountClick,
              })}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                onAccountClick && onAccountClick(account.accountID)
                e.stopPropagation()
              }}
            >
              <span className="line-clamp-1 sm:line-clamp-none">{account.accountName}</span>
            </button>
          )}
        </div>

        <div className={cn('flex flex-col gap-2 sm:flex-row sm:gap-4', isLoading && 'h-2')}>
          <div className={mergedClasses(isLoading && 'w-40')}>
            {!isLoading && (
              <div className="flex items-center h-full sm:justify-end font-medium text-xs tabular-nums text-positive-green">
                <div className="mr-1">
                  <Icon name="incoming/8" />
                </div>
                {formatAmount(account.totalIncomingAmount)}
              </div>
            )}
          </div>
          {!isLoading && (
            <div className="flex items-center h-full sm:justify-end font-medium text-xs tabular-nums text-negative-red">
              <div className="mr-1">
                <Icon name="outgoing/8" />
              </div>
              {formatAmount(account.totalOutgoingAmount)}
            </div>
          )}
        </div>
      </div>
      <span>
        {isLoading && (
          <div className="flex justify-end">
            <div className={mergedClasses(isLoading && 'w-[7.5rem] h-2')}></div>
          </div>
        )}
        {!isLoading && (
          <AccountBalance
            size={'small'}
            balance={account.balance}
            availableBalance={account.availableBalance}
            currency={account.currency}
            className="sm:py-[7.11px] leading-8 sm:leading-6"
            hideAvailableBalanceIfSameAsBalance={true}
          />
        )}
      </span>
    </div>
  )
}

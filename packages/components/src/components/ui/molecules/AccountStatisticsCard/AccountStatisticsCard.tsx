import { Currency } from '@nofrixion/moneymoov'

import {
  LocalAccountMetrics,
  LocalAccountWithTransactionMetrics,
} from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { ChartSkeletonData } from '../../../../utils/utils'
import AccountBalance from '../../Account/AccountBalance/AccountBalance'
import Card from '../../atoms/Card/Card'
import { EmptyState } from '../../atoms/EmptyState/EmptyState'
import ChartSkeleton from '../Chart/ChartSkeleton/ChartSkeleton'
import { MostActiveAccountRow } from '../MostActiveAccountRow/MostActiveAccountRow'

export interface AccountStatisticsCardProps {
  accounts?: LocalAccountWithTransactionMetrics[]
  isLoading?: boolean
  className?: string
  currency?: Currency
  accountMetrics?: LocalAccountMetrics[]
  onCurrencyChange?: (currency: Currency) => void
  onShowViewAll?: () => void
}

const AccountStatisticsCard: React.FC<AccountStatisticsCardProps> = ({
  accounts,
  isLoading = false,
  className,
  currency,
  accountMetrics,
  onCurrencyChange,
  onShowViewAll,
}) => {
  const loadingClasses = 'bg-[#E0E9EB] animate-pulse rounded-md '

  const mergedClasses = (classes?: string) => cn(classes, isLoading && loadingClasses)
  return (
    <Card
      title="Your accounts"
      className={className}
      currency={currency}
      onCurrencyChange={onCurrencyChange}
      onShowViewAll={onShowViewAll}
    >
      {/* Emtpy state - if no accounts are found */}
      {!isLoading && (!accounts || accounts.length == 0) && (
        <EmptyState>Here you will see your most active accounts statistics.</EmptyState>
      )}

      <div className={cn('flex justify-between items-end mb-10 mt-6', isLoading && 'items-center')}>
        {!isLoading && accounts && accounts.length > 0 && <div className="h-[103px]">Graph</div>}
        {isLoading && (
          <div className="flex flex-grow-[2] h-[103px] items-center justify-center">
            <ChartSkeleton points={ChartSkeletonData} />
          </div>
        )}
        <div className={cn('flex flex-col text-right', (isLoading || !currency) && 'w-56')}>
          {(isLoading || !currency) && (
            <div className="w-full items-end">
              <div className={cn(mergedClasses(), (isLoading || !currency) && 'h-2')}></div>
            </div>
          )}
          {!isLoading && accountMetrics && currency && (
            <span className=" font-normal mt-2 mr-1 mb-2 text-sm font-inter-fontFeatureSettings text-grey-text">
              Total {accountMetrics.filter((x) => x.currency === currency)[0].numberOfAccounts}{' '}
              accounts
            </span>
          )}

          {!isLoading && accounts && accounts.length > 0 && accountMetrics && currency && (
            <AccountBalance
              size={'medium'}
              availableBalance={
                accountMetrics.filter((x) => x.currency === currency)[0].totalAvailableBalance
              }
              balance={accountMetrics.filter((x) => x.currency === currency)[0].totalBalance}
              currency={currency}
              hideAvailableBalanceIfSameAsBalance={true}
            ></AccountBalance>
          )}
        </div>
      </div>

      {(isLoading || (accounts && accounts.length > 0)) && (
        <span className="text-xs font-normal text-grey-text mb-2">MOST ACTIVE ACCOUNTS</span>
      )}

      <div className="w-full divide-y">
        {/* TODO: Do loading state with skeleton. Map 3 elements and show skeleton */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <MostActiveAccountRow key={`loading-accounts-${i}`} isLoading />
          ))}

        {/* Show transactions */}
        {!isLoading &&
          accounts &&
          accounts.length > 0 &&
          accounts.map((acc) => (
            <MostActiveAccountRow key={`top-account-${acc.accountID}`} account={acc} />
          ))}
      </div>
    </Card>
  )
}

export default AccountStatisticsCard

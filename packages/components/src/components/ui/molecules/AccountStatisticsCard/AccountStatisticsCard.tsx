import { Currency } from '@nofrixion/moneymoov'

import {
  LocalAccountMetrics,
  LocalAccountWithTransactionMetrics,
} from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { periodicBalancesToChartPoints } from '../../../../utils/parsers'
import { ChartSkeletonData } from '../../../../utils/utils'
import AccountBalance from '../../Account/AccountBalance/AccountBalance'
import Card from '../../atoms/Card/Card'
import { EmptyState } from '../../atoms/EmptyState/EmptyState'
import AccountChart from '../Chart/AccountChart'
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
  onAccountClick?: (accountID: string) => void
}

const AccountStatisticsCard: React.FC<AccountStatisticsCardProps> = ({
  accounts,
  isLoading = false,
  className,
  currency,
  accountMetrics,
  onCurrencyChange,
  onShowViewAll,
  onAccountClick,
}) => {
  const loadingClasses = 'bg-[#E0E9EB] animate-pulse rounded-md'

  const mergedClasses = (classes?: string) => cn(classes, isLoading && loadingClasses)
  return (
    <Card
      title="Your accounts"
      className={className}
      currency={currency}
      onCurrencyChange={onCurrencyChange}
      onShowViewAll={onShowViewAll}
      onClick={onShowViewAll}
    >
      {/* Emtpy state - if no accounts are found */}
      {!isLoading && (!accounts || accounts.length == 0) && (
        <EmptyState>Here you will see your most active accounts statistics.</EmptyState>
      )}

      <div className="mt-6 mb-10 flex flex-col sm:flex-row gap-x-8">
        {/* Chart */}
        <>
          {!isLoading && accounts && accounts.length > 0 && accountMetrics && currency && (
            <AccountChart
              height={103}
              currency={currency}
              points={periodicBalancesToChartPoints(
                accountMetrics.filter((x) => x.currency === currency)[0].periodicBalances,
              )}
            />
          )}

          {/* Chart skeleton */}
          {isLoading && (
            <div className="w-full h-[103px]">
              <ChartSkeleton points={ChartSkeletonData} />
            </div>
          )}
        </>

        {/* Balance at right of chart */}
        <div
          className={cn('flex flex-col sm:justify-end sm:text-right', {
            'w-56': isLoading || !currency,
          })}
        >
          {/* Loading state */}
          {(isLoading || !currency) && (
            <div className="w-full items-end mt-4 sm:mt-0">
              <div className={cn(mergedClasses(), { 'h-2': isLoading || !currency })}></div>
            </div>
          )}

          <div className="flex sm:flex-col justify-between mt-4">
            {!isLoading && accountMetrics && currency && (
              <span className="font-normal mt-1 sm:mt-0 mb-2 text-sm font-inter-fontFeatureSettings text-grey-text">
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
              />
            )}
          </div>
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
            <MostActiveAccountRow
              key={`top-account-${acc.accountID}`}
              account={acc}
              onAccountClick={onAccountClick}
            />
          ))}
      </div>
    </Card>
  )
}

export default AccountStatisticsCard

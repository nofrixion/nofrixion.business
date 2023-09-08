import { Pagination, PayoutMetrics, PayoutStatus, SortDirection } from '@nofrixion/moneymoov'
import * as Tabs from '@radix-ui/react-tabs'
import { set } from 'date-fns'
import { AnimatePresence } from 'framer-motion'

import { LocalPayout } from '../../../../types/LocalTypes'
import AmountFilter from '../../AmountFilter/AmountFilter'
import { Button, Icon } from '../../atoms'
import DateRangePicker, { DateRange } from '../../DateRangePicker/DateRangePicker'
import { PayoutsTable } from '../../organisms/PayoutsTable/PayoutsTable'
import ScrollArea from '../../ScrollArea/ScrollArea'
import SearchBar from '../../SearchBar/SearchBar'
import Tab from '../../Tab/Tab'
import { Toaster } from '../../Toast/Toast'
import LayoutWrapper from '../../utils/LayoutWrapper'

export interface PayoutDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  payouts: LocalPayout[]
  payoutMetrics?: PayoutMetrics
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  searchFilter: string
  merchantCreatedAt?: Date
  currency?: string
  minAmount?: number
  maxAmount?: number
  isLoading: boolean
  selectedPayoutId: string | undefined
  onPageChange: (page: number) => void
  onSort: (
    name: 'date' | 'amount' | 'status' | 'counterParty.name',
    direction: SortDirection,
  ) => void
  onDateChange: (dateRange: DateRange) => void
  onSearch: (searchFilter: string) => void
  onCreatePayout: () => void
  setStatus?: (status: PayoutStatus) => void
  setCurrency?: (currency?: string) => void
  setMinAmount?: (minAmount?: number) => void
  setMaxAmount?: (maxAmount?: number) => void
  isLoadingMetrics: boolean
  isInitialState: boolean
  onPayoutClicked?: (paymentRequest: LocalPayout) => void
}

const PayoutDashboard: React.FC<PayoutDashboardProps> = ({
  payouts,
  payoutMetrics,
  pagination,
  searchFilter,
  merchantCreatedAt,
  onDateChange,
  onSearch,
  onPageChange,
  onSort,
  onCreatePayout,
  setStatus,
  currency,
  setCurrency,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  isLoading = false,
  isLoadingMetrics = false,
  isInitialState = false,
  onPayoutClicked,
  selectedPayoutId,
}) => {
  /// Only show the total amount if there are payouts
  /// with the specified timeframe and currency, no matter the status,
  /// unless there are no payouts at all for the specified status.
  const getTotalAmountPerCurrencyAndStatus = (
    currency: 'eur' | 'gbp',
    status: 'paid' | 'inProgress' | 'failed' | 'pendingApproval',
  ) => {
    if (
      payoutMetrics &&
      payoutMetrics.totalAmountsByCurrency &&
      payoutMetrics.totalAmountsByCurrency.all?.[currency] &&
      payoutMetrics[status] &&
      payoutMetrics[status] > 0
    ) {
      return payoutMetrics.totalAmountsByCurrency?.[status]?.[currency] ?? 0
    }
  }

  return (
    <>
      <div className="font-inter bg-main-grey text-default-text h-full">
        <div className="flex gap-8 justify-between items-center mb-8 md:mb-[68px] md:px-4">
          <span className="leading-8 font-medium text-2xl md:text-[1.75rem]">Payouts</span>
          <div>
            <Button size="big" onClick={onCreatePayout} className="w-10 h-10 md:w-full md:h-full">
              <span className="hidden md:inline-block">Create payout</span>
              <Icon name="add/16" className="md:hidden" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[10px] h-16 flex justify-between items-center px-3 mb-4">
          <DateRangePicker
            onDateChange={onDateChange}
            // Set first date to the first day of the year the merchant was created
            firstDate={
              merchantCreatedAt ? set(merchantCreatedAt, { month: 0, date: 1 }) : undefined
            }
          />

          <div className="hidden md:inline-flex flex-row space-x-2">
            <SearchBar value={searchFilter} setValue={onSearch} />
            <AmountFilter
              currency={currency}
              setCurrency={setCurrency}
              minAmount={minAmount}
              setMinAmount={setMinAmount}
              maxAmount={maxAmount}
              setMaxAmount={setMaxAmount}
            />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {!isInitialState && (
            <LayoutWrapper>
              <ScrollArea hideScrollbar>
                <Tabs.Root
                  defaultValue={PayoutStatus.All}
                  onValueChange={(value) => setStatus && setStatus(value as PayoutStatus)}
                >
                  {/* Keep the Tab to still get accessibility functions through the keyboard */}
                  <Tabs.List className="flex shrink-0 gap-x-4 mb-4">
                    <Tab
                      status={PayoutStatus.All}
                      isLoading={isLoadingMetrics}
                      totalRecords={payoutMetrics?.all ?? 0}
                      totalAmountInEuros={payoutMetrics?.totalAmountsByCurrency?.all?.eur}
                      totalAmountInPounds={payoutMetrics?.totalAmountsByCurrency?.all?.gbp}
                    />
                    <Tab
                      status={PayoutStatus.PENDING_APPROVAL}
                      isLoading={isLoadingMetrics}
                      totalRecords={payoutMetrics?.pendingApproval ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus(
                        'eur',
                        'pendingApproval',
                      )}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus(
                        'gbp',
                        'pendingApproval',
                      )}
                    />
                    <Tab
                      status={PayoutStatus.PENDING}
                      isLoading={isLoadingMetrics}
                      totalRecords={payoutMetrics?.inProgress ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus('eur', 'inProgress')}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus('gbp', 'inProgress')}
                    />
                    <Tab
                      status={PayoutStatus.FAILED}
                      isLoading={isLoadingMetrics}
                      totalRecords={payoutMetrics?.failed ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus('eur', 'failed')}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus('gbp', 'failed')}
                    />
                    <Tab
                      status={PayoutStatus.PROCESSED}
                      isLoading={isLoadingMetrics}
                      totalRecords={payoutMetrics?.paid ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus('eur', 'paid')}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus('gbp', 'paid')}
                    />
                  </Tabs.List>
                  <Tabs.Content value=""></Tabs.Content>
                </Tabs.Root>
              </ScrollArea>
            </LayoutWrapper>
          )}
        </AnimatePresence>

        <div className="flex-row bg-white rounded-lg px-7 py-8">
          <PayoutsTable
            payouts={payouts}
            pagination={{
              pageSize: pagination.pageSize,
              totalSize: pagination.totalSize,
            }}
            onPageChange={onPageChange}
            onSort={onSort}
            isLoading={isLoading}
            onPayoutClicked={onPayoutClicked}
            selectedPayoutId={selectedPayoutId}
          />
        </div>

        <Toaster positionY="top" positionX="right" duration={3000} />
      </div>
    </>
  )
}

export { PayoutDashboard }

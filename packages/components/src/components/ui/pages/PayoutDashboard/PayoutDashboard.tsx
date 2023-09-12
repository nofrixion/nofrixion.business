import { Pagination, PayoutMetrics, PayoutStatus, SortDirection } from '@nofrixion/moneymoov'
import * as Tabs from '@radix-ui/react-tabs'
import { set } from 'date-fns'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { LocalPayout } from '../../../../types/LocalTypes'
import { Button, Icon } from '../../atoms'
import { DateRange } from '../../DateRangePicker/DateRangePicker'
import FilterControlsRow from '../../FilterControlsRow/FilterControlsRow'
import { Loader } from '../../Loader/Loader'
import { PayoutsTable } from '../../organisms/PayoutsTable/PayoutsTable'
import ScrollArea from '../../ScrollArea/ScrollArea'
import Tab from '../../Tab/Tab'
import { FilterableTag } from '../../TagFilter/TagFilter'
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
  tags: FilterableTag[]
  setTags: (tags: FilterableTag[]) => void
  createdSortDirection: SortDirection
  setCreatedSortDirection?: (direction: SortDirection) => void
  amountSortDirection: SortDirection
  setAmountSortDirection?: (direction: SortDirection) => void
  status: PayoutStatus
  onAddPayoutForApproval: (payoutId: string) => void
  onRemovePayoutForApproval: (payoutId: string) => void
  selectedPayouts: string[]
  onApproveBatchPayouts: () => void
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
  tags,
  setTags,
  createdSortDirection,
  setCreatedSortDirection,
  amountSortDirection,
  setAmountSortDirection,
  status,
  onAddPayoutForApproval,
  onRemovePayoutForApproval,
  selectedPayouts,
  onApproveBatchPayouts,
}) => {
  const [isApproveButtonDisabled, setIsApproveButtonDisabled] = useState(false)

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

  const handleApproveBatchPayouts = async () => {
    setIsApproveButtonDisabled(true)
    onApproveBatchPayouts()
  }

  return (
    <>
      <div className="font-inter bg-main-grey text-default-text h-full">
        <div className="flex gap-8 justify-between items-center mb-8 md:mb-[68px] md:px-4">
          <span className="leading-8 font-medium text-2xl md:text-[1.75rem]">Payouts</span>
          <div className="flex space-x-4">
            {selectedPayouts && selectedPayouts.length > 1 && (
              <Button
                variant={'secondary'}
                size="big"
                onClick={handleApproveBatchPayouts}
                className="space-x-2 w-fit h-10 md:w-full md:h-full transition-all ease-in-out duration-200 disabled:!bg-grey-text disabled:!opacity-100 disabled:cursor-not-allowed"
                disabled={isApproveButtonDisabled}
              >
                {isApproveButtonDisabled ? (
                  <Loader className="h-6 w-6 mx-20" />
                ) : (
                  <>
                    <Icon name="authorise/16" />
                    <span className="hidden md:inline-block">
                      Authorise {selectedPayouts.length} pending
                    </span>
                  </>
                )}
              </Button>
            )}
            <Button size="big" onClick={onCreatePayout} className="w-10 h-10 md:w-full md:h-full">
              <span className="hidden md:inline-block">Create payout</span>
              <Icon name="add/16" className="md:hidden" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {!isInitialState && (
            <div className="mb-4">
              <FilterControlsRow
                setDateRange={onDateChange}
                searchFilter={searchFilter}
                setSearchFilter={onSearch}
                currency={currency}
                setCurrency={setCurrency}
                minAmount={minAmount}
                setMinAmount={setMinAmount}
                maxAmount={maxAmount}
                setMaxAmount={setMaxAmount}
                tags={tags}
                setTags={setTags}
                createdSortDirection={createdSortDirection}
                setCreatedSortDirection={setCreatedSortDirection}
                amountSortDirection={amountSortDirection}
                setAmountSortDirection={setAmountSortDirection}
                firstDate={
                  merchantCreatedAt ? set(merchantCreatedAt, { month: 0, date: 1 }) : undefined
                }
              />
            </div>
          )}
        </AnimatePresence>

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
            status={status}
            onAddPayoutForApproval={onAddPayoutForApproval}
            onRemovePayoutForApproval={onRemovePayoutForApproval}
            selectedPayouts={selectedPayouts}
          />
        </div>

        <Toaster positionY="top" positionX="right" duration={3000} />
      </div>
    </>
  )
}

export { PayoutDashboard }

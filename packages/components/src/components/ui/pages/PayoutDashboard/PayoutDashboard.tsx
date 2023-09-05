import { Pagination, SortDirection } from '@nofrixion/moneymoov'
import { set } from 'date-fns'

import { LocalPayout } from '../../../../types/LocalTypes'
import AmountFilter from '../../AmountFilter/AmountFilter'
import { Button, Icon } from '../../atoms'
import DateRangePicker, { DateRange } from '../../DateRangePicker/DateRangePicker'
import { PayoutsTable } from '../../organisms/PayoutsTable/PayoutsTable'
import SearchBar from '../../SearchBar/SearchBar'
import { Toaster } from '../../Toast/Toast'

export interface PayoutDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  payouts: LocalPayout[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  searchFilter: string
  merchantCreatedAt?: Date
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount' | 'status', direction: SortDirection) => void
  onDateChange: (dateRange: DateRange) => void
  onSearch: (searchFilter: string) => void
  onCreatePayout: () => void
  currency?: string
  setCurrency?: (currency?: string) => void
  minAmount?: number
  setMinAmount?: (minAmount?: number) => void
  maxAmount?: number
  setMaxAmount?: (maxAmount?: number) => void
  isLoading: boolean
}

const PayoutDashboard: React.FC<PayoutDashboardProps> = ({
  payouts,
  pagination,
  searchFilter,
  merchantCreatedAt,
  onDateChange,
  onSearch,
  onPageChange,
  onSort,
  onCreatePayout,
  currency,
  setCurrency,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  isLoading = false,
}) => {
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
            <AmountFilter
              currency={currency}
              setCurrency={setCurrency}
              minAmount={minAmount}
              setMinAmount={setMinAmount}
              maxAmount={maxAmount}
              setMaxAmount={setMaxAmount}
            />
            <SearchBar value={searchFilter} setValue={onSearch} />
          </div>
        </div>

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
          />
        </div>

        <Toaster positionY="top" positionX="right" duration={3000} />
      </div>
    </>
  )
}

export { PayoutDashboard }

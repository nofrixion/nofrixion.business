import { Pagination, SortDirection } from '@nofrixion/moneymoov'

import { LocalPayout } from '../../../../types/LocalTypes'
import { DateRange } from '../../DateRangePicker/DateRangePicker'
import { PayoutsTable } from '../../organisms/PayoutsTable/PayoutsTable'
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
}

const PayoutDashboard: React.FC<PayoutDashboardProps> = ({
  payouts,
  pagination,
  //   searchFilter,
  //   merchantCreatedAt,
  //   onDateChange,
  //   onSearch,
  onPageChange,
  onSort,
}) => {
  return (
    <>
      <div className="mb-12 md:px-4">
        <div className="flex justify-between mt-6">
          <div className="text-[28px]/8 font-semibold">
            <h2>Payouts</h2>
          </div>
        </div>
      </div>

      {/* <div className="bg-white rounded-[10px] h-16 flex justify-between items-center px-3 mb-4">
        <DateRangePicker
          onDateChange={onDateChange}
          // Set first date to the first day of the year the merchant was created
          firstDate={merchantCreatedAt ? set(merchantCreatedAt, { month: 0, date: 1 }) : undefined}
        />

        <SearchBar value={searchFilter} setValue={onSearch} />
      </div> */}

      <div className="bg-white rounded-lg px-7 py-8">
        <PayoutsTable
          payouts={payouts}
          pagination={{
            pageSize: pagination.pageSize,
            totalSize: pagination.totalSize,
          }}
          onPageChange={onPageChange}
          onSort={onSort}
        />
      </div>

      <Toaster positionY="top" positionX="right" duration={3000} />
    </>
  )
}

export { PayoutDashboard }

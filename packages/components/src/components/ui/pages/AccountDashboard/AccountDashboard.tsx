import { Pagination, SortDirection } from '@nofrixion/moneymoov'
import * as React from 'react'

import { LocalTransaction } from '../../../../types/LocalTypes'
import { Icon } from '../../atoms'
import DateRangePicker, { DateRange } from '../../DateRangePicker/DateRangePicker'
import { TransactionsTable } from '../../organisms/TransactionsTable/TransactionsTable'
import SearchBar from '../../SearchBar/SearchBar'

export interface AccountDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: LocalTransaction[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  searchFilter: string
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount', direction: SortDirection) => void
  onDateChange: (dateRange: DateRange) => void
  onSearch: (searchFilter: string) => void
}

const AccountDashboard: React.FC<AccountDashboardProps> = ({
  transactions,
  pagination,
  searchFilter,
  onDateChange,
  onSearch,
  onPageChange,
  onSort,
}) => {
  return (
    <>
      <div className="mb-12">
        <div className="flex justify-between">
          <button onClick={() => {}} className="flex items-center space-x-3">
            <Icon name="back/12" />
            <span>All current accounts</span>
          </button>
          {/* TODO: Implement download statement feature*/}
          {/* <div>
            <Button
              variant="text"
              size="small"
              previousIcon="download/12"
              className="text-default-text"
              onClick={() => {}}
            >
              Download statement
            </Button>
          </div> */}
        </div>

        {/*  TODO: Use account info from hook */}
        <div className="flex justify-between mt-6">
          <div className="text-[28px]/8 font-semibold">
            <h2>Main account Euros</h2>
            {/* TODO: Use Display and copy component (Arif's component) */}
          </div>

          <div className="flex flex-col items-end">
            {/* TODO: Use Arif's component instead*/}
            <h2 className="text-[32px]/9 font-semibold">€ 34,197.00</h2>
            <span className="text-sm/5">Available € 32,845.00</span>

            {/* TODO: Add expand component */}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[10px] h-16 flex justify-between items-center px-3 mb-4">
        <DateRangePicker onDateChange={onDateChange} />

        <SearchBar value={searchFilter} setValue={onSearch} />
      </div>

      <div className="bg-white rounded-lg px-7 py-8">
        <TransactionsTable
          transactions={transactions}
          pagination={{
            pageSize: pagination.pageSize,
            totalSize: pagination.totalSize,
          }}
          onPageChange={onPageChange}
          onSort={onSort}
        />
      </div>
    </>
  )
}

export { AccountDashboard }

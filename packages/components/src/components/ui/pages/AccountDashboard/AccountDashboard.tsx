import {
  Account,
  AccountIdentifierType,
  Currency,
  Pagination,
  SortDirection,
} from '@nofrixion/moneymoov'
import * as React from 'react'

import { LocalPayout, LocalTransaction } from '../../../../types/LocalTypes'
import AccountBalance from '../../Account/AccountBalance/AccountBalance'
import { DisplayAndCopy, Icon } from '../../atoms'
import DateRangePicker, { DateRange } from '../../DateRangePicker/DateRangePicker'
import { TransactionsTable } from '../../organisms/TransactionsTable/TransactionsTable'
import { PendingPayments } from '../../PendingPayments/PendingPayments'
import SearchBar from '../../SearchBar/SearchBar'
import { Toaster } from '../../Toast/Toast'

export interface AccountDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: LocalTransaction[]
  account?: Account
  pendingPayments?: LocalPayout[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  searchFilter: string
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount', direction: SortDirection) => void
  onDateChange: (dateRange: DateRange) => void
  onSearch: (searchFilter: string) => void
  onAllCurrentAccountsClick?: () => void
  onSeeMore: () => void
}

const AccountDashboard: React.FC<AccountDashboardProps> = ({
  transactions,
  account,
  pendingPayments,
  pagination,
  searchFilter,
  onDateChange,
  onSearch,
  onPageChange,
  onSort,
  onAllCurrentAccountsClick,
  onSeeMore,
}) => {
  return (
    <>
      <div className="mb-12">
        <div className="flex justify-between">
          <button onClick={onAllCurrentAccountsClick} className="flex items-center space-x-3">
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
            <h2>{account?.accountName}</h2>
            <div className="flex gap-6 mt-2">
              {account?.identifier.type === AccountIdentifierType.IBAN ? (
                <DisplayAndCopy name="IBAN" value={account.identifier.iban} />
              ) : account?.identifier.type === AccountIdentifierType.SCAN ? (
                <>
                  <DisplayAndCopy name="SC" value={account?.identifier.sortCode} />
                  <DisplayAndCopy name="AN" value={account?.identifier.accountNumber} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end">
            {/* TODO: Use Arif's component instead*/}
            <AccountBalance
              availableBalance={account?.availableBalance ?? 0}
              balance={account?.balance ?? 0}
              currency={account?.currency ?? Currency.None}
            />

            {/* TODO: Add expand component */}
            {pendingPayments && pendingPayments.length > 0 && (
              <PendingPayments
                pendingPayments={pendingPayments}
                onSeeMore={onSeeMore}
                className="w-[400px]"
              />
            )}
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

      <Toaster positionY="top" positionX="right" duration={3000} />
    </>
  )
}

export { AccountDashboard }

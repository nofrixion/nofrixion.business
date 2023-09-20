import {
  Account,
  AccountIdentifierType,
  Currency,
  Pagination,
  SortDirection,
} from '@nofrixion/moneymoov'
import { set } from 'date-fns'
import * as React from 'react'
import { useState } from 'react'

import { LocalPayout, LocalTransaction } from '../../../../types/LocalTypes'
import AccountBalance from '../../Account/AccountBalance/AccountBalance'
import { DisplayAndCopy, Icon } from '../../atoms'
import DateRangePicker, { DateRange } from '../../DateRangePicker/DateRangePicker'
import EditableContent from '../../molecules/EditableContent/EditableContent'
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
  merchantCreatedAt?: Date
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount', direction: SortDirection) => void
  onDateChange: (dateRange: DateRange) => void
  onSearch: (searchFilter: string) => void
  onAllCurrentAccountsClick?: () => void
  onAccountNameChange: (newAccountName: string) => void
}

const AccountDashboard: React.FC<AccountDashboardProps> = ({
  transactions,
  account,
  pendingPayments,
  pagination,
  searchFilter,
  merchantCreatedAt,
  onDateChange,
  onSearch,
  onPageChange,
  onSort,
  onAllCurrentAccountsClick,
  onAccountNameChange,
}) => {
  const [localAccountName, setLocalAccountName] = useState('')

  React.useEffect(() => {
    setLocalAccountName(account?.accountName ?? '')
  }, [account?.accountName])

  const handleOnAccountNameChange = (newAccountName: string) => {
    setLocalAccountName(newAccountName)
    onAccountNameChange && onAccountNameChange(newAccountName)
  }

  return (
    <>
      <div className="mb-12 md:px-4">
        <div className="flex justify-between">
          <button onClick={onAllCurrentAccountsClick} className="flex items-center space-x-3">
            <Icon name="back/12" />
            <span className="hover:underline text-sm">All current accounts</span>
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
            <div className="flex group items-center space-x-2">
              <EditableContent
                initialValue={localAccountName}
                onChange={handleOnAccountNameChange}
              />
            </div>
            <div className="flex gap-6 mt-2">
              {account?.identifier.type === AccountIdentifierType.IBAN &&
              account.identifier.iban ? (
                <DisplayAndCopy name="IBAN" value={account.identifier.iban} />
              ) : account?.identifier.type === AccountIdentifierType.SCAN ? (
                <>
                  {account?.identifier.sortCode && (
                    <DisplayAndCopy name="SC" value={account?.identifier.sortCode} />
                  )}
                  {account?.identifier.accountNumber && (
                    <DisplayAndCopy name="AN" value={account?.identifier.accountNumber} />
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <AccountBalance
              availableBalance={account?.availableBalance ?? 0}
              balance={account?.balance ?? 0}
              currency={account?.currency ?? Currency.None}
            />

            {pendingPayments && pendingPayments.length > 0 && (
              <PendingPayments pendingPayments={pendingPayments} className="w-[400px]" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[10px] h-16 flex justify-between items-center px-3 mb-4">
        <DateRangePicker
          onDateChange={onDateChange}
          // Set first date to the first day of the year the merchant was created
          firstDate={merchantCreatedAt ? set(merchantCreatedAt, { month: 0, date: 1 }) : undefined}
        />

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

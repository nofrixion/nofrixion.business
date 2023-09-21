import {
  Account,
  AccountIdentifierType,
  BankSettings,
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
import AccountConnection from '../../atoms/AccountConnection/AccountConnection'
import DateRangePicker, { DateRange } from '../../DateRangePicker/DateRangePicker'
import RenewConnectionModal from '../../Modals/RenewConnectionModal/RenewConnectionModal'
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
  onRenewConnection?: (account: Account) => void
  banks?: BankSettings[]
  isConnectingToBank: boolean
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
  onRenewConnection,
  banks,
  isConnectingToBank,
}) => {
  const isExpired = account?.expiryDate && new Date(account.expiryDate) < new Date() ? true : false

  const bankLogo = banks?.find((bank) => bank.bankName === account?.bankName)?.logo

  const [isRenewConnectionModalOpen, setIsRenewConnectionModalOpen] = useState(false)

  const handleOnRenewConnectionClicked = () => {
    setIsRenewConnectionModalOpen(true)
  }

  const handleOnRenewConnection = () => {
    if (account) {
      onRenewConnection && onRenewConnection(account)
    }
  }

  const handleOnDismiss = () => {
    setIsRenewConnectionModalOpen(false)
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

        <div className="flex mt-6">
          {account && account.isConnectedAccount && bankLogo && (
            <div className="p-4 rounded-full bg-white h-fit mr-4">
              <img
                src={`https://cdn.nofrixion.com/img/banks/svg/${bankLogo}`}
                alt="bank logo"
                width={32}
                height={32}
              />
            </div>
          )}
          <div className="text-[28px]/8 font-semibold">
            <h2>{account?.accountName}</h2>
            <div className="flex gap-6 mt-2">
              {account?.identifier.type === AccountIdentifierType.IBAN &&
              account.identifier.iban ? (
                <DisplayAndCopy name="IBAN" value={account.identifier.iban} className="mt-0" />
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
            {account && account.isConnectedAccount && account.expiryDate && (
              <AccountConnection
                account={account}
                isExpired={isExpired}
                onRenewConnection={handleOnRenewConnectionClicked}
              />
            )}
          </div>

          <div className="flex flex-col items-end ml-auto">
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

      <RenewConnectionModal
        onApply={handleOnRenewConnection}
        open={isRenewConnectionModalOpen}
        onDismiss={handleOnDismiss}
        isConnectingToBank={isConnectingToBank}
      />

      <Toaster positionY="top" positionX="right" duration={3000} />
    </>
  )
}

export { AccountDashboard }

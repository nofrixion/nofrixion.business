import { Transaction, useTransactions } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import Card from '../components/ui/atoms/Card/Card'
import { NOFRIXION_API_URL } from '../lib/constants'
import { displayAmount, formatAmount, formatDate } from '../lib/formatters'
import { Account } from '../lib/types/localTypes'
import { cn } from '../lib/utils/utils'

interface AccountSummaryCardProps {
  className?: string
  account: Account
  onClick?: () => void
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({ account, className, onClick }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const { data: transactionsResponse, isLoading } = useTransactions(
    { accountId: account?.id, pageNumber: 1, pageSize: 3 },
    {
      apiUrl: NOFRIXION_API_URL,
    },
  )

  useEffect(() => {
    if (transactionsResponse?.status === 'success') {
      setTransactions(transactionsResponse.data.content)
    } else if (
      transactionsResponse?.status === 'error' &&
      transactionsResponse.error?.status === 401
    ) {
      console.error(transactionsResponse.error)
      console.log('Not authorized to see transactions info')
    }
  }, [transactionsResponse])

  return (
    <Card
      onClick={onClick}
      className={cn(
        'md:pb-6 w-[35rem] transition hover:shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] cursor-pointer',
        className,
      )}
    >
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className="text-[#00264D] text-base font-semibold mb-2 leading-5">
            {account.accountName}
          </span>
          <span className="text-[#73808C] text-xs leading-4">
            {account.currency == 'EUR' ? account.iban : account.accountNumber}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="text-[#00264D] text-[2rem] font-semibold tabular-nums leading-10 mb-2">
            {displayAmount(account.balance ?? 0, account.currency)}
          </div>
          <div className="text-[#00264D] text-sm ml-auto tabular-nums leading-4">
            Available {displayAmount(account.availableBalance ?? 0, account.currency)}
          </div>
        </div>
      </div>

      {!isLoading && (
        <div className="mt-4 md:mt-9 w-full">
          {transactions &&
            transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="text-[#73808C] text-[0.813rem] pr-9 w-32 leading-6">
                    {formatDate(new Date(transaction.transactionDate))}
                  </span>
                  <span className="text-[#00264D] text-[0.813rem]">
                    {transaction.counterparty.name ?? ''}
                  </span>
                </div>
                <span
                  className={cn(
                    'text-sm font-medium tabular-nums',
                    transaction.amount >= 0 ? 'text-[#29A37A]' : 'text-[#F32448]',
                  )}
                >
                  {formatAmount(transaction.amount)}
                </span>
              </div>
            ))}
        </div>
      )}
    </Card>
  )
}

export default AccountSummaryCard

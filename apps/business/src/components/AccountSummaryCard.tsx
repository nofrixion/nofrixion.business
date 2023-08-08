import { displayAmount, formatAmount, formatDate } from '../lib/formatters'
import { Transaction, useTransactions } from '@nofrixion/moneymoov'
import { Account } from '../lib/types/localTypes'
import { cn } from '../lib/utils/utils'
import { NOFRIXION_API_URL } from '../lib/constants'
import { useEffect, useState } from 'react'
import Card from '../components/ui/atoms/Card/Card'

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
        'md:biz-pb-6 biz-w-[35rem] biz-transition hover:biz-shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] biz-cursor-pointer',
        className,
      )}
    >
      <div className="biz-flex biz-justify-between biz-w-full">
        <div className="biz-flex biz-flex-col">
          <span className="biz-text-[#00264D] biz-text-base biz-font-semibold biz-mb-2 biz-leading-5">
            {account.accountName}
          </span>
          <span className="biz-text-[#73808C] biz-text-xs biz-leading-4">
            {account.currency == 'EUR' ? account.iban : account.accountNumber}
          </span>
        </div>
        <div className="biz-flex biz-flex-col">
          <div className="biz-text-[#00264D] biz-text-[2rem] biz-font-semibold biz-tabular-nums biz-leading-10 biz-mb-2">
            {displayAmount(account.balance ?? 0, account.currency)}
          </div>
          <div className="biz-text-[#00264D] biz-text-sm biz-ml-auto biz-tabular-nums biz-leading-4">
            Available {displayAmount(account.availableBalance ?? 0, account.currency)}
          </div>
        </div>
      </div>

      {!isLoading && (
        <div className="biz-mt-4 md:biz-mt-9 biz-w-full">
          {transactions &&
            transactions.map((transaction, index) => (
              <div key={index} className="biz-flex biz-justify-between biz-items-center">
                <div>
                  <span className="biz-text-[#73808C] biz-text-[0.813rem] biz-pr-9 biz-w-32 biz-leading-6">
                    {formatDate(new Date(transaction.transactionDate))}
                  </span>
                  <span className="biz-text-[#00264D] biz-text-[0.813rem]">
                    {transaction.counterparty.name ?? ''}
                  </span>
                </div>
                <span
                  className={cn(
                    'biz-text-sm biz-font-medium biz-tabular-nums',
                    transaction.amount >= 0 ? 'biz-text-[#29A37A]' : 'biz-text-[#F32448]',
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

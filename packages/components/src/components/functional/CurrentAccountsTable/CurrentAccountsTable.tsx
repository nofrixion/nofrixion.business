import {
  AccountIdentifierType,
  Pagination,
  Transaction,
  TransactionTypeValue,
  useTransactions,
} from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LocalTransaction } from '../../../types/LocalTypes'
import { TransactionsTable as UITransactionsTable } from '../../ui/organisms/TransactionsTable/TransactionsTable'

export interface CurrentAccountsTableProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  accountId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl: string // Example: "https://api.nofrixion.com/api/v1"
}

const CurrentAccountsTable = ({
  token,
  accountId,
  apiUrl = 'https://api.nofrixion.com/api/v1',
}: CurrentAccountsTableProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentAccountsTableMain token={token} accountId={accountId} apiUrl={apiUrl} />
    </QueryClientProvider>
  )
}

/**
 * This is the main component that will be rendered.
 */
const CurrentAccountsTableMain = ({ token, accountId, apiUrl }: CurrentAccountsTableProps) => {
  const { data: remoteTransactions } = useTransactions(
    { accountId },
    { apiUrl: apiUrl, authToken: token },
  )

  console.log(remoteTransactions?.status === 'success' ? remoteTransactions.data : 'error')

  if (remoteTransactions?.status === 'error') {
    return <div>TODO: REMOVE THIS</div>
  }

  const remoteTransactionsToLocal = (transactions: Transaction[]): LocalTransaction[] => {
    return transactions.map((transaction) => {
      return {
        date: new Date(transaction.transactionDate),
        destinationAccount: {
          name: transaction.counterparty.name,
          accountInfo:
            transaction.counterparty.identifier.type == AccountIdentifierType.IBAN
              ? transaction.counterparty.identifier.iban
              : transaction.counterparty.identifier.type == AccountIdentifierType.SCAN
              ? `${transaction.counterparty.identifier.sortCode} - ${transaction.counterparty.identifier.accountNumber}`
              : '',
        },
        amount: transaction.amount,
        balanceAfterTx: transaction.balance,
        reference: transaction.amount > 0 ? transaction.theirReference : transaction.yourReference,
        description: transaction.description,
        type: TransactionTypeValue[transaction.type],
      }
    })
  }

  const transactions = remoteTransactionsToLocal(
    remoteTransactions?.status == 'success' ? remoteTransactions?.data.content : [],
  )

  const pagination: Pagination = {
    pageNumber: remoteTransactions?.data.pageNumber ?? 0,
    pageSize: remoteTransactions?.data.pageSize ?? 0,
    totalPages: remoteTransactions?.data.totalPages ?? 0,
    totalSize: remoteTransactions?.data.totalSize ?? 0,
  }

  return <UITransactionsTable transactions={transactions} pagination={pagination} />
}

export default CurrentAccountsTable

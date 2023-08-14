import { Account as AccountModel, ApiResponse } from '@nofrixion/moneymoov'

import Account from './Account'
import CurrentAccountsHeader from './CurrentAccountsHeader '

export interface CurrentAccountsListProps {
  accounts: ApiResponse<AccountModel[]> | undefined
  onCreatePaymentAccount: () => void
  onAccountClick: () => void
}

const CurrentAcountsList = ({
  accounts,
  onCreatePaymentAccount,
  onAccountClick,
}: CurrentAccountsListProps) => {
  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <CurrentAccountsHeader onCreatePaymentAccount={onCreatePaymentAccount} />

      {accounts?.status === 'success' && accounts.data && (
        <div className="flex-row mb-8 md:mb-[68px]">
          {accounts.data.map((account, index) => (
            <Account key={index} account={account} onAccountClick={onAccountClick} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CurrentAcountsList

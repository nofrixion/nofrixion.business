import { Account, Account as AccountModel } from '@nofrixion/moneymoov'

import { useUserSettings } from '../../../../lib/stores/useUserSettingsStore'
import { Toaster } from '../../Toast/Toast'
import AccountCard from '../AccountCard'
import CurrentAccountsHeader from '../CurrentAccountsHeader/CurrentAccountsHeader'
import ExternalAccountCard from '../External/ExternalAccountCard'

export interface CurrentAccountsListProps {
  accounts: AccountModel[] | undefined
  onCreatePaymentAccount?: () => void
  onAccountClick?: (account: Account) => void
  onConnect: () => void
  onMaybeLater: () => void
}

const CurrentAcountsList = ({
  accounts,
  onCreatePaymentAccount,
  onAccountClick,
  onConnect,
  onMaybeLater,
}: CurrentAccountsListProps) => {
  const { userSettings } = useUserSettings()

  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <CurrentAccountsHeader onCreatePaymentAccount={onCreatePaymentAccount} />

      {accounts && (
        <div className="flex-row mb-8 md:mb-[68px]">
          {accounts
            .sort((a, b) => a.accountName?.localeCompare(b.accountName))
            .map((account, index) => (
              <AccountCard
                key={index}
                account={account}
                onClick={() => {
                  onAccountClick && onAccountClick(account)
                }}
              />
            ))}
        </div>
      )}

      {!userSettings?.connectMaybeLater && (
        <ExternalAccountCard onConnect={onConnect} onMaybeLater={onMaybeLater} />
      )}
      <Toaster positionY="top" positionX="right" duration={3000} />
    </div>
  )
}

export default CurrentAcountsList

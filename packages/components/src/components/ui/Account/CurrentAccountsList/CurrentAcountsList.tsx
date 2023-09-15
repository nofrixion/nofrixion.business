import { Account, Account as AccountModel, BankSettings } from '@nofrixion/moneymoov'
import { useState } from 'react'

import { useUserSettings } from '../../../../lib/stores/useUserSettingsStore'
import { ConnectBankModal } from '../../Modals/ConnectBankModal/ConnectBankModal'
import { Toaster } from '../../Toast/Toast'
import AccountCard from '../AccountCard'
import CurrentAccountsHeader from '../CurrentAccountsHeader/CurrentAccountsHeader'
import ExternalAccountCard from '../External/ExternalAccountCard'

export interface CurrentAccountsListProps {
  accounts: AccountModel[] | undefined
  onCreatePaymentAccount?: () => void
  onAccountClick?: (account: Account) => void
  onConnectToBank: (bank: BankSettings) => void
  onMaybeLater: () => void
  banks?: BankSettings[]
}

const CurrentAcountsList = ({
  accounts,
  onCreatePaymentAccount,
  onAccountClick,
  onConnectToBank,
  onMaybeLater,
  banks,
}: CurrentAccountsListProps) => {
  const { userSettings } = useUserSettings()
  const [isConnectBankModalOpen, setIsConnectBankModalOpen] = useState(false)

  const handleOnConnectClicked = () => {
    setIsConnectBankModalOpen(true)
  }

  const handleOnDismiss = () => {
    setIsConnectBankModalOpen(false)
  }

  const handleOnApply = (bank: BankSettings) => {
    onConnectToBank(bank)
    setIsConnectBankModalOpen(false)
  }

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
        <ExternalAccountCard
          onConnectClicked={handleOnConnectClicked}
          onMaybeLater={onMaybeLater}
        />
      )}
      <Toaster positionY="top" positionX="right" duration={3000} />

      <ConnectBankModal
        banks={banks}
        onApply={handleOnApply}
        open={isConnectBankModalOpen}
        onDismiss={handleOnDismiss}
      />
    </div>
  )
}

export default CurrentAcountsList

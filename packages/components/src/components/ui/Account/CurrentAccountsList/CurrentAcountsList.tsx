import { Account, BankSettings } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { useUserSettings } from '../../../../lib/stores/useUserSettingsStore'
import { Button, Icon } from '../../atoms'
import ConnectBankModal from '../../Modals/ConnectBankModal/ConnectBankModal'
import { Toaster } from '../../Toast/Toast'
import AccountCard from '../AccountCard'
import CurrentAccountsHeader from '../CurrentAccountsHeader/CurrentAccountsHeader'
import ExternalAccountConnectCard from '../External/ExternalAccountConnectCard'

export interface CurrentAccountsListProps {
  accounts: Account[] | undefined
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
  const [internalAccounts, setInternalAccounts] = useState<Account[]>([])
  const [externalAccounts, setExternalAccounts] = useState<Account[]>()
  const [externalAccountConnectDisabled, setExternalAccountConnectDisabled] = useState(false)

  const handleOnConnectClicked = () => {
    setIsConnectBankModalOpen(true)
  }

  const handleOnDismiss = () => {
    setIsConnectBankModalOpen(false)
    setExternalAccountConnectDisabled(false)
  }

  const handleOnApply = (bank: BankSettings) => {
    onConnectToBank(bank)
    // setIsConnectBankModalOpen(false)
    setExternalAccountConnectDisabled(true)
  }

  useEffect(() => {
    if (accounts) {
      setExternalAccounts(accounts.filter((account) => account.isConnectedAccount))
      setInternalAccounts(accounts.filter((account) => !account.isConnectedAccount))
    }
  }, [accounts])

  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <div className="flex">
        <CurrentAccountsHeader onCreatePaymentAccount={onCreatePaymentAccount} />
        {userSettings?.connectMaybeLater && (
          <Button
            variant={'secondary'}
            className="h-fit w-fit ml-auto"
            onClick={handleOnConnectClicked}
          >
            <Icon name="bank/16" className="mr-1" />
            Connect external account
          </Button>
        )}
      </div>
      {internalAccounts && (
        <div className="flex-row mb-8 md:mb-[68px]">
          {internalAccounts
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

      {/* External accounts list */}
      {externalAccounts && externalAccounts.length > 0 && (
        <div>
          <div className="flex ml-3 mb-16">
            <span className="leading-8 font-medium text-2xl md:text-[1.75rem]">
              Connected accounts
            </span>
            <Button
              variant={'secondary'}
              className="h-fit w-fit ml-auto"
              onClick={handleOnConnectClicked}
            >
              <Icon name="bank/16" className="mr-1" />
              Connect account
            </Button>
          </div>
          <div className="flex-row mb-8 md:mb-[68px]">
            {externalAccounts
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
        </div>
      )}

      {!userSettings?.connectMaybeLater && externalAccounts?.length === 0 && (
        <ExternalAccountConnectCard
          onConnectClicked={handleOnConnectClicked}
          onMaybeLater={onMaybeLater}
          disabled={externalAccountConnectDisabled}
        />
      )}

      <ConnectBankModal
        banks={banks}
        onApply={handleOnApply}
        open={isConnectBankModalOpen}
        onDismiss={handleOnDismiss}
      />

      <Toaster positionY="top" positionX="right" duration={3000} />
    </div>
  )
}

export default CurrentAcountsList

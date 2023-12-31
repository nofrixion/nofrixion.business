import { Account, BankSettings } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { useUserSettings } from '../../../../lib/stores/useUserSettingsStore'
import { SystemError } from '../../../../types/LocalTypes'
import { Button, Icon } from '../../atoms'
import ConnectBankModal from '../../Modals/ConnectBankModal/ConnectBankModal'
import RenewConnectionModal from '../../Modals/RenewConnectionModal/RenewConnectionModal'
import RevokeConnectionModal from '../../Modals/RevokeConnectionModal/RevokeConnectionModal'
import SystemErrorModal from '../../Modals/SystemErrorModal/SystemErrorModal'
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
  onRenewConnection?: (account: Account) => void
  onRevokeConnection?: (account: Account, revokeOnlyThisAccount: boolean) => void
  banks?: BankSettings[]
  isConnectingToBank: boolean
  areConnectedAccountsEnabled?: boolean
  systemError?: SystemError
  isSystemErrorOpen?: boolean
  onCloseSystemError?: () => void
}

const CurrentAcountsList = ({
  accounts,
  onCreatePaymentAccount,
  onAccountClick,
  onConnectToBank,
  onMaybeLater,
  onRenewConnection,
  onRevokeConnection,
  banks,
  isConnectingToBank,
  areConnectedAccountsEnabled = true,
  systemError,
  isSystemErrorOpen = false,
  onCloseSystemError,
}: CurrentAccountsListProps) => {
  const { userSettings } = useUserSettings()
  const [isConnectBankModalOpen, setIsConnectBankModalOpen] = useState(false)
  const [isRenewConnectionModalOpen, setIsRenewConnectionModalOpen] = useState(false)
  const [isRevokeConnectionModalOpen, setIsRevokeConnectionModalOpen] = useState(false)
  const [internalAccounts, setInternalAccounts] = useState<Account[]>([])
  const [externalAccounts, setExternalAccounts] = useState<Account[]>()
  const [externalAccountConnectDisabled, setExternalAccountConnectDisabled] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined)

  const handleOnConnectClicked = () => {
    setIsConnectBankModalOpen(true)
  }

  const handleOnDismiss = () => {
    setIsConnectBankModalOpen(false)
    setIsRenewConnectionModalOpen(false)
    setExternalAccountConnectDisabled(false)
    setIsRevokeConnectionModalOpen(false)
  }

  const handlOnCloseSystemErrorModal = () => {
    if (onCloseSystemError) {
      onCloseSystemError()
    }
  }

  const handleOnApply = (bank: BankSettings) => {
    onConnectToBank(bank)
    setExternalAccountConnectDisabled(true)
  }

  const handleOnRenewConnectionClicked = (account: Account) => {
    setSelectedAccount(account)
    setIsRenewConnectionModalOpen(true)
  }

  const handeOnRevokeConnectionClicked = (account: Account) => {
    setSelectedAccount(account)
    setIsRevokeConnectionModalOpen(true)
  }

  const handleOnRenewConnection = () => {
    if (!selectedAccount) return
    onRenewConnection && onRenewConnection(selectedAccount)
  }

  const handleOnRevokeConnection = (revokeOnlyThisAccount: boolean) => {
    if (!selectedAccount) return
    onRevokeConnection && onRevokeConnection(selectedAccount, revokeOnlyThisAccount)
    handleOnDismiss()
  }

  useEffect(() => {
    if (accounts) {
      setExternalAccounts(accounts.filter((account) => account.isConnectedAccount))
      setInternalAccounts(accounts.filter((account) => !account.isConnectedAccount))
    }
  }, [accounts])

  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      {internalAccounts && internalAccounts.length > 0 && (
        <>
          <div className="flex">
            <CurrentAccountsHeader onCreatePaymentAccount={onCreatePaymentAccount} />
            {areConnectedAccountsEnabled &&
              userSettings?.connectMaybeLater &&
              externalAccounts?.length === 0 && (
                <Button
                  variant={'secondary'}
                  className="h-fit w-fit ml-auto"
                  onClick={handleOnConnectClicked}
                >
                  <Icon name="bank/16" className="mr-1 stroke-[#454D54]" />
                  Connect external account
                </Button>
              )}
          </div>

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
        </>
      )}

      {/* External accounts list */}
      {areConnectedAccountsEnabled && externalAccounts && externalAccounts.length > 0 && (
        <div>
          <div className="flex ml-3 mb-16 items-center">
            <span className="leading-8 font-medium text-2xl md:text-[1.75rem]">
              Connected accounts
            </span>
            <Button
              variant={'secondary'}
              size="medium"
              className="h-fit w-fit ml-auto"
              onClick={handleOnConnectClicked}
            >
              <Icon name="bank/16" className="mr-2 stroke-[#454D54]" />
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
                  bankLogo={banks?.find((bank) => bank.bankName === account.bankName)?.logo}
                  onRenewConnection={handleOnRenewConnectionClicked}
                  onRevokeConnection={handeOnRevokeConnectionClicked}
                  className="pr-3"
                />
              ))}
          </div>
        </div>
      )}

      {areConnectedAccountsEnabled &&
        !userSettings?.connectMaybeLater &&
        externalAccounts?.length === 0 && (
          <ExternalAccountConnectCard
            onConnectClicked={handleOnConnectClicked}
            onMaybeLater={
              internalAccounts && internalAccounts.length > 0 ? onMaybeLater : undefined
            }
            disabled={externalAccountConnectDisabled}
          />
        )}

      {areConnectedAccountsEnabled && (
        <>
          <ConnectBankModal
            banks={banks}
            onApply={handleOnApply}
            open={isConnectBankModalOpen}
            onDismiss={handleOnDismiss}
            isConnectingToBank={isConnectingToBank}
          />

          <RenewConnectionModal
            onApply={handleOnRenewConnection}
            open={isRenewConnectionModalOpen}
            onDismiss={handleOnDismiss}
            isConnectingToBank={isConnectingToBank}
          />

          <RevokeConnectionModal
            account={selectedAccount}
            onApply={handleOnRevokeConnection}
            open={isRevokeConnectionModalOpen}
            onDismiss={handleOnDismiss}
          />
        </>
      )}

      {/* System error modal */}
      <SystemErrorModal
        open={isSystemErrorOpen}
        title={systemError?.title}
        message={systemError?.message}
        onDismiss={handlOnCloseSystemErrorModal}
      />

      <Toaster positionY="top" positionX="right" duration={3000} />
    </div>
  )
}

export default CurrentAcountsList

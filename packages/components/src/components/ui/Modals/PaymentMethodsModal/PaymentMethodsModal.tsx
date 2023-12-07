import { Account, BankSettings, Currency, PaymentMethodsDefaults } from '@nofrixion/moneymoov'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import BankIcon from '../../../../assets/icons/bank-icon.svg'
import BitcoinIcon from '../../../../assets/icons/bitcoin-icon-unavailable.svg'
import CardIcon from '../../../../assets/icons/card-icon.svg'
import ApplePayIcon from '../../../../assets/icons/wallet-icon.svg'
import { LocalPaymentMethodsFormValue } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatCurrency } from '../../../../utils/uiFormaters'
import Checkbox from '../../Checkbox/Checkbox'
import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'
import Select from '../../Select/Select'
import Switch from '../../Switch/Switch'
import AnimateHeightWrapper from '../../utils/AnimateHeight'

export interface PaymentMethodsModalProps extends BaseModalProps {
  amount: string
  currency: Currency
  minimumCurrencyAmount: number
  banks: BankSettings[]
  destinationAccounts: Account[]
  userDefaults?: PaymentMethodsDefaults
  onApply: (data: LocalPaymentMethodsFormValue) => void
  isPrefilledData: boolean
}

const PaymentMethodsModal = ({
  amount,
  currency,
  minimumCurrencyAmount,
  open,
  banks,
  destinationAccounts,
  userDefaults,
  onDismiss,
  onApply,
  isPrefilledData = false,
}: PaymentMethodsModalProps) => {
  const [isBankEnabled, setIsBankEnabled] = useState<boolean>(userDefaults?.pisp ?? true)
  const [isCardEnabled, setIsCardEnabled] = useState<boolean>(userDefaults?.card ?? true)
  const [isWalletEnabled, setIsWalletEnabled] = useState<boolean>(userDefaults?.wallet ?? true)
  const [isLightningEnabled, setIsLightningEnabled] = useState<boolean>(
    userDefaults?.lightning ?? false,
  )
  const [isDestinationAccountEnabled, setIsDestinationAccountEnabled] = useState<boolean>(
    userDefaults?.pispPriorityBank ?? false,
  )
  const [isPriorityBankEnabled, setIsPriorityBankEnabled] = useState<boolean>(
    userDefaults?.pispPriorityBank ?? false,
  )
  const [isCaptureFundsEnabled, setIsCaptureFundsEnabled] = useState<boolean>(
    !userDefaults?.cardAuthorizeOnly ?? true,
  )
  const [isDefault, setIsDefault] = useState<boolean>(!isPrefilledData && !!userDefaults)
  const [destinationAccount, setDestinationAccount] = useState<Account | undefined>()
  const [priorityBank, setPriorityBank] = useState<BankSettings | undefined>()
  const [currentState, setCurrentState] = useState<LocalPaymentMethodsFormValue>()
  const [applyEnabled, setApplyEnabled] = useState<boolean>(true)
  const [isDefaultChecked, setIsDefaultChecked] = useState<boolean>(false)

  /* Error alert states */
  const [showWalletOnlyAlert, setShowWalletOnlyAlert] = useState<boolean>(false)
  const [showPispAmountAlert, setShowPispAmountAlert] = useState<boolean>(false)
  const [showNoPaymentMethodAlert, setShowNoPaymentMethodAlert] = useState<boolean>(false)

  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  useEffect(() => {
    setApplyEnabled(
      (isBankEnabled && (!amount || Number(amount) >= minimumCurrencyAmount)) ||
        (!isBankEnabled && (isWalletEnabled || isCardEnabled || isLightningEnabled)),
    )

    const shouldShowPispAmountAlert = !!(
      isBankEnabled &&
      amount &&
      Number(amount) < minimumCurrencyAmount
    )
    const shouldShowWalletOnlyAlert =
      isWalletEnabled && !isCardEnabled && !isBankEnabled && !isLightningEnabled
    const shouldShowNoPaymentMethodAlert =
      !isWalletEnabled && !isCardEnabled && !isBankEnabled && !isLightningEnabled

    setShowPispAmountAlert(shouldShowPispAmountAlert)
    setShowWalletOnlyAlert(shouldShowWalletOnlyAlert)
    setShowNoPaymentMethodAlert(shouldShowNoPaymentMethodAlert)
  }, [
    isBankEnabled,
    isCardEnabled,
    isWalletEnabled,
    isLightningEnabled,
    isCaptureFundsEnabled,
    isPriorityBankEnabled,
    priorityBank,
    minimumCurrencyAmount,
    amount,
  ])

  useEffect(() => {
    if (userDefaults?.pispPriorityBank && userDefaults?.pispPriorityBankID) {
      const bank = banks.find((bank) => bank.bankID === userDefaults.pispPriorityBankID)
      setPriorityBank(bank)
      setIsPriorityBankEnabled(true)
    }
  }, [])

  useEffect(() => {
    setIsDestinationAccountEnabled(false)

    const newDestinationAccount = getDefaultDestinationAccount(destinationAccounts)
    setDestinationAccount(newDestinationAccount)

    // Send destination account new values to override the previous ones
    // as the state is not updated yet
    sendDataToParent({
      destinationAccount: undefined,
    })
  }, [currency])

  useEffect(() => {
    if (!isDestinationAccountEnabled) {
      setDefaultDestinationAccount(destinationAccounts)
    }
  }, [isDestinationAccountEnabled])

  useEffect(() => {
    if (isPriorityBankEnabled && !priorityBank) {
      setPriorityBank(banks[0])
    }
  }, [isPriorityBankEnabled])

  const getDefaultDestinationAccount = (destinationAccounts: Account[]): Account => {
    // Get accounts for the selected currency
    const filteredByCurrencyAccounts = destinationAccounts.filter(
      (acc) => acc.currency === currency,
    )

    // Check if there're default accounts for the selected currency
    const defaultAccounts = filteredByCurrencyAccounts.filter((acc) => acc.isDefault)

    return defaultAccounts.length > 0 ? defaultAccounts[0] : filteredByCurrencyAccounts[0]
  }

  const setDefaultDestinationAccount = (destinationAccounts: Account[]) => {
    // Get accounts for the selected currency
    const defaultAccount = getDefaultDestinationAccount(destinationAccounts)
    setDestinationAccount(defaultAccount)
  }

  const sendDataToParent = (data?: Partial<LocalPaymentMethodsFormValue>) => {
    const localData: LocalPaymentMethodsFormValue = {
      isBankEnabled,
      isCardEnabled,
      isWalletEnabled,
      isLightningEnabled,
      isCaptureFundsEnabled,
      isDestinationAccountEnabled,
      destinationAccount:
        isDestinationAccountEnabled && destinationAccount
          ? { id: destinationAccount.id, name: destinationAccount?.accountName }
          : undefined,
      priorityBank:
        isPriorityBankEnabled && priorityBank
          ? {
              id: priorityBank.bankID,
              name: priorityBank.bankName,
            }
          : undefined,
      isDefault: isDefaultChecked,
    }

    // Merge the data from the parent with the data from the child
    const mergedData = { ...localData, ...data }

    setCurrentState(mergedData)
    onApply(mergedData)
  }

  const handleOnDismiss = () => {
    onDismiss()

    // Reset to initial state
    if (currentState) {
      setIsDefault(currentState.isDefault)
      setIsBankEnabled(currentState.isBankEnabled)
      setIsCardEnabled(currentState.isCardEnabled)
      setIsWalletEnabled(currentState.isWalletEnabled)
      setIsLightningEnabled(currentState.isLightningEnabled)
      setIsCaptureFundsEnabled(currentState.isCaptureFundsEnabled)
      setIsPriorityBankEnabled(currentState.isBankEnabled)
      setIsDestinationAccountEnabled(currentState.isDestinationAccountEnabled)
      setDestinationAccount(
        destinationAccounts.find((acc) => acc.id === currentState.destinationAccount?.id) ??
          destinationAccount,
      )

      if (currentState.isBankEnabled && currentState.priorityBank) {
        const bank = banks.find((bank) => bank.bankID === currentState.priorityBank?.id)
        setPriorityBank(bank)
        setIsPriorityBankEnabled(true)
      } else {
        setPriorityBank(undefined)
        setIsPriorityBankEnabled(false)
      }
    } else {
      setIsDefault(isDefault)
      setIsBankEnabled(userDefaults?.pisp ?? true)
      setIsCardEnabled(userDefaults?.card ?? true)
      setIsWalletEnabled(userDefaults?.wallet ?? true)
      setIsLightningEnabled(userDefaults?.lightning ?? false)
      setIsCaptureFundsEnabled(!userDefaults?.cardAuthorizeOnly ?? true)
      setIsPriorityBankEnabled(userDefaults?.pispPriorityBank ?? false)
      setIsDestinationAccountEnabled(false)
      setDestinationAccount(undefined)

      if (userDefaults?.pispPriorityBank && userDefaults?.pispPriorityBankID) {
        const bank = banks.find((bank) => bank.bankID === userDefaults.pispPriorityBankID)
        setPriorityBank(bank)
        setIsPriorityBankEnabled(true)
      } else {
        setPriorityBank(undefined)
        setIsPriorityBankEnabled(false)
      }
    }
  }

  const handleOnUseAsDefaultChanged = (isDefaultChecked: boolean) => {
    setIsDefaultChecked(isDefaultChecked)
  }

  const ValidationAlert: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
      <div className="w-full p-3 mt-6 bg-warning-yellow rounded">
        <p className="text-sm text-default-text font-normal">{children}</p>
      </div>
    )
  }

  return (
    <CustomModal
      title="Payment methods"
      open={open}
      onDismiss={handleOnDismiss}
      onApply={() => sendDataToParent()}
      onApplyEnabled={applyEnabled}
      onUseAsDefaultChanged={handleOnUseAsDefaultChanged}
      buttonRowClassName={
        isWalletEnabled && !isCardEnabled && !isBankEnabled && !isLightningEnabled ? 'md:mt-6' : ''
      }
    >
      <div className="[&>*]:border-b [&>*]:border-solid [&>*]:border-b-border-grey text-sm">
        <Switch
          icon={ApplePayIcon}
          label="Apple Pay / Google Pay"
          value={isWalletEnabled}
          onChange={setIsWalletEnabled}
          className="pb-6 md:pb-4"
        />
        <div className="py-6 md:py-4">
          <Switch
            icon={BankIcon}
            label="Pay by Bank"
            value={isBankEnabled}
            onChange={setIsBankEnabled}
          />

          <AnimatePresence initial={false}>
            {isBankEnabled && destinationAccounts.length > 0 && (
              <AnimateHeightWrapper layoutId="checkbox-destination-account">
                <div className="pl-6 md:pl-10 pt-7">
                  <Checkbox
                    label="Change destination account"
                    infoText="This is the account where funds will be transferred for bank payments."
                    value={isDestinationAccountEnabled}
                    onChange={setIsDestinationAccountEnabled}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isBankEnabled && (
              <AnimateHeightWrapper layoutId="select-destination-account">
                <div className="pl-6 md:pl-[3.25rem] pt-4">
                  <Select
                    disabled={!isDestinationAccountEnabled}
                    options={destinationAccounts
                      .filter((acc) => acc.currency === currency)
                      .map((acc) => {
                        return {
                          value: acc.id,
                          label: acc.accountName,
                        }
                      })}
                    selected={
                      !destinationAccount
                        ? {
                            value: destinationAccounts[0].id,
                            label: destinationAccounts[0].accountName,
                          }
                        : {
                            value: destinationAccount.id,
                            label: destinationAccount.accountName,
                          }
                    }
                    onChange={(selectedOption) => {
                      setDestinationAccount(
                        destinationAccounts.find((acc) => acc.id === selectedOption.value) ??
                          getDefaultDestinationAccount(destinationAccounts),
                      )
                    }}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {isBankEnabled && banks.length > 0 && (
              <AnimateHeightWrapper layoutId="checkbox-priority-bank">
                <div
                  className={cn('pl-6 md:pl-10 md:pb-4', {
                    'pt-7': !destinationAccounts || destinationAccounts?.length === 0,
                    'pt-6': !destinationAccounts || destinationAccounts?.length > 0,
                  })}
                >
                  <Checkbox
                    label="Define a priority bank"
                    infoText="Select a priority bank to set it as the default payment option for users. This streamlines the payment process by displaying the preferred bank first."
                    value={isPriorityBankEnabled}
                    onChange={setIsPriorityBankEnabled}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isBankEnabled && isPriorityBankEnabled && (
              <AnimateHeightWrapper layoutId="select-priority-bank">
                <div className="pl-6 md:pl-[3.25rem] pt-4 md:pt-0">
                  <Select
                    options={banks.map((bank) => {
                      return {
                        value: bank.bankID,
                        label: bank.bankName,
                      }
                    })}
                    selected={
                      !priorityBank
                        ? {
                            value: banks[0].bankID,
                            label: banks[0].bankName,
                          }
                        : {
                            value: priorityBank.bankID,
                            label: priorityBank.bankName,
                          }
                    }
                    onChange={(selectedOption) => {
                      setPriorityBank(
                        banks.find((bank) => bank.bankID === selectedOption.value) ?? banks[0],
                      )
                    }}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
        </div>
        <div className="py-6 md:py-4">
          <Switch
            icon={CardIcon}
            label="Credit and debit card"
            value={isCardEnabled}
            onChange={setIsCardEnabled}
          />

          <AnimatePresence initial={false}>
            {isCardEnabled && (
              <AnimateHeightWrapper layoutId="card-capture-founds">
                <div className="ml-10 pt-7 md:pb-4">
                  <Checkbox
                    label="Don't capture funds on card payments"
                    infoText="Enable this option to authorize card payments without immediately capturing the funds. This allows for manual capture or cancellation before completing the transaction."
                    value={!isCaptureFundsEnabled}
                    onChange={(value) => setIsCaptureFundsEnabled(!value)}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
        </div>
        <div className="py-6 md:py-4 w-full select-none">
          <img src={BitcoinIcon} alt="Bitcoin Lightning" className="w-6 h-6 mr-4 inline-block" />
          <span className="align-middle pr-2 text-grey-text text-sm">
            Bitcoin Lightning (coming soon)
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <AnimatePresence>
          {showPispAmountAlert && (
            <AnimateHeightWrapper layout="position" layoutId="amount-pisp-alert">
              <ValidationAlert>
                The minimum amount for bank payments is {formatCurrency(currency)}
                {formatter.format(minimumCurrencyAmount)}. You must use another payment method for
                lower amounts.
              </ValidationAlert>
            </AnimateHeightWrapper>
          )}
          {showWalletOnlyAlert && (
            <AnimateHeightWrapper layout="position" layoutId="wallet-card-alert">
              <ValidationAlert>
                Do your customers have access to Apple Pay or Google Pay? If you are unsure, you may
                want to consider adding a second payment method as a backup.
              </ValidationAlert>
            </AnimateHeightWrapper>
          )}
          {showNoPaymentMethodAlert && (
            <AnimateHeightWrapper layout="position" layoutId="no-payment-methods-alert">
              <ValidationAlert>At least one payment method has to be enabled.</ValidationAlert>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </div>
    </CustomModal>
  )
}

export default PaymentMethodsModal

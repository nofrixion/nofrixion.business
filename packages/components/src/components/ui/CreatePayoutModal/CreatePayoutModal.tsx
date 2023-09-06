import { Currency } from '@nofrixion/moneymoov'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { LocalAccountIdentifierType } from '../../../types/LocalEnums'
import { LocalAccount, LocalBeneficiary, LocalCounterparty } from '../../../types/LocalTypes'
import { cn } from '../../../utils'
import { formatAmount } from '../../../utils/formatters'
import { formatCurrency } from '../../../utils/uiFormaters'
import { Button, Icon, Sheet, SheetContent } from '../atoms'
import InputAmountField from '../InputAmountField/InputAmountField'
import InputNumericTextField from '../InputNumericTextField/InputNumericTextField'
import InputTextAreaField from '../InputTextAreaField/InputTextAreaField'
import InputTextField from '../InputTextField/InputTextField'
import { Loader } from '../Loader/Loader'
import { SelectAccount } from '../molecules/Select/SelectAccount/SelectAccount'
import { SelectBeneficiary } from '../molecules/Select/SelectBeneficiary/SelectBeneficiary'

export interface CreatePayoutModalProps {
  onCreatePayout: (
    sourceAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    theirReference: string,
    yourReference?: string,
    description?: string,
  ) => Promise<void>
  onDismiss: () => void
  accounts: LocalAccount[]
  isOpen: boolean
  beneficiaries: LocalBeneficiary[]
}

const CreatePayoutModal: React.FC<CreatePayoutModalProps> = ({
  onCreatePayout,
  onDismiss,
  accounts,
  beneficiaries,
  isOpen,
}) => {
  const [isCreatePayoutButtonDisabled, setIsCreatePayoutButtonDisabled] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState('')
  const [payoutAmount, setPayoutAmount] = useState<string | undefined>('')
  const [reference, setReference] = useState<string | undefined>('')
  const [yourReference, setYourReference] = useState<string | undefined>('')
  const [description, setDescription] = useState<string | undefined>('')
  const [addManuallySelected, setAddManuallySelected] = useState<boolean>(false)
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<LocalBeneficiary | undefined>(
    undefined,
  )
  const [destinationAccountName, setDestinationAccountName] = useState<string | undefined>('')
  const [destinationAccountIBAN, setDestinationAccountIBAN] = useState<string | undefined>('')
  const [destinationAccountNumber, setDestinationAccountNumber] = useState<string | undefined>('')
  const [destinationAccountSortCode, setDestinationAccountSortCode] = useState<string | undefined>(
    '',
  )

  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const singleCurrency =
    accounts
      .map((item) => item.currency)
      .filter((value, index, self) => self.indexOf(value) === index).length === 1
      ? accounts
          .map((item) => item.currency)
          .filter((value, index, self) => self.indexOf(value) === index)[0]
      : undefined

  const [currency, setCurrency] = useState<Currency>(
    singleCurrency != undefined ? singleCurrency : Currency.EUR,
  )

  const [selectedAccount, setSelectedAccount] = useState<LocalAccount>(
    accounts?.filter((x) => x.currency === currency)[0],
  )

  const onCreatePayoutClick = async () => {
    setValidationErrorMessage('')
    const parsedAmount = Number(payoutAmount)
    if (parsedAmount < 0) {
      setValidationErrorMessage('The amount must be greater than 0.')
    } else if (parsedAmount === 0) {
      setValidationErrorMessage("The amount can't be 0.")
    } else if (
      (destinationAccountIBAN || (destinationAccountNumber && destinationAccountSortCode)) &&
      payoutAmount &&
      selectedAccount &&
      reference
    ) {
      setIsCreatePayoutButtonDisabled(true)
      let parsedAmount = Number(payoutAmount)
      parsedAmount = parsedAmount ?? 0

      const counterParty: LocalCounterparty = {
        name: destinationAccountName ?? '',
        identifier: selectedBeneficiary?.destination?.identifier ?? {
          iban: destinationAccountIBAN ?? '',
          accountNumber: destinationAccountNumber ?? '',
          sortCode: destinationAccountSortCode ?? '',
          type:
            currency === Currency.EUR
              ? LocalAccountIdentifierType.IBAN
              : LocalAccountIdentifierType.SCAN,
          currency: currency,
        },
      }

      await onCreatePayout(
        selectedAccount,
        counterParty,
        parsedAmount,
        reference,
        yourReference,
        description,
      )
      onDismiss()
    }
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  const onValidateDestinationAccountName = (destinationAccountName: string): string | undefined => {
    // Get invalid characters if any (using the same regex from backend "^['\.\-\/&\s]*?\w+['\.\-\/&\s\w]*$")
    // eslint-disable-next-line no-useless-escape
    const invalidCharacters = destinationAccountName.match(/^['\.\-\/&\s]*?\w+['\.\-\/&\s\w]*$/g)

    if (destinationAccountName.length > 0 && invalidCharacters) {
      // Singular
      if (invalidCharacters.length === 1) {
        return `The character "${invalidCharacters[0]}" is not allowed in the destination account name`
      }

      // Plural
      return `The characters "${invalidCharacters.join(
        '',
      )}" are not allowed in the destination account name`
    }
  }

  const onValidateDestinationAccountIBAN = (destinationAccountIBAN: string): string | undefined => {
    // Get invalid characters if any (using the same regex from backend "^['\.\-\/&\s]*?\w+['\.\-\/&\s\w]*$")
    // eslint-disable-next-line no-useless-escape
    const ibanReplaceRegex = /^[a-zA-Z]{2}[0-9]{2}([a-zA-Z0-9]){11,30}$/g

    if (destinationAccountIBAN.length > 0 && !ibanReplaceRegex.test(destinationAccountIBAN)) {
      return `The IBAN is not valid`
    }
  }

  const onValidateTheirReference = (theirReference: string): string | undefined => {
    const theirReferenceReplaceRegex = /[\\.\-/&\s]/g

    const cleanTheirReference = theirReference.replace(theirReferenceReplaceRegex, '')

    if (cleanTheirReference.length < 6) {
      return 'Reference must contain atleast 6 alphanumeric characters'
    }

    const theirReferenceMatchRegex = /^([^\W_]|[\\.\-/&\s]){6,}$/g

    // Get invalid characters if any (using the same regex from backend "^['\.\-\/&\s]*?\w+['\.\-\/&\s\w]*$")
    // eslint-disable-next-line no-useless-escape
    if (theirReference.length > 0 && !theirReferenceMatchRegex.test(theirReference)) {
      return 'Reference must contain only alphanumeric, space, hyphen(-), full stop (.), ampersand (&), and forward slash (/).'
    }
  }

  const onValidateYourReference = (yourReference: string): string | undefined => {
    const yourReferenceMatchRegex = /^[\w\-\s]*$/g

    // Get invalid characters if any (using the same regex from backend "^['\.\-\/&\s]*?\w+['\.\-\/&\s\w]*$")
    // eslint-disable-next-line no-useless-escape
    if (yourReference.length > 0 && !yourReferenceMatchRegex.test(yourReference)) {
      return 'Your reference must contain only alphanumeric, space, and hyphen(-).'
    }
  }

  const onCurrencyChange = (currency: string) => {
    setCurrency(currency as Currency.EUR | Currency.GBP)
    setSelectedAccount(accounts?.filter((x) => x.currency === currency)[0])
  }

  return (
    <>
      {accounts && (
        <Sheet open={isOpen} onOpenChange={handleOnOpenChange}>
          <SheetContent className="w-full lg:w-[37.5rem]">
            <div className="bg-white h-screen overflow-auto lg:w-[37.5rem] px-8 py-8">
              <div className="h-fit mb-[7.5rem] lg:mb-0">
                <button type="button" className="hover:cursor-pointer block" onClick={onDismiss}>
                  <Icon name="back/24" />
                </button>
                <span className="block text-2xl font-semibold text-default-text mt-8">
                  New payout
                </span>

                <div className="mt-12 md:flex w-64">
                  <div className="text-left">
                    <div>
                      <InputAmountField
                        currency={currency}
                        onCurrencyChange={onCurrencyChange}
                        allowCurrencyChange={singleCurrency ? false : true}
                        value={formatter.format(Number(payoutAmount))}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                      ></InputAmountField>
                    </div>
                    <AnimatePresence>
                      {validationErrorMessage && (
                        <motion.div
                          className="mt-6 bg-[#ffe6eb] text-sm p-3 rounded"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {validationErrorMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="w-[27rem]">
                  <div className="mt-10 flex-row items-baseline">
                    <div className="mb-2">
                      <span className="text-default-text font-semibold text-sm leading-4">
                        From account
                      </span>
                    </div>
                    <div>
                      {accounts.length > 1 ? (
                        <SelectAccount
                          className="text-right border border-border-grey md:w-[27rem]"
                          value={selectedAccount?.id}
                          onValueChange={(value) => {
                            setSelectedAccount(
                              accounts.find((account) => account.id === value) ??
                                accounts.filter((account) => account.currency === currency)[0],
                            )
                          }}
                          accounts={accounts.filter((account) => account.currency === currency)}
                        />
                      ) : (
                        <div className="flex gap-5">
                          <span className="font-semibold w-full break-words text-sm/5 break-keep">
                            {accounts[0].accountName}
                          </span>{' '}
                          <div className="text-[#73888C] text-sm font-normal flex flex-row gap-1 items-center">
                            <span>{formatCurrency(accounts[0].currency)}</span>
                            <span>{formatAmount(accounts[0].availableBalance)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {beneficiaries.length > 1 && (
                    <div
                      className={cn('mt-8 flex-row items-baseline', {
                        'mb-10': !addManuallySelected,
                      })}
                    >
                      <div className="md:w-[152px] mb-2">
                        <span className="text-sm font-semibold ">Destination account</span>
                      </div>
                      <div className="text-left">
                        <SelectBeneficiary
                          className="text-right border border-border-grey"
                          value={addManuallySelected ? 'addManually' : selectedBeneficiary?.id}
                          onValueChange={(value) => {
                            if (value === 'addManually') {
                              setSelectedBeneficiary(undefined)
                              setAddManuallySelected(true)
                            } else {
                              setAddManuallySelected(false)
                              setSelectedBeneficiary(
                                beneficiaries.find((beneficiary) => beneficiary.id === value) ??
                                  undefined,
                              )
                            }
                          }}
                          beneficiaries={beneficiaries}
                        />
                      </div>
                    </div>
                  )}

                  <AnimatePresence initial={false}>
                    {(beneficiaries?.length === 0 || addManuallySelected) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          marginTop: '32px',
                          marginBottom: '32px',
                          transition: { duration: 0.4 },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          marginTop: 0,
                          marginBottom: 0,
                          transition: { duration: 0.4 },
                        }}
                      >
                        <div className="items-baseline">
                          <div className="text-left">
                            <InputTextField
                              label="Destination account name"
                              maxLength={40}
                              value={destinationAccountName}
                              onChange={(e) => setDestinationAccountName(e.target.value)}
                              validation={onValidateDestinationAccountName}
                              placeholder="The person or company that owns the account"
                            />
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {currency === Currency.EUR && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{
                                opacity: 1,
                                height: 'auto',
                                marginTop: '32px',
                                transition: { duration: 0.4 },
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                                marginTop: 0,
                                transition: { duration: 0.4 },
                              }}
                              className="items-baseline"
                            >
                              <div className="text-left">
                                <InputTextField
                                  label="Destination account IBAN"
                                  value={destinationAccountIBAN}
                                  onChange={(e) =>
                                    setDestinationAccountIBAN(e.target.value.toUpperCase())
                                  }
                                  validation={onValidateDestinationAccountIBAN}
                                  placeholder='e.g. "GB29NWBK60161331926819"'
                                  required
                                  validateOnKeyDown
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <AnimatePresence initial={false}>
                          {currency === Currency.GBP && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{
                                opacity: 1,
                                height: 'auto',
                                marginTop: '32px',
                                transition: { duration: 0.4 },
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                                marginTop: 0,
                                transition: { duration: 0.4 },
                              }}
                              className="items-baseline"
                            >
                              <div className="text-left">
                                <InputNumericTextField
                                  label="Destination account number"
                                  maxLength={8}
                                  value={destinationAccountNumber}
                                  onChange={(e) => setDestinationAccountNumber(e.target.value)}
                                  placeholder='e.g. "12345678"'
                                  required
                                />
                              </div>
                              <div className="text-left mt-10">
                                <InputNumericTextField
                                  label="Destination account sort code"
                                  maxLength={6}
                                  value={destinationAccountSortCode}
                                  onChange={(e) => setDestinationAccountSortCode(e.target.value)}
                                  placeholder='e.g. "123456"'
                                  required
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={cn('items-baseline', { 'mt-10': beneficiaries?.length === 0 })}>
                    <div className="text-left">
                      <InputTextField
                        label="Their reference"
                        maxLength={currency === Currency.EUR ? 140 : 18}
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        validation={onValidateTheirReference}
                        subText="This is what the recipient is going to see."
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-10 items-baseline">
                    <div className="text-left">
                      <InputTextField
                        label="Your reference"
                        maxLength={50}
                        value={yourReference}
                        onChange={(e) => setYourReference(e.target.value)}
                        validation={onValidateYourReference}
                        subText="For internal use only."
                      />
                    </div>
                  </div>

                  <div className="mt-10 items-baseline">
                    <div className="text-left">
                      <InputTextAreaField
                        label="Description"
                        maxLength={140}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        validation={onValidateYourReference}
                        subText="For internal use only."
                        enableQuickValidation
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:mt-14 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
                  <Button
                    variant="primaryDark"
                    size="big"
                    className="disabled:!bg-grey-text disabled:!opacity-100 disabled:cursor-not-allowed"
                    onClick={onCreatePayoutClick}
                    disabled={isCreatePayoutButtonDisabled}
                  >
                    {isCreatePayoutButtonDisabled ? (
                      <Loader className="h-6 w-6 mx-auto" />
                    ) : (
                      <span>Create and approve</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default CreatePayoutModal

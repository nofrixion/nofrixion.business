// import { Currency } from '@nofrixion/moneymoov'
// import { AnimatePresence, motion } from 'framer-motion'
// import { useState } from 'react'

// import {
//   LocalAccount,
//   LocalCounterparty,
//   LocalPaymentAttempt,
//   LocalPaymentRequest,
// } from '../../../types/LocalTypes'
// import { localCurrency } from '../../../utils/constants'
// import { formatAmount } from '../../../utils/formatters'
// import { getMaxRefundableAmount } from '../../../utils/paymentAttemptsHelper'
// import { formatCurrency } from '../../../utils/uiFormaters'
// import { Button, Icon, Sheet, SheetContent } from '../atoms'
// import InputAmountField from '../InputAmountField/InputAmountField'
// import { Loader } from '../Loader/Loader'
// import { SelectAccount } from '../molecules/Select/SelectAccount/SelectAccount'
// import InputTextField from '../atoms/InputTextField/InputTextField'

// export interface InviteUserModalProps {
//   onInvite: (
//     firstName: string | undefined,
//     lastName: string | undefined,
//     emailAddress: string | undefined,
//   ) => Promise<void>
//   onDismiss: () => void
//   isOpen: boolean
// }

// const InviteUserModal: React.FC<InviteUserModalProps> = ({ onInvite, onDismiss, isOpen }) => {
//   const [isCreatePayoutButtonDisabled, setIsCreatePayoutButtonDisabled] = useState(false)
//   const [isCreateAndApproveButtonDisabled, setIsCreateAndApproveButtonDisabled] = useState(false)
//   const [amountValidationErrorMessage, setAmountValidationErrorMessage] = useState<
//     string | undefined
//   >(undefined)
//   const [accountValidationErrorMessage, setAccountValidationErrorMessage] = useState<
//     string | undefined
//   >(undefined)
//   const [beneficiaryValidationErrorMessage, setBeneficiaryValidationErrorMessage] = useState<
//     string | undefined
//   >(undefined)

//   const [formError, setFormError] = useState<string | undefined>(undefined)
//   const [payoutAmount, setPayoutAmount] = useState<string | undefined>('')
//   const [theirReference, setTheirReference] = useState<string | undefined>('')
//   const [yourReference, setYourReference] = useState<string | undefined>('')
//   const [description, setDescription] = useState<string | undefined>('')
//   const [addManuallySelected, setAddManuallySelected] = useState<boolean>(false)
//   const [selectedBeneficiary, setSelectedBeneficiary] = useState<LocalBeneficiary | undefined>(
//     undefined,
//   )
//   const [destinationAccountName, setDestinationAccountName] = useState<string | undefined>('')
//   const [firstName, setFirstName] = useState<string | undefined>(undefined)
//   const [lastName, setLastName] = useState<string | undefined>(undefined)
//   const [emailAddress, setEmailAddress] = useState<string | undefined>(undefined)
//   const [destinationAccountNumber, setDestinationAccountNumber] = useState<string | undefined>('')
//   const [destinationAccountSortCode, setDestinationAccountSortCode] = useState<string | undefined>(
//     '',
//   )

//   const [destinationAccountRequiredPrompt, setDestinationAccountRequiredPrompt] =
//     useState<boolean>(false)

//   const [createPayoutClicked, setCreatePayoutClicked] = useState<boolean>(false)

//   useEffect(() => {
//     if (!isOpen) {
//       resetFields()
//     }
//   }, [isOpen])

//   const singleCurrency =
//     accounts
//       .map((item) => item.currency)
//       .filter((value, index, self) => self.indexOf(value) === index).length === 1
//       ? accounts
//           .map((item) => item.currency)
//           .filter((value, index, self) => self.indexOf(value) === index)[0]
//       : undefined

//   const [currency, setCurrency] = useState<Currency | undefined>(
//     singleCurrency != undefined ? singleCurrency : Currency.EUR,
//   )

//   const [selectedAccount, setSelectedAccount] = useState<LocalAccount | undefined>(
//     accounts?.filter((x) => x.currency === currency)[0],
//   )

//   const theirReferenceMaxLength = currency === Currency.EUR ? 139 : 17

//   const balanceLessThanAmountMessage = "This account doesn't have enough funds for this transaction"

//   const beneficiaryDifferentCurrencyMessage =
//     'This account has a different currency than the chosen amount.'

//   const validateAmount = (amount: string, account: LocalAccount) => {
//     if (account && account.availableBalance < Number(amount)) {
//       setAccountValidationErrorMessage(balanceLessThanAmountMessage)
//     } else {
//       setAccountValidationErrorMessage(undefined)
//     }
//   }

//   const handleAmountOnChange = (value: string) => {
//     setPayoutAmount(value)
//     selectedAccount && validateAmount(value, selectedAccount)
//   }

//   const handleAccountOnChange = (value: string) => {
//     setAccountValidationErrorMessage(undefined)
//     const account = accounts.find((account) => account.id === value)

//     setSelectedAccount(account ?? accounts.filter((account) => account.currency === currency)[0])

//     if (account && account.availableBalance < Number(payoutAmount)) {
//       setAccountValidationErrorMessage(balanceLessThanAmountMessage)
//     }
//   }

//   const handleValidation = (): boolean => {
//     let validationFailed = false
//     setAmountValidationErrorMessage(undefined)
//     setDestinationAccountRequiredPrompt(false)
//     if (beneficiaries && beneficiaries.length > 0 && !selectedBeneficiary && !addManuallySelected) {
//       validationFailed = true
//       setDestinationAccountRequiredPrompt(true)
//     }

//     const parsedAmount = Number(payoutAmount)
//     if (parsedAmount < 0) {
//       validationFailed = true
//       setAmountValidationErrorMessage('The amount must be greater than 0.')
//     } else if (parsedAmount === 0) {
//       validationFailed = true
//       setAmountValidationErrorMessage("The amount can't be 0.")
//     }
//     if (
//       !(
//         (destinationAccountIBAN || (destinationAccountNumber && destinationAccountSortCode)) &&
//         payoutAmount &&
//         selectedAccount &&
//         theirReference
//       )
//     ) {
//       setFormError('Please fill all required fields')
//       validationFailed = true
//     } else {
//       setFormError(undefined)
//     }

//     const validateAccountNameMessage = onValidateDestinationAccountName(
//       destinationAccountName ?? '',
//     )

//     if (validateAccountNameMessage) {
//       validationFailed = true
//     }

//     if (currency === Currency.EUR) {
//       const validateAccountIBANMessage = onValidateDestinationAccountIBAN(
//         destinationAccountIBAN ?? '',
//       )

//       if (validateAccountIBANMessage) {
//         validationFailed = true
//       }
//     }

//     const validateTheirReferenceMessage = onValidateTheirReference(theirReference ?? '')

//     if (validateTheirReferenceMessage) {
//       validationFailed = true
//     }

//     const validateYourReferenceMessage = onValidateYourReference(yourReference ?? '')

//     if (validateYourReferenceMessage) {
//       validationFailed = true
//     }

//     if (selectedBeneficiary && selectedBeneficiary.currency !== currency) {
//       validationFailed = true
//     }

//     if (selectedAccount && selectedAccount.availableBalance < Number(payoutAmount)) {
//       validationFailed = true
//     }

//     return validationFailed
//   }

//   const onCreatePayoutClick = async (createAndApprove?: boolean) => {
//     setCreatePayoutClicked(true)
//     if (handleValidation()) {
//       return
//     } else {
//       if (!createAndApprove) {
//         setIsCreatePayoutButtonDisabled(true)
//       } else {
//         setIsCreateAndApproveButtonDisabled(true)
//       }
//       let parsedAmount = Number(payoutAmount)
//       parsedAmount = parsedAmount ?? 0

//       const counterParty: LocalCounterparty = {
//         name: destinationAccountName ?? '',
//         identifier: selectedBeneficiary?.destination?.identifier ?? {
//           iban: destinationAccountIBAN ?? '',
//           accountNumber: destinationAccountNumber ?? '',
//           sortCode: destinationAccountSortCode ?? '',
//           type:
//             currency && currency === Currency.EUR
//               ? LocalAccountIdentifierType.IBAN
//               : LocalAccountIdentifierType.SCAN,
//           currency: currency ? currency : Currency.EUR,
//         },
//       }

//       await onCreatePayout(
//         selectedAccount!,
//         counterParty,
//         parsedAmount,
//         theirReference!,
//         yourReference,
//         description,
//         createAndApprove,
//       )

//       setIsCreatePayoutButtonDisabled(false)
//       setIsCreateAndApproveButtonDisabled(false)
//     }
//   }
//   const resetFields = () => {
//     setPayoutAmount(undefined)
//     setTheirReference(undefined)
//     setYourReference(undefined)
//     setDescription(undefined)
//     setDestinationAccountName(undefined)
//     setDestinationAccountIBAN(undefined)
//     setDestinationAccountNumber(undefined)
//     setDestinationAccountSortCode(undefined)
//     setAddManuallySelected(false)
//     setSelectedBeneficiary(undefined)
//     setDestinationAccountRequiredPrompt(false)
//     setAmountValidationErrorMessage(undefined)
//     setAccountValidationErrorMessage(undefined)
//     setBeneficiaryValidationErrorMessage(undefined)
//     setFormError(undefined)
//     setCreatePayoutClicked(false)
//     setIsCreatePayoutButtonDisabled(false)
//     setIsCreateAndApproveButtonDisabled(false)
//   }

//   const handleOnOpenChange = (open: boolean) => {
//     if (!open) {
//       onDismiss()
//     }
//   }

//   const onValidateDestinationAccountName = (destinationAccountName: string): string | undefined => {
//     // eslint-disable-next-line no-useless-escape
//     const accountNameRegex = /^['\.\-\/&\s]*?\w+['\.\-\/&\s\w]*$/g

//     if (destinationAccountName.length > 0 && !accountNameRegex.test(destinationAccountName)) {
//       return `The account name is not valid`
//     }
//   }

//   const onValidateDestinationAccountIBAN = (destinationAccountIBAN: string): string | undefined => {
//     const ibanReplaceRegex = /^[a-zA-Z]{2}[0-9]{2}([a-zA-Z0-9]){11,30}$/g

//     if (destinationAccountIBAN.length > 0 && !ibanReplaceRegex.test(destinationAccountIBAN)) {
//       return `The IBAN is not valid. Please check for incorrectly entered characters.`
//     }

//     const bank = destinationAccountIBAN.slice(4) + destinationAccountIBAN.slice(0, 4)
//     const asciiShift = 55
//     const sb = []

//     for (const c of bank) {
//       let v
//       if (/[A-Z]/.test(c)) {
//         v = c.charCodeAt(0) - asciiShift
//       } else {
//         v = parseInt(c, 10)
//       }
//       sb.push(v)
//     }

//     const checkSumString = sb.join('')
//     let checksum = parseInt(checkSumString[0], 10)

//     for (let i = 1; i < checkSumString.length; i++) {
//       const v = parseInt(checkSumString.charAt(i), 10)
//       checksum = (checksum * 10 + v) % 97
//     }

//     if (checksum !== 1) {
//       return `The IBAN is not valid. Please check for incorrectly entered characters.`
//     }
//   }

//   const onValidateTheirReference = (theirReference: string): string | undefined => {
//     if (theirReference.length > theirReferenceMaxLength) {
//       return `Their reference is too long`
//     }
//     const theirReferenceReplaceRegex = /[\\.\-/&\s]/g

//     const cleanTheirReference = theirReference.replace(theirReferenceReplaceRegex, '')

//     if (cleanTheirReference.length < 6) {
//       return 'Reference must contain atleast 6 alphanumeric characters'
//     }

//     const theirReferenceMatchRegex = /^([^\W_]|[\\.\-/&\s]){6,}$/g

//     if (theirReference.length > 0 && !theirReferenceMatchRegex.test(theirReference)) {
//       return 'Reference must contain only alphanumeric, space, hyphen(-), full stop (.), ampersand (&), and forward slash (/).'
//     }
//   }

//   const onValidateYourReference = (yourReference: string): string | undefined => {
//     const yourReferenceMatchRegex = /^[\w\-\s]*$/g

//     if (yourReference.length > 0 && !yourReferenceMatchRegex.test(yourReference)) {
//       return 'Your reference must contain only alphanumeric, space, and hyphen(-).'
//     }
//   }

//   const onCurrencyChange = (currency: string) => {
//     if (!selectedBeneficiary) {
//       setDestinationAccountName('')
//       setDestinationAccountIBAN('')
//       setDestinationAccountNumber('')
//       setDestinationAccountSortCode('')
//     }
//     setCurrency(currency as Currency.EUR | Currency.GBP)
//     setSelectedAccount(accounts?.filter((x) => x.currency === currency)[0])
//     payoutAmount &&
//       validateAmount(payoutAmount, accounts?.filter((x) => x.currency === currency)[0])

//     if (selectedBeneficiary && selectedBeneficiary.currency !== currency) {
//       setBeneficiaryValidationErrorMessage(beneficiaryDifferentCurrencyMessage)
//     } else {
//       setBeneficiaryValidationErrorMessage(undefined)
//     }
//   }

//   const handleBeneficiaryOnChange = (value: string) => {
//     setDestinationAccountName('')
//     setDestinationAccountIBAN('')
//     setDestinationAccountNumber('')
//     setDestinationAccountSortCode('')
//     setBeneficiaryValidationErrorMessage(undefined)
//     setSelectedBeneficiary(undefined)

//     setDestinationAccountRequiredPrompt(false)
//     let beneficiary: LocalBeneficiary | undefined
//     if (value === 'addManually') {
//       setAddManuallySelected(true)
//     } else {
//       setAddManuallySelected(false)
//       beneficiary = beneficiaries.find((beneficiary) => beneficiary.id === value)
//       setSelectedBeneficiary(beneficiary ?? undefined)
//       setDestinationAccountName(beneficiary?.name ?? '')
//       setDestinationAccountIBAN(beneficiary?.destination?.identifier?.iban ?? '')
//       setDestinationAccountNumber(beneficiary?.destination?.identifier?.accountNumber ?? '')
//       setDestinationAccountSortCode(beneficiary?.destination?.identifier?.sortCode ?? '')
//     }

//     if (beneficiary && beneficiary.currency !== currency) {
//       setBeneficiaryValidationErrorMessage(beneficiaryDifferentCurrencyMessage)
//     }
//   }

//   return (
//     <>
//       <Sheet open={isOpen} onOpenChange={handleOnOpenChange}>
//         <SheetContent className="w-full lg:w-[37.5rem]">
//           <div className="bg-white h-screen overflow-auto lg:w-[37.5rem] px-8 py-8">
//             <div className="h-fit mb-[7.5rem] lg:mb-0">
//               <span className="block text-2xl font-semibold text-default-text mt-8">
//                 Invite user
//               </span>
//                       <div className="items-baseline mt-10">
//                         <div className="text-left">
//                           <InputTextField
//                             label="Account name"
//                             maxLength={40}
//                             value={destinationAccountName ?? ''}
//                             onChange={(value) => setDestinationAccountName(value)}
//                             warningValidation={onValidateDestinationAccountName}
//                             placeholder="The person or company that owns the account"
//                             required
//                             formSubmitted={createPayoutClicked}
//                             disabled={selectedBeneficiary ? true : false}
//                           />
//                         </div>
//                       </div>
//                             <div className="text-left mt-2">
//                               <InputTextField
//                                 label="First name"
//                                 value={firstName ?? ''}
//                                 onChange={(value) => setFirstName(value)}
//                               />
//                             </div>
//                             <div className="text-left mt-2">
//                             <InputTextField
//                                 label="Last name"
//                                 value={lastName ?? ''}
//                                 onChange={(value) => setLastName(value)}
//                               />
//                             </div>
//                             <div className="text-left mt-2">
//                             <InputTextField
//                                 label="Email address"
//                                 value={lastName ?? ''}
//                                 onChange={(value) => setLastName(value)}
//                               />
//                             </div>

//                 <div
//                   className={cn('items-baseline', {
//                     'mt-10': beneficiaries?.length === 0,
//                     'mt-8': beneficiaryValidationErrorMessage,
//                   })}
//                 >
//                   <div className="text-left">
//                     <InputTextField
//                       label="Their reference"
//                       maxLength={currency === Currency.EUR ? 139 : 17}
//                       value={theirReference ?? ''}
//                       onChange={(value) => setTheirReference(value)}
//                       warningValidation={onValidateTheirReference}
//                       subText="This is what the recipient is going to see."
//                       required
//                       formSubmitted={createPayoutClicked}
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-10 items-baseline">
//                   <div className="text-left">
//                     <InputTextField
//                       label="Your reference"
//                       maxLength={50}
//                       value={yourReference ?? ''}
//                       onChange={(value) => setYourReference(value)}
//                       warningValidation={onValidateYourReference}
//                       subText="For internal use only."
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-10 items-baseline">
//                   <div className="text-left">
//                     <InputTextAreaField
//                       label="Description"
//                       maxLength={140}
//                       value={description ?? ''}
//                       onChange={(e) => setDescription(e.target.value)}
//                       validation={onValidateYourReference}
//                       subText="For internal use only."
//                       enableQuickValidation
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:mt-14 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
//                 <div className="mb-4">
//                   <ValidationMessage label="form" variant="error" message={formError} />
//                 </div>
//                 <Button
//                   variant="primaryDark"
//                   size="big"
//                   className="disabled:!bg-grey-text disabled:!opacity-100 disabled:cursor-not-allowed"
//                   onClick={() => onCreatePayoutClick(true)}
//                   disabled={isCreateAndApproveButtonDisabled}
//                 >
//                   {isCreateAndApproveButtonDisabled ? (
//                     <Loader className="h-6 w-6 mx-auto" />
//                   ) : (
//                     <span>Create and authorise</span>
//                   )}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="big"
//                   className="disabled:!bg-grey-text disabled:!opacity-100 disabled:cursor-not-allowed mt-4"
//                   onClick={() => onCreatePayoutClick(false)}
//                   disabled={isCreatePayoutButtonDisabled}
//                 >
//                   {isCreatePayoutButtonDisabled ? (
//                     <Loader className="h-6 w-6 mx-auto" />
//                   ) : (
//                     <span>Save for later authorisation</span>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   )
// }

// export default InviteUserModal

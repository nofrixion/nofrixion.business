// import {
//   PayoutCreate,
//   Tag,
//   useAddTag,
//   useCreatePayout,
//   useCreateTag,
//   useDeleteTag,
//   usePaymentRequest,
//   usePaymentRequestsProps,
//   usePayoutsProps,
// } from '@nofrixion/moneymoov'
// import { useEffect, useState } from 'react'

// import {
//   LocalAccount,
//   LocalBeneficiary,
//   LocalCounterparty,
//   LocalPaymentRequest,
//   LocalPayout,
//   LocalTag,
// } from '../../../types/LocalTypes'
// import {
//   localCounterPartyToRemoteCounterParty,
//   parseLocalTagToApiTag,
//   remotePaymentRequestToLocalPaymentRequest,
// } from '../../../utils/parsers'
// import UICreatePayoutModal from '../../ui/CreatePayoutModal/CreatePayoutModal'
// import { makeToast } from '../../ui/Toast/Toast'

// export interface CreatePayoutModalProps {
//   token?: string // Example: "eyJhbGciOiJIUz..."
//   merchantId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
//   apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
//   isOpen: boolean // When true, the modal will be open. When false, the modal will be closed.
//   accounts: LocalAccount[]
//   beneficiaries: LocalBeneficiary[]
//   onDismiss: () => void // Callback function that will be called when the modal is asked to be closed.
//   onPayoutCreated: (payout: LocalPayout) => void // Callback function that will be called when the payment request is created.
// }

// const CreatePayoutModal = ({
//   token,
//   merchantId,
//   apiUrl = 'https://api.nofrixion.com/api/v1',
//   isOpen,
//   onDismiss,
//   onPayoutCreated,
//   accounts,
//   beneficiaries,
// }: CreatePayoutModalProps) => {
//   const [payout, setPayout] = useState<LocalPayout | undefined>(undefined)

//   const onModalDismiss = () => {
//     setPaymentRequest(undefined)
//     onDismiss()
//   }
//   const createPayout = useCreatePayout(token, merchantId, apiUrl);

//   const onCreatePayout = async (
//     sourceAccount: LocalAccount,
//     counterParty: LocalCounterparty,
//     amount: number,
//     theirReference: string,
//     yourReference?: string,
//     description?: string,
//   ) => {
//     const payoutCreate: PayoutCreate = {
//       accountID: sourceAccount.id,
//       amount: amount,
//       destination: localCounterPartyToRemoteCounterParty(counterParty),
//       theirReference: theirReference,
//       yourReference: yourReference,
//       description: description,
//   }

// }

//   return (
//     <UICreatePayoutModal
//       onDismiss={onModalDismiss}
//       isOpen={isOpen}
//       onCreatePayout={onCreatePayout}
//       accounts={accounts}
//       beneficiaries={beneficiaries}
//     />
//   )
// }

// export default CreatePayoutModal

import {
  AccountIdentifierType,
  Currency,
  PayoutCreate,
  useCreatePayout,
} from '@nofrixion/moneymoov'

import { LocalAccount, LocalBeneficiary, LocalCounterparty } from '../../../types/LocalTypes'
import { localCounterPartyToRemoteCounterParty } from '../../../utils/parsers'
import UICreatePayoutModal from '../../ui/CreatePayoutModal/CreatePayoutModal'
import { makeToast } from '../../ui/Toast/Toast'

export interface CreatePayoutModalProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  merchantId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  isOpen: boolean // When true, the modal will be open. When false, the modal will be closed.
  accounts: LocalAccount[]
  beneficiaries: LocalBeneficiary[]
  onDismiss: () => void // Callback function that will be called when the modal is asked to be closed.
}

const CreatePayoutModal = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  isOpen,
  onDismiss,
  accounts,
  beneficiaries,
}: CreatePayoutModalProps) => {
  const { createPayout } = useCreatePayout({ apiUrl: apiUrl, authToken: token })

  const onCreatePayout = async (
    sourceAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    theirReference: string,
    yourReference?: string,
    description?: string,
  ) => {
    const payoutCreate: PayoutCreate = {
      accountID: sourceAccount.id,
      amount: amount,
      destination: localCounterPartyToRemoteCounterParty(counterParty),
      theirReference: theirReference,
      yourReference: yourReference,
      description: description,
      type:
        sourceAccount.currency === Currency.EUR
          ? AccountIdentifierType.IBAN
          : AccountIdentifierType.SCAN,
      currency: sourceAccount.currency,
      allowIncomplete: false,
    }

    const response = await createPayout(payoutCreate)

    if (response.error) {
      makeToast('error', 'Could not create payout.')
    } else {
      makeToast('success', 'Payout created.')
      onDismiss()
    }
  }

  return (
    <UICreatePayoutModal
      onDismiss={onDismiss}
      isOpen={isOpen}
      onCreatePayout={onCreatePayout}
      accounts={accounts.sort((a, b) => (a.accountName > b.accountName ? 1 : -1))}
      beneficiaries={beneficiaries.sort((a, b) => (a.name > b.name ? 1 : -1))}
    />
  )
}

export default CreatePayoutModal

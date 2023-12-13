import {
  AccountIdentifierType,
  ApiError,
  Currency,
  PayoutCreate,
  UpdatePayoutProps,
  useCreatePayout,
  useUpdatePayout,
} from '@nofrixion/moneymoov'
import { useEffect, useRef, useState } from 'react'

import {
  LocalAccount,
  LocalBeneficiary,
  LocalCounterparty,
  LocalPayout,
} from '../../../types/LocalTypes'
import { localCounterPartyToRemoteCounterParty } from '../../../utils/parsers'
import UISavePayoutModal from '../../ui/organisms/SavePayoutModal/SavePayoutModal'
import { makeToast } from '../../ui/Toast/Toast'
import { PayoutAuthoriseForm } from '../../ui/utils/PayoutAuthoriseForm'

export interface SavePayoutModalProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  merchantId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  isOpen: boolean // When true, the modal will be open. When false, the modal will be closed.
  accounts: LocalAccount[]
  beneficiaries: LocalBeneficiary[]
  onDismiss: () => void // Callback function that will be called when the modal is asked to be closed.
  isUserAuthoriser: boolean
  selectedPayout?: LocalPayout // Payout that's been currently edited. This serves as a create/edit toggle.
}

const SavePayoutModal = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  isOpen,
  onDismiss,
  accounts,
  beneficiaries,
  isUserAuthoriser,
  selectedPayout,
}: SavePayoutModalProps) => {
  const { createPayout } = useCreatePayout({ apiUrl: apiUrl, authToken: token })
  const { updatePayout } = useUpdatePayout({ apiUrl: apiUrl, authToken: token })

  const [payoutID, setPayoutID] = useState<string | undefined>(selectedPayout?.id)

  const approveFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (payoutID !== undefined) {
      approveFormRef.current?.submit()
    }
  }, [payoutID])

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const onCreatePayout = async (
    sourceAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    theirReference: string,
    yourReference?: string,
    description?: string,
    createAndApprove?: boolean,
    scheduled?: boolean,
    scheduleDate?: Date,
    beneficiaryID?: string,
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
      scheduled: scheduled,
      scheduleDate: scheduleDate,
      beneficiaryID: beneficiaryID,
    }

    const response = await createPayout(payoutCreate)

    if (response.status === 'error') {
      return response.error
    } else {
      if (createAndApprove) {
        setPayoutID(response.data.id)
      }

      if (!createAndApprove) {
        makeToast('success', 'Payout saved for later approval.')
      }

      if (createAndApprove) {
        await sleep(10000).then(() => {
          return {
            title: 'Payout authorisation error',
            detail: 'Could not redirect to approve payout. Please try again.',
          } as ApiError
        })
      }

      onDismiss()
    }
  }

  const onUpdatePayout = async (
    sourceAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    theirReference: string,
    yourReference?: string,
    description?: string,
    updateAndApprove?: boolean,
    scheduled?: boolean,
    scheduleDate?: Date,
    beneficiaryID?: string,
  ) => {
    if (!selectedPayout?.id) {
      makeToast('error', 'Must select a payout to edit.')
      return
    }

    const payoutUpdate: UpdatePayoutProps = {
      payoutID: selectedPayout.id,
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
      scheduled: scheduled,
      scheduleDate: scheduleDate,
      beneficiaryID: beneficiaryID,
    }

    const response = await updatePayout(payoutUpdate)

    if (response.error) {
      return response.error
    } else {
      if (updateAndApprove) {
        setPayoutID(selectedPayout.id)
      }

      if (!updateAndApprove) {
        makeToast('success', 'Payout details successfully updated.')
      }

      if (updateAndApprove) {
        await sleep(10000).then(() => {
          return {
            title: 'Payout authorisation error',
            detail: 'Could not redirect to approve payout. Please try again.',
          } as ApiError
        })
      }

      onDismiss()
    }
  }

  return (
    <>
      <UISavePayoutModal
        onDismiss={onDismiss}
        isOpen={isOpen}
        onCreatePayout={onCreatePayout}
        onUpdatePayout={onUpdatePayout}
        accounts={accounts.sort((a, b) => (a.accountName > b.accountName ? 1 : -1))}
        beneficiaries={beneficiaries.sort((a, b) => (a.name > b.name ? 1 : -1))}
        isUserAuthoriser={isUserAuthoriser}
        selectedPayout={selectedPayout}
      />

      {payoutID && (
        <PayoutAuthoriseForm
          id={payoutID}
          size="x-small"
          formRef={approveFormRef}
          className="hidden"
        />
      )}
    </>
  )
}

export default SavePayoutModal

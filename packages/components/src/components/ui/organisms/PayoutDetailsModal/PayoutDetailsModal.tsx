import { Currency, PayoutStatus } from '@nofrixion/moneymoov'

import { LocalPayout, LocalTag } from '../../../../types/LocalTypes'
import { formatAmountAndDecimals, formatDateWithYear } from '../../../../utils/formatters'
import { payoutStatusToStatus } from '../../../../utils/parsers'
import { formatCurrency } from '../../../../utils/uiFormaters'
import { Button, Sheet, SheetContent } from '../../../ui/atoms'
import { Status } from '../../molecules'
import AccountDetails from '../../molecules/Account/AccountDetails'
import ConfrimButton from '../../molecules/ConfirmButton/ConfirmButton'
import TagManager from '../../Tags/TagManager/TagManager'
import { PayoutAuthoriseForm } from '../../utils/PayoutAuthoriseForm'

export interface PayoutDetailsModalProps {
  payout?: LocalPayout
  merchantTags: LocalTag[]
  open: boolean
  onDismiss: () => void
  onTagAdded: (tag: LocalTag) => void
  onTagRemoved: (id: string) => void
  onTagCreated: (tag: LocalTag) => void
  onScheduleCancelled: () => void
  isUserAuthoriser: boolean
}

const PayoutDetailsModal = ({
  payout,
  merchantTags,
  open,
  onDismiss,
  onTagAdded,
  onTagRemoved,
  onTagCreated,
  onScheduleCancelled,
  isUserAuthoriser,
}: PayoutDetailsModalProps) => {
  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  const { amountValueWithCommas, amountDecimals } = formatAmountAndDecimals(payout?.amount ?? 0)

  return (
    <Sheet open={open} onOpenChange={handleOnOpenChange}>
      <SheetContent
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
        className="w-full lg:w-[37.5rem] outline-none"
      >
        <div className="bg-white max-h-full h-full">
          {payout && (
            <>
              {payout && payout.status === PayoutStatus.PENDING_APPROVAL && (
                <div className="flex bg-main-grey h-[72px] justify-end space-x-4 pr-8">
                  <div className="mt-4">
                    <Button variant={'secondary'} size={'medium'} onClick={onDismiss}>
                      Edit payout
                    </Button>
                  </div>
                  <div className="mt-4">
                    {isUserAuthoriser && payout && (
                      <PayoutAuthoriseForm id={payout?.id} size={'medium'} />
                    )}
                  </div>
                </div>
              )}
              {isUserAuthoriser && payout && payout.status === PayoutStatus.SCHEDULED && (
                <div className="flex bg-main-grey h-[72px] justify-end space-x-4 pr-8">
                  <div className="mt-4">
                    <ConfrimButton
                      variant={'secondary'}
                      size={'medium'}
                      primaryText="Cancel schedule"
                      confirmText="Click again to confirm"
                      onConfirm={onScheduleCancelled}
                      className="w-[169px]"
                    />
                  </div>
                </div>
              )}
              <div className="flex pt-10 mx-8 justify-between items-center">
                <span className="text-[2rem] font-semibold leading-8 text-default-text tabular-nums pt-1">
                  {formatCurrency(payout?.currency ?? Currency.EUR)}
                  {amountValueWithCommas}
                  <sup className="ml-0.5 text-xl">.{amountDecimals}</sup>
                </span>

                <Status size="large" variant={payoutStatusToStatus(payout.status)} />
              </div>
              <div className="mt-16 mx-8 w-11/12">
                <div className="flex text-sm">
                  <div className="text-grey-text w-1/3">From account</div>
                  <div>
                    <AccountDetails
                      accountName={payout.sourceAccountName}
                      accountNumber={
                        payout.sourceAccountIban ??
                        payout.sourceAccountNumber + ' ' + payout.sourceAccountSortCode
                      }
                    />
                  </div>
                </div>

                <div className="flex text-sm mt-8">
                  <div className="text-grey-text w-1/3">To account</div>
                  <div>
                    <AccountDetails
                      accountName={payout.destination?.name}
                      accountNumber={
                        payout.destination?.identifier?.iban ??
                        payout.destination?.identifier?.accountNumber +
                          ' ' +
                          payout.destination?.identifier?.sortCode
                      }
                    />
                  </div>
                </div>
                {payout.scheduleDate && (
                  <div className="flex text-sm mt-8">
                    <div className="text-grey-text w-1/3">Payment date</div>
                    <div>{formatDateWithYear(new Date(payout.scheduleDate))}</div>
                  </div>
                )}
                {payout.theirReference && (
                  <div className="flex text-sm mt-8">
                    <div className="text-grey-text w-1/3">Their reference</div>
                    <div>{payout.theirReference}</div>
                  </div>
                )}
                {payout.yourReference && (
                  <div className="flex text-sm mt-8">
                    <div className="text-grey-text w-1/3">Your reference</div>
                    <div>{payout.yourReference}</div>
                  </div>
                )}
                {payout.description && (
                  <div className="flex text-sm mt-8">
                    <div className="text-grey-text w-1/3">Description</div>
                    <div className="w-2/3">{payout.description}</div>
                  </div>
                )}
                <div className="flex text-sm mt-8">
                  <div className="text-grey-text w-1/3">Tags</div>
                  <div className="w-2/3">
                    <TagManager
                      availableTags={merchantTags}
                      tags={payout.tags}
                      onAdded={onTagAdded}
                      onRemoved={onTagRemoved}
                      onCreated={onTagCreated}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default PayoutDetailsModal

import { Currency } from '@nofrixion/moneymoov'

import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes'
import AmountPaid from '../AmountPaid/AmountPaid'
import Contact from '../Contact/Contact'
import { CopyLink } from '../CopyLink/CopyLink'
import DetailsTabs from '../DetailsTabs/DetailsTabs'
import StatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge'
import QRCode from '../QRCode/QRCode'
import TagManager from '../Tags/TagManager/TagManager'

export interface PaymentRequestDetailsProps {
  paymentRequest: LocalPaymentRequest
  merchantTags: LocalTag[]
  hostedPaymentLink: string
  onRefund: (paymentAttempt: LocalPaymentAttempt) => void
  onVoid: (paymentAttempt: LocalPaymentAttempt) => void
  onCapture: (paymentAttempt: LocalPaymentAttempt) => void
  onTagAdded: (tag: LocalTag) => void
  onTagRemoved: (id: string) => void
  onTagCreated: (tag: LocalTag) => void
}

const PaymentRequestDetails = ({
  paymentRequest,
  merchantTags,
  hostedPaymentLink,
  onRefund,
  onVoid,
  onCapture,
  onTagAdded,
  onTagRemoved,
  onTagCreated,
}: PaymentRequestDetailsProps) => {
  return (
    <>
      <div className="bg-[#F6F9F9] px-6 lg:pl-8 lg:pr-7 relative mb-[4.875rem]">
        <div className="flex justify-between pb-[2.625rem] pt-6">
          <Contact
            name={paymentRequest.contact.name}
            email={paymentRequest.contact.email}
            size="large"
          />

          <QRCode url={hostedPaymentLink} />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 w-[92%]">
          <CopyLink link={hostedPaymentLink}></CopyLink>
        </div>
      </div>
      <div className="px-6 pb-16 lg:pb-8">
        <div className="flex flex-col-reverse mb-4 lg:mb-10 gap-4 lg:gap-0 lg:flex-row lg:justify-between">
          <div className="lg:w-1/3">
            <AmountPaid
              amountPaid={paymentRequest.amountReceived - paymentRequest.amountRefunded}
              totalAmount={paymentRequest.amount}
              currency={paymentRequest.currency === Currency.EUR ? Currency.EUR : Currency.GBP}
              partialPaymentMethod={paymentRequest.partialPaymentMethod}
            />
          </div>
          <div>
            <StatusBadge status={paymentRequest.status} size="large"></StatusBadge>
          </div>
        </div>
        <div className="mb-[2.625rem]">
          {(paymentRequest.productOrService || paymentRequest.description) && (
            <div className="flex flex-col gap-2 lg:gap-4 mb-6 lg:mb-8">
              {paymentRequest.productOrService && (
                <span className="text-base leading-[1.188rem] font-medium">
                  {paymentRequest.productOrService}
                </span>
              )}
              {paymentRequest.description && (
                <span className="text-sm leading-[1.313rem] font-normal text-grey-text">
                  {paymentRequest.description}
                </span>
              )}
            </div>
          )}
          <div>
            <TagManager
              availableTags={merchantTags}
              tags={paymentRequest.tags}
              onAdded={onTagAdded}
              onRemoved={onTagRemoved}
              onCreated={onTagCreated}
            />
          </div>
        </div>
        <div className="pb-6">
          <DetailsTabs
            paymentRequest={paymentRequest}
            onRefund={onRefund}
            onVoid={onVoid}
            onCapture={onCapture}
          ></DetailsTabs>
        </div>
      </div>
    </>
  )
}

export default PaymentRequestDetails

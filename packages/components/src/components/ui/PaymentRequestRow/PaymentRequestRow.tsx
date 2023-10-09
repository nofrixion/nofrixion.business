import classNames from 'classnames'
import { animate, AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { LocalPaymentMethodTypes } from '../../../types/LocalEnums'
import { LocalPaymentRequest } from '../../../types/LocalTypes'
import { formatAmount } from '../../../utils/formatters'
import { formatCurrency } from '../../../utils/uiFormaters'
import Contact from '../Contact/Contact'
import Created from '../Created/Created'
import PaymentRequestActionMenu from '../PaymentRequestActionMenu/PaymentRequestActionMenu'
import PaymentRequestAttemptsCell from '../PaymentRequestAttemptsCell/PaymentRequestAttemptsCell'
import StatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge'
import TagList from '../Tags/TagList/TagList'

export interface PaymentRequestRowProps extends LocalPaymentRequest {
  onClick?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
  onDuplicate?: () => void
  onCopyLink?: () => void
  onDelete?: () => void
  onOpenPaymentPage?: () => void
  selected: boolean
}

const commonTdClasses = 'px-4 py-3'

const Row = ({
  id,
  status,
  createdAt,
  amount,
  currency,
  tags,
  onClick,
  onDuplicate,
  onCopyLink,
  onDelete,
  onOpenPaymentPage,
  selected,
  customerName,
  title,
  createdByUser,
  merchantTokenDescription,
  paymentAttempts,
  hostedPayCheckoutUrl,
}: PaymentRequestRowProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const onDeletePaymentRequestClicked = async () => {
    setIsDeleting(true)
    animate(`.custom-backdrop-blur-${id}`, { opacity: 0.2 }, { duration: 0.2 })
  }

  const onCancelDeletingPaymentRequestClicked = async () => {
    setIsDeleting(false)
    animate(`.custom-backdrop-blur-${id}`, { opacity: 1 }, { duration: 0.2 })
  }

  const onConfirmDeletePaymentRequestClicked = async () => {
    onDelete && onDelete()
    await onCancelDeletingPaymentRequestClicked()
  }

  const getPaymentAttemptCountByStatus = (paymentStatus: 'received' | 'pending' | 'failed') => {
    return paymentAttempts.filter((attempt) => attempt.paymentStatus === paymentStatus).length
  }

  const getPaymentAttemptPaymentMethod = () => {
    const paymentMethods = paymentAttempts
      .map((attempt) => attempt.paymentMethod)
      .filter((paymentMethod, index, array) => {
        return array.indexOf(paymentMethod) === index
      })

    return paymentMethods.length > 1 || paymentMethods.length === 0
      ? LocalPaymentMethodTypes.None
      : paymentMethods[0]
  }

  return (
    <tr
      className={classNames(
        'relative border-b border-[#F1F2F3] cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]',
        {
          'bg-[#F6F8F9] border-[#E1E5EA]': selected,
        },
      )}
      onClick={onClick}
    >
      <td className={classNames(commonTdClasses, `pl-4 py-0`)}>
        <AnimatePresence>
          {isDeleting && (
            <motion.div
              className={`flex absolute z-10 items-center left-0 top-0 bottom-0 my-auto w-full`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ml-auto mr-11 space-x-1">
                <button
                  className="bg-negative-red rounded px-5 py-2 text-white font-normal text-sm hover:bg-darker-negative-red"
                  onClick={onConfirmDeletePaymentRequestClicked}
                >
                  Delete
                </button>
                <button
                  className="bg-white rounded px-5 py-2 text-default-text font-normal text-sm hover:text-grey-text"
                  onClick={onCancelDeletingPaymentRequestClicked}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`custom-backdrop-blur-${id}`}>
          <StatusBadge status={status} />
        </div>
      </td>

      <td className={classNames(commonTdClasses, `text-13px custom-backdrop-blur-${id}`)}>
        <Created
          createdAt={createdAt}
          createdByMerchantTokenDescription={merchantTokenDescription}
          createdByUser={createdByUser}
        />
      </td>

      <td className={classNames(commonTdClasses, `text-13px custom-backdrop-blur-${id}`)}>
        <Contact name={customerName} email={title} size="small" />
      </td>

      <td
        className={classNames(
          commonTdClasses,
          `text-right truncate tabular-nums custom-backdrop-blur-${id}`,
        )}
      >
        <span className="font-medium">
          {formatCurrency(currency)} {formatAmount(amount)}
        </span>
      </td>

      <td className={classNames(commonTdClasses, `custom-backdrop-blur-${id}`)}>
        <PaymentRequestAttemptsCell
          successfulAttemptsCount={getPaymentAttemptCountByStatus('received')}
          pendingAttemptsCount={getPaymentAttemptCountByStatus('pending')}
          failedAttemptsCount={getPaymentAttemptCountByStatus('failed')}
          hostedPaymentLink={hostedPayCheckoutUrl}
          paymentMethod={getPaymentAttemptPaymentMethod()}
        />
      </td>

      <td className={classNames(commonTdClasses, `text-right pr-1.5 custom-backdrop-blur-${id}`)}>
        <TagList labels={tags.map((tag) => tag.name)} />
      </td>

      <td className={`pr-2 w-8 custom-backdrop-blur-${id}`}>
        <PaymentRequestActionMenu
          onDuplicate={onDuplicate}
          onCopyLink={onCopyLink}
          onDelete={onDelete ? onDeletePaymentRequestClicked : undefined}
          onBlur={onCancelDeletingPaymentRequestClicked}
          onOpenPaymentPage={onOpenPaymentPage}
        />
      </td>
    </tr>
  )
}

export default Row

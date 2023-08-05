import * as React from "react";
const { useState } = React;
import { cn } from "@nofrixion/utils";
import { LocalPaymentRequest } from "@nofrixion/utils/types";
import { formatAmount, formatDate } from "@nofrixion/utils";
import { Chip } from "./Chip";
import { Contact } from "./Contact";
import { PaymentRequestStatusBadge as StatusBadge } from "./PaymentRequestStatusBadge";
import { PaymentRequestActionMenu } from "./PaymentRequestActionMenu";
import { animate, AnimatePresence, motion } from "framer-motion";

interface PaymentRequestRowProps extends LocalPaymentRequest {
  onClick?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  onDuplicate?: () => void;
  onCopyLink?: () => void;
  onDelete?: () => void;
  onOpenPaymentPage?: () => void;
  selected: boolean;
}

const commonTdClasses = "px-4 py-3";

export const PaymentRequestRow: React.FC<PaymentRequestRowProps> = ({
  id,
  status,
  createdAt,
  contact,
  amount,
  currency,
  tags,
  onClick,
  onDuplicate,
  onCopyLink,
  onDelete,
  onOpenPaymentPage,
  selected,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeletePaymentRequestClicked = async () => {
    setIsDeleting(true);
    animate(`.custom-backdrop-blur-${id}`, { opacity: 0.2 }, { duration: 0.2 });
  };

  const onCancelDeletingPaymentRequestClicked = async () => {
    setIsDeleting(false);
    animate(`.custom-backdrop-blur-${id}`, { opacity: 1 }, { duration: 0.2 });
  };

  const onConfirmDeletePaymentRequestClicked = async () => {
    onDelete && onDelete();
    await onCancelDeletingPaymentRequestClicked();
  };

  return (
    <tr
      className={cn(
        "relative border-b border-[#F1F2F3] cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]",
        {
          "bg-[#F6F8F9] border-[#E1E5EA]": selected,
        },
      )}
      onClick={onClick}
    >
      <td className={cn(commonTdClasses, `pl-4 py-0`)}>
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
                  className="bg-negativeRed rounded px-5 py-2 text-white font-normal text-sm hover:bg-darkerNegativeRed"
                  onClick={onConfirmDeletePaymentRequestClicked}
                >
                  Delete
                </button>
                <button
                  className="bg-white rounded px-5 py-2 text-default-text font-normal text-sm hover:text-greyText"
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

      <td className={cn(commonTdClasses, `text-13px custom-backdrop-blur-${id}`)}>{formatDate(createdAt)}</td>

      <td className={cn(commonTdClasses, `custom-backdrop-blur-${id}`)}>
        <Contact {...contact} />
      </td>

      <td className={cn(commonTdClasses, `text-right truncate tabular-nums custom-backdrop-blur-${id}`)}>
        <span className="font-medium">{formatAmount(amount)}</span>
      </td>

      <td className={`py-3 custom-backdrop-blur-${id}`}>
        <span className="text-greyText text-sm block">{currency}</span>
      </td>

      <td className={cn(commonTdClasses, `text-right pr-1.5 custom-backdrop-blur-${id}`)}>
        <div className="hidden xl:block space-x-1">
          {tags.map((tag, index) => (
            <Chip key={`tag-${index}`} label={tag.name} />
          ))}
        </div>
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
  );
};

import * as React from "react";
import { Icon } from "../atoms";
import { format } from "date-fns";
import { cn, formatAmount } from "@nofrixion/utils";
import { LocalPaymentMethodTypes, LocalPaymentAttempt, Currency } from "@nofrixion/utils/types";

export interface TransactionsProps {
  transactions: LocalPaymentAttempt[];
  onRefund: (paymentAttemptID: string) => void;
  onCapture: (paymentAttempt: LocalPaymentAttempt) => void;
}

const PaymentMethodIcon = ({ paymentMethod }: { paymentMethod: LocalPaymentMethodTypes }) => {
  switch (paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      return <Icon name="card/24" />;
    case LocalPaymentMethodTypes.Pisp:
      return <Icon name="bank/24" />;
    case LocalPaymentMethodTypes.ApplePay:
    case LocalPaymentMethodTypes.GooglePay:
      return <Icon name="wallets/24" />;
    default:
      return null;
  }
};

export const Transactions: React.FC<TransactionsProps> = ({ transactions, onCapture }) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {transactions.length === 0 && (
        <div className="text-center text-default-text text-base pt-9">No transactions found</div>
      )}
      {transactions && transactions.length > 0 && (
        <table className="w-full">
          <tbody>
            {transactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <tr
                  className={cn("group whitespace-nowrap", {
                    "border-b": !transaction.captureAttempts || transaction.captureAttempts.length === 0,
                  })}
                >
                  <td className={cn("text-[0.813rem] pb-2 leading-6", { "pt-2": index !== 0 })}>
                    {/* Mobile date */}
                    <span className="inline lg:hidden">
                      {transaction.occurredAt && format(transaction.occurredAt, "dd/MM/yyyy")}
                    </span>

                    {/* Desktop date */}
                    <span className="hidden lg:inline">
                      {transaction.occurredAt && format(transaction.occurredAt, "MMM do, yyyy")}
                    </span>
                  </td>
                  <td className={cn("pl-2 lg:pl-6 pb-2 text-right", { "pt-2": index !== 0 })}>
                    <span className="mr-2 text-sm font-medium leading-6 tabular-nums">
                      <span className="lg:hidden">{transaction.currency === Currency.EUR ? "€" : "£"}</span>
                      {formatAmount(transaction.amount)}
                    </span>
                  </td>
                  <td className={cn("hidden lg:table-cell pb-2", { "pt-2": index !== 0 })}>
                    <span className="text-greyText font-normal text-[0.813rem] leading-6">{transaction.currency}</span>
                  </td>
                  <td className={cn("pl-2 lg:pl-6 pb-2", { "pt-2": index !== 0 })}>
                    <div className="flex flex-row items-center">
                      <span className="mr-2 w-4 h-4">
                        <PaymentMethodIcon paymentMethod={transaction.paymentMethod}></PaymentMethodIcon>
                      </span>
                      <span className="hidden lg:inline text-sm leading-6">{transaction.processor}</span>
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card &&
                        transaction.last4DigitsOfCardNumber && (
                          <div className="hidden lg:flex text-sm ml-1 items-center">
                            <span className="text-[0.375rem] mr-1">&#8226;&#8226;&#8226;&#8226;</span>
                            <span>{transaction.last4DigitsOfCardNumber}</span>
                          </div>
                        )}
                    </div>
                  </td>
                  <td
                    className={cn("pl-2 pb-2 lg:pl-6 leading-6", {
                      "pt-2": index !== 0,
                    })}
                  >
                    <div className="flex justify-end">
                      {/* 
                        Commeting out refund button for now
                        until we have that functionality in the API
                      */}
                      {/*
                      <div className="w-[3.75rem] text-[0.813rem] h-6 ">
                        <div
                          className="text-[0.813rem] px-2 py-1 rounded-full bg-[#DEE6ED] leading-4 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:bg-[#BDCCDB]"
                          onClick={() => onRefundClicked(transaction.attemptKey)}
                        >
                          Refund
                        </div> 
                      </div>
                      */}
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card && transaction.isAuthorizeOnly && (
                        <button
                          type="button"
                          className="text-white text-13px leading-4 bg-primaryGreen hover:bg-primaryGreenHover rounded-full px-2 py-1 transition-colors"
                          onClick={() => onCapture(transaction)}
                        >
                          Capture
                        </button>
                      )}
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Pisp && transaction.isAuthorizeOnly && (
                        <span className="text-greyText text-[10px] leading-4 block px-1 border rounded border-solid border-borderGreyHighlighted">
                          Authorized
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
                {transaction.captureAttempts?.map((captureAttempt, evIndex) => (
                  <tr
                    key={`ev_${evIndex}`}
                    className={cn("text-xs leading-6 group whitespace-nowrap", {
                      "border-b [&>td]:pb-2": evIndex === transaction.captureAttempts.length - 1,
                    })}
                  >
                    <td className="py-0">
                      {/* Mobile date */}
                      <span className="inline lg:hidden">
                        {captureAttempt.capturedAt && format(captureAttempt.capturedAt, "dd/MM/yyyy")}
                      </span>

                      {/* Desktop date */}
                      <span className="hidden lg:inline">
                        {captureAttempt.capturedAt && format(captureAttempt.capturedAt, "MMM do, yyyy")}
                      </span>
                    </td>
                    <td className="pl-2 lg:pl-6 text-right py-0">
                      <span className="mr-2 font-medium tabular-nums text-[#29A37A]">
                        <span className="lg:hidden">{transaction.currency === Currency.EUR ? "€" : "£"}</span>
                        {formatter.format(captureAttempt.capturedAmount)}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell py-0">
                      <span className="text-greyText font-normal">{transaction.currency}</span>
                    </td>
                    <td className="pl-1 lg:pl-5 py-0" colSpan={2}>
                      <div className="flex flex-row items-center">
                        <span className="mr-2 p-1.5">
                          <Icon name="capture/16" className="h-3 w-3" />
                        </span>
                        <span>Captured</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

import * as React from "react";
import { Currency, LocalPartialPaymentMethods } from "@nofrixion/utils/types";
import { formatAmount, formatAmountAndDecimals } from "@nofrixion/utils";

interface AmountPaidProps {
  amountPaid: number;
  totalAmount: number;
  currency: Currency.EUR | Currency.GBP;
  partialPaymentMethod: LocalPartialPaymentMethods;
}

export const AmountPaid: React.FC<AmountPaidProps> = ({ amountPaid, totalAmount, currency, partialPaymentMethod }) => {
  const percentagePaid = amountPaid > totalAmount ? 100 : (amountPaid / totalAmount) * 100;
  const outstandingAmount = amountPaid > totalAmount ? 0 : totalAmount - amountPaid;

  const { amountValueWithCommas, amountDecimals } = formatAmountAndDecimals(totalAmount);

  return (
    <div className="flex flex-col">
      <span className="text-[2rem] font-semibold leading-8 mb-4 text-default-text">
        {currency == Currency.GBP ? "£" : "€"}
        {amountValueWithCommas}
        <sup className="ml-0.5 text-xl">.{amountDecimals}</sup>
      </span>
      {partialPaymentMethod === LocalPartialPaymentMethods.Partial && (
        <div className="flex flex-row h-[0.125rem]">
          {percentagePaid !== 0 && (
            <div className="bg-positiveActionBackground rounded-l-sm" style={{ flexGrow: `${percentagePaid}` }}></div>
          )}
          <div className="bg-greyBg rounded-r-sm" style={{ flexGrow: `${100 - percentagePaid}` }}></div>
        </div>
      )}

      {partialPaymentMethod === LocalPartialPaymentMethods.Partial && (
        <span className="text-sm leading-[1.063rem] text-greyText font-medium mt-2">
          {currency == Currency.GBP ? "£" : "€"}
          <span>{formatAmount(outstandingAmount)}</span> outstanding
        </span>
      )}
    </div>
  );
};

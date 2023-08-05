import * as React from "react";
import { Icon, IconNames } from "../atoms";
import { InfoTooltip } from "../general/InfoTooltip";

interface PaymentMethodIconProps {
  paymentMethod: "bank" | "card" | "wallet" | "lightning";
  showInfoTooltip?: boolean;
  enabled?: boolean;
}

const getIconDescription = (paymentMethodName: string, enabled: boolean) =>
  `${paymentMethodName} ${enabled ? "enabled" : "disabled"}`;

const paymentMethodIcons: Record<string, IconNames> = {
  bank: "bank/24",
  card: "card/24",
  wallet: "wallets/24",
  lightning: "bitcoin/24",
};

const paymentMethodDisabledIcons: Record<string, IconNames> = {
  bank: "bank-disabled/24",
  card: "card-disabled/24",
  wallet: "wallets-disabled/24",
  lightning: "bitcoin-disabled/24",
};

const paymentMethodsName = {
  bank: "Bank",
  card: "Card",
  wallet: "Apple Pay / Google Pay",
  lightning: "Bitcoin Lightning",
};

const getImage: React.FC<PaymentMethodIconProps> = ({ paymentMethod, enabled = false }) => {
  return (
    <Icon
      name={enabled ? paymentMethodIcons[paymentMethod] : paymentMethodDisabledIcons[paymentMethod]}
      className="w-6 h-6"
    />
  );
};

export const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({
  paymentMethod,
  showInfoTooltip = true,
  enabled = false,
}) => {
  if (!showInfoTooltip) {
    return getImage({ paymentMethod, enabled });
  }

  return (
    <InfoTooltip
      className="w-6 h-6 lg:w-4 lg:h-4"
      content={showInfoTooltip ? getIconDescription(paymentMethodsName[paymentMethod], enabled) : ""}
    >
      {getImage({ paymentMethod, enabled })}
    </InfoTooltip>
  );
};

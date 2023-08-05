export interface LocalPaymentConditionsFormValue {
  allowPartialPayments: boolean;
  isDefault: boolean;
}

export interface LocalPaymentMethodsFormValue {
  isBankEnabled: boolean;
  isCardEnabled: boolean;
  isWalletEnabled: boolean;
  isLightningEnabled: boolean;
  isCaptureFundsEnabled: boolean;
  priorityBank?: {
    id: string;
    name: string;
  };
  isDefault: boolean;
}

export interface LocalTag {
  id: string;
  merchantID?: string;
  name: string;
  colourHex?: string;
  description?: string;
}

export interface LocalContact {
  name?: string;
  email?: string;
}

import * as React from "react";
const { useEffect, useState } = React;
import CustomModal, { BaseModalProps } from "../CustomModal";
import Checkbox from "../Checkbox";
import { LocalPaymentConditionsFormValue, PaymentConditionsDefaults } from "@nofrixion/utils/types";

interface PaymentConditionsModalProps extends BaseModalProps {
  userDefaults?: PaymentConditionsDefaults;
  onApply: (data: LocalPaymentConditionsFormValue) => void;
  isPrefilledData: boolean;
}

const PaymentConditionsModal: React.FC<PaymentConditionsModalProps> = ({ open, userDefaults, onDismiss, onApply }) => {
  const [isAllowPartialEnabled, setIsAllowPartialEnabled] = useState<boolean>(
    userDefaults ? userDefaults.allowPartialPayments : false,
  );
  const [currentState, setCurrentState] = useState<LocalPaymentConditionsFormValue>();
  const [enableUseAsDefault, setEnableUseAsDefault] = useState<boolean>(false);

  useEffect(() => {
    setEnableUseAsDefault(!userDefaults || userDefaults?.allowPartialPayments !== isAllowPartialEnabled);
  }, [isAllowPartialEnabled]);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: LocalPaymentConditionsFormValue = {
      allowPartialPayments: isAllowPartialEnabled,
      isDefault: data.isDefaultChecked,
    };

    onApply(formData);
    setCurrentState(formData);

    return formData;
  };

  const handleOnDismiss = () => {
    onDismiss();

    // Reset to initial state
    if (currentState) {
      setIsAllowPartialEnabled(currentState.allowPartialPayments);
    } else {
      setIsAllowPartialEnabled(userDefaults ? userDefaults.allowPartialPayments : false);
    }
  };

  return (
    <CustomModal
      title="Payment conditions"
      open={open}
      enableUseAsDefault={enableUseAsDefault}
      onDismiss={handleOnDismiss}
      onApply={onApplyClicked}
    >
      <div className="py-1">
        <Checkbox
          label="Allow partial payments"
          description="Enable customers to pay a portion of the total amount owed, rather than the full balance all at once."
          value={isAllowPartialEnabled}
          onChange={setIsAllowPartialEnabled}
        />
      </div>
    </CustomModal>
  );
};

export default PaymentConditionsModal;

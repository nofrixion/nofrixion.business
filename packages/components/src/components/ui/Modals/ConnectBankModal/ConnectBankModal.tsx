import { BankSettings } from '@nofrixion/moneymoov'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'
import Select from '../../Select/Select'
import AnimateHeightWrapper from '../../utils/AnimateHeight'

export interface ConnectBankModalProps extends BaseModalProps {
  banks?: BankSettings[]
  onApply: (bank: BankSettings) => void
  onDismiss: () => void
}

export const ConnectBankModal = ({ banks, onApply, onDismiss, open }: ConnectBankModalProps) => {
  const [selectedBank, setSelectedBank] = useState<BankSettings | undefined>()

  const handleOnApply = () => {
    if (!selectedBank) return

    onApply(selectedBank)
  }

  return (
    <CustomModal
      title="Select your bank"
      open={open}
      onApply={handleOnApply}
      onDismiss={onDismiss}
      showDefault={false}
      buttonText="Continue to your bank"
    >
      <AnimatePresence>
        {banks && (
          <AnimateHeightWrapper layoutId="select-priority-bank">
            <div className="pt-4 md:pt-0">
              <Select
                options={banks.map((bank) => {
                  return {
                    value: bank.bankID,
                    label: bank.bankName,
                  }
                })}
                onChange={(selectedOption) => {
                  setSelectedBank(
                    banks.find((bank) => bank.bankID === selectedOption.value) ?? banks[0],
                  )
                }}
                selected={
                  !selectedBank
                    ? {
                        value: banks[0].bankID,
                        label: banks[0].bankName,
                      }
                    : {
                        value: selectedBank.bankID,
                        label: selectedBank.bankName,
                      }
                }
              />
            </div>
            <div className="text-sm font-normal text-default-text mt-8">
              I hereby give my consent for NoFrixion to receive data from my bank. NoFrixion will
              receive access to information regarding the accounts you connect, their transactions
              and daily updates.This consent remains valid for 90 days or until you in writing
              withdraw your consent through NoFrixion. For further information please consult our
              Privacy Policy.
            </div>
          </AnimateHeightWrapper>
        )}
      </AnimatePresence>
    </CustomModal>
  )
}

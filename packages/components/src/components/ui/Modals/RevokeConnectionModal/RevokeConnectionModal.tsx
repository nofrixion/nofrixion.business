import { Account } from '@nofrixion/moneymoov'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { RadioGroup, RadioGroupItem } from '../../atoms/RadioGroup/RadioGroup'
import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'
import AnimateHeightWrapper from '../../utils/AnimateHeight'

export interface RevokeConnectionModalProps extends BaseModalProps {
  onDismiss: () => void
  account?: Account
  onApply: (revokeOnlyThisAccount: boolean) => void
}

const RevokeConnectionModal = ({
  onApply,
  onDismiss,
  open,
  account,
}: RevokeConnectionModalProps) => {
  const [selectedOption, setSelectedOption] = useState('only-this-account')

  return (
    <CustomModal
      title="Revoke connection"
      open={open}
      onApply={() => onApply && onApply(selectedOption === 'only-this-account')}
      onDismiss={onDismiss}
      showDefault={false}
      buttonText="Revoke connection"
      buttonClaseName="bg-negative-red rounded-full px-6 py-3 text-white font-semibold text-base hover:bg-darker-negative-red w-full md:w-auto ml-auto transition"
    >
      <AnimatePresence>
        <AnimateHeightWrapper layoutId="revoke-account">
          <>
            <div className="text-sm font-normal text-default-text mb-[1.125rem]">
              Once you revoke the connection to your bank, your transactions will no longer be
              transferred to NoFrixion. You can always create a new connection again.
            </div>
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="text-sm/4"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="only-this-account" id="option-1" />
                <label className="cursor-pointer" htmlFor="option-1">
                  Only this account
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="all" id="option-2" />
                <label className="cursor-pointer" htmlFor="option-2">
                  All connected {account?.bankName} accounts
                </label>
              </div>
            </RadioGroup>
          </>
        </AnimateHeightWrapper>
      </AnimatePresence>
    </CustomModal>
  )
}

export default RevokeConnectionModal

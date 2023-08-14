import { Account as AccountModel } from '@nofrixion/moneymoov'
import { AnimatePresence, LayoutGroup } from 'framer-motion'

import LayoutWrapper from '../../utils/LayoutWrapper'
import Account from '../Account'
import CurrentAccountsHeader from '../CurrentAccountsHeader/CurrentAccountsHeader '

export interface CurrentAccountsListProps {
  accounts: AccountModel[] | undefined
  onCreatePaymentAccount: () => void
  onAccountClick: () => void
}

const CurrentAcountsList = ({
  accounts,
  onCreatePaymentAccount,
  onAccountClick,
}: CurrentAccountsListProps) => {
  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <CurrentAccountsHeader onCreatePaymentAccount={onCreatePaymentAccount} />

      {accounts && (
        <div className="flex-row mb-8 md:mb-[68px]">
          <LayoutGroup>
            <AnimatePresence initial={false}>
              <LayoutWrapper>
                {accounts.map((account, index) => (
                  <Account key={index} account={account} onAccountClick={onAccountClick} />
                ))}
              </LayoutWrapper>
            </AnimatePresence>
          </LayoutGroup>
        </div>
      )}
    </div>
  )
}

export default CurrentAcountsList

import { AccountIdentifier, AccountIdentifierType } from '@nofrixion/moneymoov'

import { Icon } from '../../ui/atoms'

export interface AccountIdentifierProps {
  accountIdentifier: AccountIdentifier
}

const AccountIdentifier: React.FC<AccountIdentifierProps> = ({ accountIdentifier }) => {
  // const onCopy = (accountInfo: string) => {
  //     navigator.clipboard.writeText(accountInfo)
  //   }

  return (
    <div
      className="flex h-[124px] p-8 mb-8 bg-white hover:cursor-pointer gap-8 justify-between"
      aria-hidden="true"
    >
      {accountIdentifier && accountIdentifier.type === AccountIdentifierType.IBAN && (
        <div className="mt-2">
          <span>IBAN</span>
          <span>{accountIdentifier.iban}</span>
          <Icon name="copy/12px" className="text-control-grey-hover" />
        </div>
      )}
    </div>
  )
}

export default AccountIdentifier

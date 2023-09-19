import { Account } from '@nofrixion/moneymoov'
import { formatDistanceToNow } from 'date-fns'

import { Icon } from '../Icon/Icon'

export interface AccountConnectionProps {
  account: Account
  //   onConnect?: () => void
  //   onDisconnect?: () => void
}

const AccountConnection = ({ account }: AccountConnectionProps) => {
  return (
    <>
      {account.expiryDate && (
        <div className="flex space-x-1 mt-2 items-center group">
          <Icon
            name="connected/16"
            className="mr-1 stroke-[#ABB3BA] group-hover:stroke-default-text"
          />
          <div className="text-grey-text text-xs font-normal transition hover:text-default-text">
            Expires in {formatDistanceToNow(new Date(account.expiryDate))}
          </div>

          <div className="text-grey-text text-xs font-normal transition hidden group-hover:block">
            Expires in {formatDistanceToNow(new Date(account.expiryDate))}
          </div>
        </div>
      )}
    </>
  )
}

export default AccountConnection

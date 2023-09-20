/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Account } from '@nofrixion/moneymoov'
import { formatDistanceToNow } from 'date-fns'

import { cn } from '../../../../utils'
import { Icon } from '../Icon/Icon'

export interface AccountConnectionProps {
  account: Account
  onRenewConnection?: (account: Account) => void
  //   onConnect?: () => void
  //   onDisconnect?: () => void
}

const AccountConnection = ({ account, onRenewConnection }: AccountConnectionProps) => {
  const isExpired = account.expiryDate && new Date(account.expiryDate) < new Date()

  const onHandleRenewConnection = (event: React.MouseEvent<HTMLDivElement>, account: Account) => {
    onRenewConnection && onRenewConnection(account)

    event.stopPropagation()
  }

  return (
    <>
      {account.expiryDate && (
        <div className="flex mt-2 items-center group">
          <Icon
            name="connected/16"
            className={cn('mr-1 stroke-[#ABB3BA] group-hover:stroke-default-text', {
              'stroke-negative-red': isExpired,
            })}
          />
          <div
            className={cn('text-grey-text text-xs font-normal transition hover:text-default-text', {
              'text-negative-red': isExpired,
            })}
          >
            Expires in {formatDistanceToNow(new Date(account.expiryDate))}
          </div>

          <div
            className="text-grey-text text-xs font-normal transition hidden group-hover:block ml-2 underline"
            onClick={(event) => onHandleRenewConnection(event, account)}
          >
            Renew connection
          </div>
        </div>
      )}
    </>
  )
}

export default AccountConnection

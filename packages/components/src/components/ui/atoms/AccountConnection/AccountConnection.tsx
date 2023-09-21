/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Account } from '@nofrixion/moneymoov'
import { formatDistanceToNow } from 'date-fns'

import { cn } from '../../../../utils'
import { formatDateWithYear } from '../../../../utils/formatters'
import { Icon } from '../Icon/Icon'

export interface AccountConnectionProps {
  account: Account
  isExpired: boolean
  onRenewConnection?: (account: Account) => void
  //   onConnect?: () => void
  //   onDisconnect?: () => void
}

const AccountConnection = ({ account, isExpired, onRenewConnection }: AccountConnectionProps) => {
  const onHandleRenewConnection = (event: React.MouseEvent<HTMLDivElement>, account: Account) => {
    onRenewConnection && onRenewConnection(account)

    event.stopPropagation()
  }

  return (
    <>
      {account.expiryDate && (
        <div className="flex mt-2 items-center group w-fit">
          <Icon
            name="connected/16"
            className={cn('mr-1 stroke-[#ABB3BA]', {
              'stroke-negative-red': isExpired,
            })}
          />
          {!isExpired && (
            <div className="text-grey-text text-xs font-normal transition hover:text-default-text cursor-pointer">
              Expires in {formatDistanceToNow(new Date(account.expiryDate))}
            </div>
          )}
          {isExpired && (
            <div className="text-negative-red text-xs font-normal transition hover:text-default-text cursor-pointer">
              Connection expired on {formatDateWithYear(new Date(account.expiryDate))}
            </div>
          )}

          <div
            className="text-default-text text-xs font-normal transition hidden group-hover:block ml-2 underline hover:no-underline cursor-pointer"
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

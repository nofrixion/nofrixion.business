import { Account } from '@nofrixion/moneymoov'

import { Icon } from '../../atoms'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '../../atoms/DropDown/DropDown'

export interface ConnectedAccountContextMenuProps {
  account: Account
  onRenewConnection?: (account: Account) => void
  onRevokeConnection?: (account: Account) => void
}

const ConnectedAccountContextMenu = ({
  account,
  onRenewConnection,
  onRevokeConnection,
}: ConnectedAccountContextMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="rounded-full w-8 h-8 inline-flex items-center justify-center outline-none cursor-pointer align-middle hover:bg-grey-bg fill-[#8F99A3] hover:fill-[#454D54] data-[state='open']:fill-[#454D54]"
          aria-label="Actions"
        >
          <Icon name="ellipsis/24" className="stroke-border-grey-highlighted" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={10}
          align="center"
          className="mx-4 bg-white rounded-lg shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] py-4 pl-6 pr-6"
        >
          <DropdownMenuItem
            key="refresh-menu"
            onSelect={(event) => {
              event.stopPropagation()
              onRenewConnection && onRenewConnection(account)
            }}
            onClick={(event) => event.stopPropagation()}
            className="text-default-text hover:text-control-grey-hover"
          >
            <div className="flex">
              <Icon name="reload/16" className="mr-2 my-auto" />
              <span>Refresh</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            key="revoke-menu"
            onSelect={() => onRevokeConnection && onRevokeConnection(account)}
            onClick={(event) => event.stopPropagation()}
            className="text-negative-red hover:text-highlighted-negative-red"
          >
            <div className="flex">
              <Icon name="void/16" className="mr-2 my-auto" />
              <span>Revoke connection</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export default ConnectedAccountContextMenu

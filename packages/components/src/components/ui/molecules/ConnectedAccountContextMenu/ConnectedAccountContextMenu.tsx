import { Account } from '@nofrixion/moneymoov'
import { motion } from 'framer-motion'

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
        <DropdownMenuContent sideOffset={5} align="center">
          <motion.div
            className="mx-4 bg-white rounded-lg shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] py-4 pl-6 pr-6"
            initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
            animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
          >
            <DropdownMenuItem
              key="refresh-menu"
              onSelect={() => {
                onRenewConnection && onRenewConnection(account)
              }}
              className="text-default-text hover:text-control-grey-hover"
            >
              <div className="flex">
                <Icon name="reload/16" className="mr-2 my-auto" />
                Refresh
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              key="revoke-menu"
              onSelect={() => onRevokeConnection && onRevokeConnection(account)}
              className="text-negative-red hover:text-highlighted-negative-red"
            >
              <div className="flex">
                <Icon name="void/16" className="mr-2 my-auto" />
                Revoke connection
              </div>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export default ConnectedAccountContextMenu

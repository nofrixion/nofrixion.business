import { Account } from '@nofrixion/moneymoov'

export interface ConnectedAccountContextMenuProps {
  account: Account
}

const ConnectedAccountContextMenu = ({ account }: ConnectedAccountContextMenuProps) => {
  console.log(account)
}

export default ConnectedAccountContextMenu

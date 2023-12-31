import { Account, AccountIdentifierType } from '@nofrixion/moneymoov'

import { cn } from '../../../utils'
import { Button, DisplayAndCopy } from '../atoms'
import AccountConnection from '../atoms/AccountConnection/AccountConnection'
import ConnectedAccountContextMenu from '../molecules/ConnectedAccountContextMenu/ConnectedAccountContextMenu'
import AccountBalance from './AccountBalance/AccountBalance'

export interface AccountCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  account: Account
  bankLogo?: string
  onRenewConnection?: (account: Account) => void
  onRevokeConnection?: (account: Account) => void
}

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  bankLogo,
  onRenewConnection,
  onRevokeConnection,
  className,
  ...props
}) => {
  const isExpired = account.expiryDate && new Date(account.expiryDate) < new Date() ? true : false

  const onHandleRenewConnection = (
    event: React.MouseEvent<HTMLButtonElement> | Event,
    account: Account,
  ) => {
    onRenewConnection && onRenewConnection(account)

    event.stopPropagation()
  }

  return (
    <button
      {...props}
      className={cn(
        'flex p-8 mb-6 bg-white gap-8 rounded-lg hover:shadow-[0px_2px_8px_0px_rgba(4,_41,_49,_0.1)] w-full',
        className,
      )}
    >
      {account.isConnectedAccount && bankLogo && (
        <div>
          <img
            src={`https://cdn.nofrixion.com/img/banks/svg/${bankLogo}`}
            alt="bank logo"
            width={40}
            height={40}
          />
        </div>
      )}
      <div className="flex flex-row justify-between w-full">
        <div className="text-left">
          <div>
            <span className="font-semibold text-xl leading-5" aria-hidden="true">
              {account.accountName}
            </span>
          </div>
          <div className="flex gap-6 mt-2">
            {account.identifier.type === AccountIdentifierType.IBAN && account.identifier.iban ? (
              <DisplayAndCopy name="IBAN" value={account.identifier.iban} />
            ) : (
              <>
                {account.identifier.sortCode && (
                  <DisplayAndCopy name="SC" value={account.identifier.sortCode} />
                )}
                {account.identifier.accountNumber && (
                  <DisplayAndCopy name="AN" value={account.identifier.accountNumber} />
                )}
              </>
            )}
          </div>
          {account.isConnectedAccount && account.expiryDate && (
            <AccountConnection
              account={account}
              isExpired={isExpired}
              onRenewConnection={onRenewConnection && onRenewConnection}
            />
          )}
        </div>
        {(!account.isConnectedAccount || (account.isConnectedAccount && !isExpired)) && (
          <div className="flex">
            <div className="my-auto">
              <AccountBalance
                currency={account.currency}
                balance={account.balance}
                availableBalance={account.availableBalance}
              />
            </div>
            {account.isConnectedAccount && (
              <div className="my-auto ml-3 mr-0">
                <ConnectedAccountContextMenu
                  account={account}
                  onRenewConnection={onRenewConnection && onRenewConnection}
                  onRevokeConnection={onRevokeConnection && onRevokeConnection}
                ></ConnectedAccountContextMenu>
              </div>
            )}
          </div>
        )}
        {account.isConnectedAccount && isExpired && (
          <div className="my-auto">
            <Button
              variant="secondary"
              onClick={(event) => onHandleRenewConnection(event, account)}
            >
              Renew connection
            </Button>
          </div>
        )}
      </div>
    </button>
  )
}

export default AccountCard

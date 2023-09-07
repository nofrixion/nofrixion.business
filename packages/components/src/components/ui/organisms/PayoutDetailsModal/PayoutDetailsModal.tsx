import { Currency, PayoutStatus } from '@nofrixion/moneymoov'

import { LocalPayout } from '../../../../types/LocalTypes'
import { formatAmountAndDecimals } from '../../../../utils/formatters'
import { payoutStatusToStatus } from '../../../../utils/parsers'
import { formatCurrency } from '../../../../utils/uiFormaters'
import { Button, Sheet, SheetContent } from '../../../ui/atoms'
import { Table, TableCell, TableRow } from '../../atoms/Table/Table'
import { Status } from '../../molecules'
import AccountDetails from '../../molecules/Account/AccountDetails'
import { PayoutApproveForm } from '../../utils/PayoutApproveForm'

export interface PayoutDetailsModalProps {
  payout?: LocalPayout
  open: boolean
  onDismiss: () => void
}

const PayoutDetailsModal = ({ payout, open, onDismiss }: PayoutDetailsModalProps) => {
  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  const { amountValueWithCommas, amountDecimals } = formatAmountAndDecimals(payout?.amount ?? 0)

  return (
    <Sheet open={open} onOpenChange={handleOnOpenChange}>
      <SheetContent
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
        className="w-full lg:w-[37.5rem] outline-none"
      >
        {payout && (
          <div className="bg-white max-h-full h-full overflow-auto">
            {payout && payout.status === PayoutStatus.PENDING_APPROVAL && (
              <div className="flex bg-main-grey h-[72px] justify-end space-x-4 pr-8">
                <div className="mt-4">
                  <Button variant={'secondary'} size={'medium'} onClick={onDismiss}>
                    Edit payout
                  </Button>
                </div>
                <div className="mt-4 mr-8">
                  {payout && <PayoutApproveForm payoutId={payout?.id} size={'medium'} />}
                </div>
              </div>
            )}
            <div className="flex mt-10 mx-8 justify-between items-center">
              <span className="text-[2rem] font-semibold leading-8 text-default-text tabular-nums pt-1">
                {formatCurrency(payout?.currency ?? Currency.EUR)}
                {amountValueWithCommas}
                <sup className="ml-0.5 text-xl">.{amountDecimals}</sup>
              </span>
              {/* <span className="text-[2rem] font-semibold leading-8 text-default-text tabular-nums">
                {formatCurrency(payout?.currency ?? Currency.EUR)}
                {formatAmount(payout?.amount ?? 0)}
              </span> */}
              <Status size="large" variant={payoutStatusToStatus(payout.status)} />
            </div>
            <Table className="mt-16 mx-8 w-11/12">
              <TableRow className="border-none hover:bg-white cursor-default text-sm h-20">
                <TableCell className="text-grey-text align-top w-1/3">From account</TableCell>
                <TableCell className="align-top">
                  <AccountDetails
                    accountName={payout.sourceAccountName}
                    accountNumber={
                      payout.sourceAccountIban ??
                      payout.sourceAccountNumber + ' ' + payout.sourceAccountSortCode
                    }
                  ></AccountDetails>
                </TableCell>
              </TableRow>
              <TableRow className="border-none hover:bg-white cursor-default text-sm h-20">
                <TableCell className="text-grey-text align-top w-1/3">To account</TableCell>
                <TableCell className="align-top">
                  <AccountDetails
                    accountName={payout.destination?.name}
                    accountNumber={
                      payout.destination?.identifier?.iban ??
                      payout.destination?.identifier?.accountNumber +
                        ' ' +
                        payout.destination?.identifier?.sortCode
                    }
                  ></AccountDetails>
                </TableCell>
              </TableRow>
              {payout.theirReference && (
                <TableRow className="border-none hover:bg-white cursor-default text-sm h-14">
                  <TableCell className="text-grey-text align-top w-1/3">Their reference</TableCell>
                  <TableCell className="align-top">{payout.theirReference}</TableCell>
                </TableRow>
              )}
              {payout.yourReference && (
                <TableRow className="border-none hover:bg-white cursor-default text-sm h-14">
                  <TableCell className="text-grey-text align-top w-1/3">Your reference</TableCell>
                  <TableCell className="align-top">{payout.yourReference}</TableCell>
                </TableRow>
              )}
              {payout.description && (
                <TableRow className="border-none hover:bg-white cursor-default text-sm h-16">
                  <TableCell className="text-grey-text align-top w-1/3">Description</TableCell>
                  <TableCell className="align-top">{payout.description}</TableCell>
                </TableRow>
              )}
            </Table>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default PayoutDetailsModal

import { LocalInvoice } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatAmount, formatDateWithYear } from '../../../../utils/formatters'
import { formatCurrency } from '../../../../utils/uiFormaters'
import Contact from '../../Contact/Contact'
import Switch from '../../Switch/Switch'

export type ImportInvoiceRowProps = LocalInvoice & {
  isSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
  className?: string
}

const ImportInvoiceRow: React.FC<ImportInvoiceRowProps> = ({
  InvoiceNumber,
  PaymentTerms,
  InvoiceDate,
  DueDate,
  Currency,
  TotalAmount,
  Contact: contact,
  RemittanceEmail,
  DestinationIban,
  DestinationAccountNumber,
  DestinationSortCode,
  Reference,
  isSelected,
  onSelectedChange,
  className,
}) => {
  const destinationAccount = DestinationIban
    ? DestinationIban.replace(' ', '')
    : DestinationAccountNumber && DestinationSortCode
    ? `${DestinationAccountNumber} - ${DestinationSortCode}`
    : '-'

  return (
    <div
      className={cn(
        'flex text-sm/4 text-default-text gap-x-6 border-b border-border-grey',
        className,
      )}
    >
      <div className="flex flex-col w-[5.5rem]">
        <span className="mb-2">{InvoiceNumber}</span>
        <span className="text-xs text-grey-text">{PaymentTerms}</span>
      </div>

      {/* 
        TODO: Change date format to include the timezone
        Note: keep in mind that the date in the CSV will come with UTC timezone
        so if the user is in a different timezone, the date shown in the UI will be different
      */}
      <span className="w-[7.5rem]">{formatDateWithYear(new Date(InvoiceDate))}</span>

      <span className="w-[7.5rem]">{formatDateWithYear(new Date(DueDate))}</span>

      <span className="w-[7.5rem] font-medium">
        {/* TODO: Include subtotal, taxes and discounts as per design */}
        {`${formatCurrency(Currency)}${formatAmount(Math.abs(TotalAmount))}`}
      </span>

      <div className="w-[12.5rem] ml-10">
        <Contact name={contact} email={RemittanceEmail} size="normal" />
      </div>

      {/* TODO: Better Support GBP UI for import (no design yet) */}
      <span className="w-[12.5rem] truncate" title={destinationAccount}>
        {destinationAccount}
      </span>

      <span className="w-[7.5rem]">{Reference}</span>

      <div className="ml-auto">
        <Switch
          value={isSelected ?? false}
          onChange={(value) => {
            onSelectedChange && onSelectedChange(value)
          }}
        />
      </div>
    </div>
  )
}

export default ImportInvoiceRow

import { type SelectProps } from '@radix-ui/react-select'

import { LocalAccount } from '../../../../../types/LocalTypes'
import { cn } from '../../../../../utils'
import { formatAmount } from '../../../../../utils/formatters'
import { formatCurrency } from '../../../../../utils/uiFormaters'
// import { cn } from '../../../../../utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../atoms/Select/Select'

export interface SelectAccountPros extends SelectProps {
  onValueChange?: (value: string) => void
  defaultValue?: string
  value?: string
  subText?: string
  className?: string
  accounts: LocalAccount[]
}

const SelectAccount: React.FC<SelectAccountPros> = ({
  defaultValue,
  value,
  onValueChange,
  // subText,
  className,
  accounts,
  ...props
}) => {
  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={onValueChange} {...props}>
      {
        <SelectTrigger className={cn('w-full md:w-[375px] py-4 rounded', className)}>
          <SelectValue asChild>
            <div className="w-full flex justify-between">
              {value != undefined ? (
                <>
                  <span className="break-keep">
                    {accounts.find((x) => x.id === value)!.displayName ??
                      accounts.find((x) => x.id === value)!.accountName}
                  </span>
                  <span className="text-[#73888C] font-normal">
                    {formatCurrency(accounts.find((x) => x.id === value)!.currency)}{' '}
                    <span className="tabular-nums">
                      {formatAmount(accounts.find((x) => x.id === value)!.availableBalance)}
                    </span>
                  </span>
                </>
              ) : (
                'Custom'
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
      }
      <SelectContent className="w-full md:w-[375px]">
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id} isText={false}>
            <div className="w-full flex justify-between">
              <>
                <span className="break-keep">{account.displayName ?? account.accountName}</span>
                <span className="text-[#73888C] font-normal">
                  {formatCurrency(account.currency)} {formatAmount(account.availableBalance)}
                </span>
              </>
            </div>
            {/* {account.displayName} */}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SelectAccount }

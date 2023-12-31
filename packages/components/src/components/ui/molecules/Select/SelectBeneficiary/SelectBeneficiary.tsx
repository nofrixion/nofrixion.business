import { type SelectProps } from '@radix-ui/react-select'

import { LocalBeneficiary } from '../../../../../types/LocalTypes'
import { cn } from '../../../../../utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../atoms/Select/Select'

export interface SelectBeneficiaryPros extends SelectProps {
  onValueChange?: (value: string) => void
  defaultValue?: string
  value?: string
  subText?: string
  className?: string
  beneficiaries: LocalBeneficiary[]
}

const SelectBeneficiary: React.FC<SelectBeneficiaryPros> = ({
  value,
  onValueChange,
  className,
  beneficiaries,
  ...props
}) => {
  const beneficiary = beneficiaries.find((x) => x.id === value)

  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      {
        <SelectTrigger className={cn('md:w-[27rem] py-3 h-12 rounded font-normal', className)}>
          <SelectValue asChild>
            <div className="w-full flex justify-between items-center">
              {value ? (
                value === 'addManually' ? (
                  <span className="text-grey-text text-sm">Add manually</span>
                ) : (
                  <>
                    <span className="break-keep">{beneficiary?.destination?.name}</span>
                    <span className="text-xs">
                      <span className="text-[#73888C] mr-2">
                        {beneficiary?.destination?.accountInfo}
                      </span>
                      <span>{beneficiary?.currency}</span>
                    </span>
                  </>
                )
              ) : (
                <span className="font-normal text-grey-text text-sm">Select beneficiary</span>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
      }
      <SelectContent className="md:w-[27rem] z-[200] font-normal">
        <SelectItem
          key="addManually"
          value="addManually"
          isText={false}
          className="active:bg-white lg:focus:bg-white"
        >
          <span className="underline underline-offset-4 cursor-pointer hover:no-underline">
            Add manually
          </span>
        </SelectItem>
        {beneficiaries.map((beneficiary) => (
          <SelectItem key={beneficiary.id} value={beneficiary.id} isText={false}>
            <div className="w-full flex justify-between items-center">
              <span className="break-keep">{beneficiary.destination?.name}</span>
              <span className="text-xs">
                <span className="text-[#73888C] mr-2">{beneficiary.destination?.accountInfo}</span>
                <span>{beneficiary.currency}</span>
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SelectBeneficiary }

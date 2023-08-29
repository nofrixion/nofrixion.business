import { type SelectProps } from '@radix-ui/react-select'

import { cn } from '../../../../../utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../atoms/Select/Select'

const options = {
  mostRecentFirst: 'Most recent first',
  oldestFirst: 'Oldest first',
  amountHighToLow: 'Most expensive first',
  amountLowToHigh: 'Cheapest first',
}

const displayValue = {
  mostRecentFirst: 'Creation date',
  oldestFirst: 'Creation date',
  amountHighToLow: 'Amount',
  amountLowToHigh: 'Amount',
}

type TSorterOptions = keyof typeof options

export interface SelectSorterProps extends SelectProps {
  onValueChange?: (value: TSorterOptions) => void
  defaultValue?: TSorterOptions
  value?: TSorterOptions
  className?: string
}

const SelectSorter: React.FC<SelectSorterProps> = ({
  defaultValue,
  value,
  onValueChange,
  className,
  ...props
}) => {
  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger
        subText={value ? options[value] : undefined}
        className={cn('w-full', className)}
      >
        <SelectValue>{value != undefined ? displayValue[value] : '-'}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(options).map((key) => (
          <SelectItem key={key} value={key}>
            {options[key as keyof typeof options]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SelectSorter, type TSorterOptions }

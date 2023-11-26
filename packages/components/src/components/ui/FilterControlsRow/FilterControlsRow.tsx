import { SortByPaymentRequests, SortByPayouts, SortByTransactions } from '../../../types/Sort'
import { SortDirection } from '../../ui/ColumnHeader/ColumnHeader'
import { SelectSorter, TSorterOptions } from '../../ui/molecules'
import AmountFilter from '../AmountFilter/AmountFilter'
import DateRangePicker, { DateRange } from '../DateRangePicker/DateRangePicker'
import SearchBar from '../SearchBar/SearchBar'
import TagFilter, { FilterableTag } from '../TagFilter/TagFilter'

export interface FilterControlsRowProps {
  setDateRange: (dateRange: DateRange) => void
  searchFilter: string
  setSearchFilter: (value: string) => void
  currency?: string
  setCurrency?: (currency?: string) => void
  minAmount?: number
  setMinAmount?: (minAmount?: number) => void
  maxAmount?: number
  setMaxAmount?: (maxAmount?: number) => void
  tags: FilterableTag[]
  setTags: (tags: FilterableTag[]) => void
  sortBy?: SortByTransactions | SortByPayouts | SortByPaymentRequests
  onSort: (sortBy: SortByTransactions | SortByPayouts | SortByPaymentRequests) => void
  firstDate?: Date
}

const FilterControlsRow = ({
  setDateRange,
  searchFilter,
  setSearchFilter,
  currency,
  setCurrency,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  tags,
  setTags,
  sortBy,
  onSort,
  firstDate,
}: FilterControlsRowProps) => {
  const onValueChanged = (value: TSorterOptions) => {
    switch (value) {
      case 'mostRecentFirst':
        onSort({ name: 'created', direction: SortDirection.DESC })
        break
      case 'oldestFirst':
        onSort({ name: 'created', direction: SortDirection.ASC })
        break
      case 'amountHighToLow':
        onSort({ name: 'amount', direction: SortDirection.DESC })
        break
      case 'amountLowToHigh':
        onSort({ name: 'amount', direction: SortDirection.ASC })
        break
    }
  }

  const getSorterValue = () => {
    if (sortBy?.name == 'created' && sortBy.direction === SortDirection.DESC) {
      return 'mostRecentFirst'
    } else if (sortBy?.name == 'created' && sortBy.direction === SortDirection.ASC) {
      return 'oldestFirst'
    } else if (sortBy?.name == 'amount' && sortBy.direction === SortDirection.DESC) {
      return 'amountHighToLow'
    } else if (sortBy?.name == 'amount' && sortBy.direction === SortDirection.ASC) {
      return 'amountLowToHigh'
    } else {
      return 'mostRecentFirst'
    }
  }

  return (
    <div className="flex md:w-auto md:flex justify-between md:p-3 bg-white rounded-lg">
      <DateRangePicker
        firstDate={firstDate}
        onDateChange={(dateRange) => setDateRange(dateRange)}
      />

      <div className="md:hidden">
        <SelectSorter
          className="text-right"
          value={getSorterValue()}
          onValueChange={onValueChanged}
        />
      </div>

      <div className="hidden md:inline-flex flex-row space-x-2">
        <SearchBar value={searchFilter} setValue={setSearchFilter} />

        <AmountFilter
          currency={currency}
          setCurrency={setCurrency}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
        />

        <TagFilter tags={tags} setTags={setTags} />
      </div>
    </div>
  )
}

export default FilterControlsRow

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
  createdSortDirection: SortDirection
  setCreatedSortDirection?: (direction: SortDirection) => void
  amountSortDirection: SortDirection
  setAmountSortDirection?: (direction: SortDirection) => void
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
  createdSortDirection,
  setCreatedSortDirection,
  amountSortDirection,
  setAmountSortDirection,
  firstDate,
}: FilterControlsRowProps) => {
  const onValueChanged = (value: TSorterOptions) => {
    switch (value) {
      case 'mostRecentFirst':
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.DESC)
        setAmountSortDirection && setAmountSortDirection(SortDirection.NONE)
        break
      case 'oldestFirst':
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.ASC)
        setAmountSortDirection && setAmountSortDirection(SortDirection.NONE)
        break
      case 'amountHighToLow':
        setAmountSortDirection && setAmountSortDirection(SortDirection.DESC)
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.NONE)
        break
      case 'amountLowToHigh':
        setAmountSortDirection && setAmountSortDirection(SortDirection.ASC)
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.NONE)
        break
    }
  }

  const getSorterValue = () => {
    if (createdSortDirection === SortDirection.DESC) {
      return 'mostRecentFirst'
    } else if (createdSortDirection === SortDirection.ASC) {
      return 'oldestFirst'
    } else if (amountSortDirection === SortDirection.DESC) {
      return 'amountHighToLow'
    } else if (amountSortDirection === SortDirection.ASC) {
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

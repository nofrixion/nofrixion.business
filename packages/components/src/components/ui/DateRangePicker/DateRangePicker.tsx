import './DateRangePicker.css'

import { add, endOfDay, format, isSameDay, startOfDay } from 'date-fns'
import { MouseEventHandler, useEffect, useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'

import { cn } from '../../../utils'
import { getSelectRangeText } from '../../../utils/formatters'
import { SelectDateRange, type TDateRangeOptions } from '../../ui/molecules'
import DateRangeButton from './DateRangeButton'
import DateRangeInput from './DateRangeInput'

const pillClasses =
  'text-default-text leading-6 hover:text-grey-text bg-transparent text-sm whitespace-nowrap cursor-pointer select-none stroke-default-text hover:stroke-control-grey'

export type DateRange = {
  fromDate?: Date
  toDate?: Date
}

export interface DateRangeFilterProps {
  firstDate?: Date
  onDateChange: (dateRange: DateRange) => void
}

const dateFormat = 'MMM do'

const DateRangePicker = ({ onDateChange, firstDate }: DateRangeFilterProps) => {
  const [dates, setDates] = useState<DateObject[]>([])
  const [selectRangeText, setSelectRangeText] = useState<TDateRangeOptions | undefined>(
    'last90Days',
  )
  const [isClosed, setIsClosed] = useState(true)

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const onDateChangeHandler = () => {
    if (dates && dates.length == 2 && isClosed) {
      setSelectRangeText(getSelectRangeText(dates[0].toDate(), dates[1].toDate(), firstDate))

      onDateChange &&
        onDateChange({
          fromDate: new Date(dates[0].toDate()),
          toDate: endOfDay(new Date(dates[1].toDate())),
        })
    }
  }

  useEffect(() => {
    onDateChangeHandler()
  }, [dates])

  useEffect(() => {
    onDateChangeHandler()
  }, [isClosed])

  useEffect(() => {
    let fromDate
    let toDate

    switch (selectRangeText) {
      case 'today':
        fromDate = startOfDay(new Date())
        setDates([new DateObject(fromDate), new DateObject(new Date())])
        break
      case 'yesterday':
        fromDate = startOfDay(add(new Date(), { days: -1 }))
        toDate = endOfDay(add(new Date(), { days: -1 }))
        setDates([new DateObject(fromDate), new DateObject(toDate)])
        break
      case 'last7Days':
        fromDate = startOfDay(add(new Date(), { days: -7 }))
        setDates([new DateObject(fromDate), new DateObject(new Date())])
        break
      case 'last30Days':
        fromDate = startOfDay(add(new Date(), { days: -30 }))
        setDates([new DateObject(fromDate), new DateObject(new Date())])
        break
      case 'last90Days':
        fromDate = startOfDay(add(new Date(), { days: -90 }))
        setDates([new DateObject(fromDate), new DateObject(new Date())])
        break
      case 'all':
        fromDate = firstDate ?? new Date(0)
        setDates([new DateObject(fromDate), new DateObject(new Date())])
        break
      default:
        break
    }
  }, [selectRangeText])

  return (
    <div className="md:flex md:justify-normal text-left md:w-fit">
      <SelectDateRange
        className="mr-1 text-left"
        value={selectRangeText}
        onValueChange={setSelectRangeText}
        subText={
          dates[0] != undefined && dates[1] != undefined
            ? isSameDay(dates[0].toDate(), dates[1].toDate())
              ? format(dates[0].toDate(), dateFormat)
              : `${format(dates[0].toDate(), dateFormat)} - ${format(
                  dates[1].toDate(),
                  dateFormat,
                )}`
            : ''
        }
      />

      <div className={cn(pillClasses, 'hidden md:flex border-border-grey border-l')}>
        <DatePicker
          value={dates}
          onChange={(changes: DateObject[]) => {
            setDates(changes)
          }}
          onOpen={() => {
            setIsClosed(false)
          }}
          onClose={() => {
            setIsClosed(true)
            return true
          }}
          range
          rangeHover
          maxDate={new Date()}
          render={(value: string[], openCalendar: () => void) => {
            return <DateRangeInput value={value} openCalendar={openCalendar} />
          }}
          arrow={false}
          weekDays={weekDays}
          offsetY={13}
          renderButton={(
            direction: string,
            handleClick: MouseEventHandler<HTMLButtonElement> | undefined,
            disabled: boolean,
          ) => {
            return (
              <DateRangeButton
                direction={direction}
                handleClick={handleClick}
                disabled={disabled}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export default DateRangePicker

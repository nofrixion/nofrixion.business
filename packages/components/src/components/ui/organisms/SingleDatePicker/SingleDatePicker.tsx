import '../../DateRangePicker/DateRangePicker.css'

import { addDays } from 'date-fns'
import * as React from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'

import { formatDateWithYear } from '../../../../utils/formatters'
import { Icon } from '../../atoms'
import DateRangeButton from '../../DateRangePicker/DateRangeButton'

export interface DateSinglePickerProps {
  onDateChange?: (date: Date) => void
  value?: DateObject
}

export const SingleDatePicker = ({ value, onDateChange }: DateSinglePickerProps) => {
  const [date, setDate] = React.useState<Date>()
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const handleOnDateChange = (date: Date) => {
    setDate(date)
    onDateChange && onDateChange(date)
  }

  return (
    // TODO: Create component with editable
    <div className="flex items-center w-[200px] h-12 font-normal rounded-[0.25rem] border border-border-grey hover:border-border-grey-highlighted text-[#454D54]">
      {/* <div className="flex items-center w-full ml-3 mr-3">{date && formatDateWithYear(date)}</div> */}
      <DatePicker
        value={value}
        onChange={(value: DateObject) => {
          handleOnDateChange(value.toDate())
        }}
        format="DD/MM/YYYY"
        minDate={addDays(new Date(), 1)}
        maxDate={addDays(new Date(), 61)}
        // render={(value: string[], openCalendar: () => void) => {
        //   return (
        //     <button onClick={openCalendar} className="ml-auto mr-3">
        //       <Icon name="calendar/16" className="ml-auto" />
        //     </button>
        //   )
        // }}
        render={(value: string[], openCalendar: () => void, onChange: any) => {
          return (
            <div className="flex w-[200px] h-12 font-normal rounded-[0.25rem] border border-border-grey hover:border-border-grey-highlighted text-[#454D54]">
              <span className="flex items-center w-full ml-3 mr-3">
                {date && formatDateWithYear(date)}
              </span>
              <input onChange={onChange} value={value} />
              <button onClick={openCalendar} className="ml-auto mr-3">
                <Icon name="calendar/16" className="ml-auto" />
              </button>
            </div>
          )
        }}
        arrow={false}
        weekDays={weekDays}
        offsetY={13}
        offsetX={-130}
        renderButton={(
          direction: string,
          handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
          disabled: boolean,
        ) => {
          return (
            <DateRangeButton direction={direction} handleClick={handleClick} disabled={disabled} />
          )
        }}
      />
    </div>
  )
}

// const CustomInput = ({ onFocus, value, onChange }) => {
//   return <input onFocus={onFocus} value={value} onChange={onChange} />
// }

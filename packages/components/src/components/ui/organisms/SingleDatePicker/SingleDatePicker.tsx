import '../../DateRangePicker/DateRangePicker.css'

import { addDays } from 'date-fns'
import { useRef, useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'

import { cn } from '../../../../utils'
import { formatDateWithYear } from '../../../../utils/formatters'
import { Icon } from '../../atoms'
import { ValidationMessage } from '../../atoms/ValidationMessage/ValidationMessage'
import DateRangeButton from '../../DateRangePicker/DateRangeButton'

export interface SingleDatePickerProps {
  onDateChange?: (date: Date) => void
  value?: Date
  className?: string
  validationErrorMessage?: string
}

export const SingleDatePicker = ({
  value,
  onDateChange,
  className,
  validationErrorMessage,
}: SingleDatePickerProps) => {
  const [date, setDate] = useState<Date>(value || addDays(new Date(), 1))
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const editableDate = useRef(null)

  const handleOnDateChange = (date: DateObject) => {
    if (date && date.isValid) {
      setDate(date.toDate())
      onDateChange && onDateChange(date.toDate())
    }
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Escape' || evt.key === 'Enter') {
      evt.preventDefault()
      evt.currentTarget.blur()
      setIsEditing(false)
    }
  }

  const changeToEditMode = () => {
    setIsEditing(true)

    if (!editableDate.current) {
      return
    }

    // Focus the input
    ;(editableDate.current as any).focus()
  }

  return (
    <div className={cn(className)}>
      <DatePicker
        value={date}
        onChange={(value: DateObject) => {
          handleOnDateChange(value)
        }}
        format="DD/MM/YYYY"
        minDate={addDays(new Date(), 1)}
        maxDate={addDays(new Date(), 61)}
        arrow={false}
        weekDays={weekDays}
        offsetY={13}
        render={(value: string, openCalendar: () => void, onChange: any) => {
          return (
            <div className="flex w-[200px] items-center h-12 font-normal rounded-[0.25rem] border border-border-grey hover:border-border-grey-highlighted text-[#454D54]">
              {!isEditing && (
                <button
                  className="flex items-center w-full ml-3 mr-3 bg-white select-none"
                  onClick={changeToEditMode}
                >
                  {date && formatDateWithYear(date)}
                </button>
              )}

              <input
                ref={editableDate}
                onChange={onChange}
                value={value}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
                className={cn('w-1/2 ml-3 outline-none', {
                  // Have to hide the input when not editing because if not
                  // the input will be visible on top of the button
                  // and we need to have this element in the DOM
                  // as if not, it won't be possible to focus it
                  'absolute -z-50': !isEditing,
                })}
              />

              <button onClick={openCalendar} className="ml-auto mr-3">
                <Icon
                  name="calendar/16"
                  className="ml-auto transition stroke-control-grey-hover hover:stroke-control-grey"
                />
              </button>
            </div>
          )
        }}
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
      <div className="w-fit">
        <ValidationMessage
          variant="warning"
          message={validationErrorMessage}
          label="scheduleDate"
        />
      </div>
    </div>
  )
}

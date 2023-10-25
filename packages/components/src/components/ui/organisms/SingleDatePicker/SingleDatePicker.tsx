import '../../DateRangePicker/DateRangePicker.css'

import { addDays } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
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
  warningValidation?: (value: Date) => string | undefined
}

export const SingleDatePicker = ({
  value,
  onDateChange,
  className,
  validationErrorMessage,
  warningValidation,
}: SingleDatePickerProps) => {
  const [date, setDate] = useState<Date>(value || addDays(new Date(), 1))
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [warning, setWarning] = useState<string | undefined>(validationErrorMessage)

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const editableDate = useRef(null)

  const handleOnDateChange = (date: DateObject) => {
    if (date && date.isValid) {
      const validationResult = warningValidation && warningValidation(date.toDate())

      setDate(date.toDate())
      onDateChange && onDateChange(date.toDate())
      setWarning(validationResult)
    }
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Escape' || evt.key === 'Enter') {
      evt.preventDefault()
      evt.currentTarget.blur()
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (isEditing) {
      // Using this as a workaround to focus the input
      // ref.current?.focus() doesn't work
      window.document.getElementById('date-input')?.focus()
    }
  }, [isEditing])

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
                  className="flex items-center w-full ml-3 mr-3 bg-white select-none text-sm"
                  onClick={() => setIsEditing(true)}
                >
                  {date && formatDateWithYear(date)}
                </button>
              )}

              <InputMask
                id="date-input"
                inputRef={editableDate}
                mask="99/99/9999"
                placeholder="DD/MM/YYYY"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
                className={cn('w-1/2 ml-3 outline-none text-sm', {
                  // Have to hide the input when not editing because if not
                  // the input will be visible on top of the button
                  // and we need to have this element in the DOM
                  // as if not, it won't be possible to focus it
                  'absolute -z-50': !isEditing,
                })}
                onFocus={() => {}}
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
      <div className="mt-2 text-grey-text font-normal text-[0.813rem] leading-5 flex justify-between">
        <span>From tomorrow to a maximum of 60 days from tomorrow</span>
      </div>
      <div className="w-fit">
        <ValidationMessage variant="warning" message={warning} label="scheduleDate" />
      </div>
    </div>
  )
}

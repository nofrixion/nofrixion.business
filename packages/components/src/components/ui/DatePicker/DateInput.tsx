import { forwardRef, useState } from 'react'
import Icon from 'react-multi-date-picker/components/icon'

export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  validation?: (value: string) => string | undefined
  openCalendar: () => void
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, onBlur, validation, ...props }, ref) => {
    const [error, setError] = useState<string>()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)

      if (!validation || !error) {
        return
      }

      setError(validation(e.target.value))
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)

      if (!validation) {
        return
      }

      setError(validation(e.target.value))
    }

    return (
      <div>
        <div className="flex flex-col relative w-52 h-12">
          <Icon
            name="calendar/16"
            className="flex absolute top-3.5 right-4 stroke-control-grey-hover h-5 w-5 cursor-default"
          />
          <input
            ref={ref}
            //   id={textId}
            //   maxLength={maxLength}
            type="text"
            value={value}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            className="border border-border-grey rounded-[0.25rem] pl-3 w-full h-full inline-block font-normal text-sm/6 text-default-text"
            {...props}
            onClick={props.openCalendar}
          />
        </div>
        {/* <AnimatePresence>
        {error && (
          <AnimateHeightWrapper layoutId={`error-${label}`}>
            <div className="mt-2 bg-[#FCF5CF] text-sm p-3 rounded">{error}</div>
          </AnimateHeightWrapper>
        )}
      </AnimatePresence> */}
      </div>
    )
  },
)

DateInput.displayName = 'DateInput'

export default DateInput

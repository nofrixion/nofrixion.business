import { AnimatePresence } from 'framer-motion'
import { forwardRef, useId, useState } from 'react'

import AnimateHeightWrapper from '../../ui/utils/AnimateHeight'

export interface InputTextAreaFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string
  onChange?: (value: string) => void
  required?: boolean
  maxLength?: number
  validation?: (value: string) => string | undefined
  enableQuickValidation?: boolean // If enabled, the validation will be done on every change, not only after blur
  error?: string
  subText?: string
}
const InputTextAreaField = forwardRef<HTMLTextAreaElement, InputTextAreaFieldProps>(
  (
    {
      label,
      onChange,
      onBlur,
      validation,
      enableQuickValidation,
      value,
      required,
      maxLength,
      subText,
      ...props
    },
    ref,
  ) => {
    const textId = useId()

    const [error, setError] = useState<string>()

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange(e.target.value)

      if (!validation || (!enableQuickValidation && !error)) {
        return
      }

      setError(validation(e.target.value))
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur && onBlur(e)

      const value = e.target.value

      if (value && value != value.trimEnd()) {
        // If there is a value and the trimmed value at the end is not the same as the value, trim the end
        onChange && onChange(e.target.value.trimEnd())
      }

      if (!validation) {
        return
      }

      setError(validation(e.target.value))
    }

    return (
      <div>
        <div className="flex flex-col">
          <div className="py-2 flex justify-between">
            <label htmlFor={textId} className="text-default-text font-semibold text-sm leading-4">
              {label}
            </label>

            {required ? (
              <div className="text-grey-text font-normal text-xs leading-4">REQUIRED</div>
            ) : (
              <div className="text-grey-text font-normal text-xs leading-4">OPTIONAL</div>
            )}
          </div>
          <textarea
            id={textId}
            className="resize-none pl-3 pt-3 border border-border-grey rounded-[0.25rem] h-28 inline-block font-normal text-sm text-default-text"
            ref={ref}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            value={value}
            maxLength={maxLength}
            {...props}
          />
          {maxLength && (
            <div className="mt-2 text-grey-text font-normal text-[0.813rem] leading-5 flex justify-between">
              {subText && <span>{subText}</span>}
              <div className="ml-auto">
                {value?.toString().length}/{maxLength}
              </div>
            </div>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <AnimateHeightWrapper layoutId={`error-${label}`}>
              <div className="mt-2 bg-[#FCF5CF] text-sm p-3 rounded">{error}</div>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

InputTextAreaField.displayName = 'InputTextAreaField'

export default InputTextAreaField

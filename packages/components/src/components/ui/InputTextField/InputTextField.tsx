import { AnimatePresence } from 'framer-motion'
import { forwardRef, useId, useState } from 'react'

import { cn } from '../../../utils'
import AnimateHeightWrapper from '../../ui/utils/AnimateHeight'

export interface InputTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  required?: boolean
  validation?: (value: string) => string | undefined
  error?: string
  subText?: string
  requiredErrorPrompt?: boolean
}

const InputTextField = forwardRef<HTMLInputElement, InputTextFieldProps>(
  (
    {
      label,
      required,
      maxLength,
      value,
      placeholder,
      subText,
      requiredErrorPrompt,
      onChange,
      onBlur,
      validation,
      ...props
    },
    ref,
  ) => {
    const textId = useId()

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
        <div className="flex flex-col">
          <div className="py-2 flex justify-between">
            <label htmlFor={textId} className="text-default-text font-semibold text-sm leading-4">
              {label}
            </label>

            {required && (
              <div
                className={cn('text-grey-text font-normal text-xs leading-4', {
                  'text-[#F32448]': requiredErrorPrompt,
                })}
              >
                REQUIRED
              </div>
            )}
          </div>
          <input
            ref={ref}
            id={textId}
            maxLength={maxLength}
            type="text"
            value={value}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder={placeholder}
            className="pl-3 border border-border-grey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text"
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

InputTextField.displayName = 'InputTextField'

export default InputTextField

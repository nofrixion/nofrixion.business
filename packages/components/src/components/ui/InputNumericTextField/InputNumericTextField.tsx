import { AnimatePresence } from 'framer-motion'
import { forwardRef, useId, useState } from 'react'
import { useEffect } from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { cn } from '../../../utils'
import AnimateHeightWrapper from '../utils/AnimateHeight'

export interface InputNumericTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  required?: boolean
  validation?: (value: string) => string | undefined
  error?: string
  formSubmitClicked?: boolean
}

const InputNumericTextField = forwardRef<HTMLInputElement, InputNumericTextFieldProps>(
  ({
    label,
    required,
    maxLength,
    value,
    placeholder,
    formSubmitClicked,
    onChange,
    onBlur,
    validation,
    ...props
  }) => {
    const textId = useId()

    const [error, setError] = useState<string>()
    const [requiredErrorPrompt, setRequiredErrorPrompt] = useState<boolean>(false)
    const [fieldValue, setFieldValue] = useState<string>()

    useEffect(() => {
      if (formSubmitClicked && required && !fieldValue) {
        setRequiredErrorPrompt(true)
      } else {
        setRequiredErrorPrompt(false)
      }
    }, [formSubmitClicked])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)

      if (!validation || !error) {
        return
      }

      required && !e.target.value ? setRequiredErrorPrompt(true) : setRequiredErrorPrompt(false)

      setError(validation(e.target.value))
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)

      if (!validation) {
        return
      }

      setError(validation(e.target.value))
    }

    const maskOptions = {
      prefix: '',
      suffix: '',
      includeThousandsSeparator: false,
      allowDecimal: false,
      integerLimit: maxLength,
      allowNegative: false,
      allowLeadingZeroes: true,
    }

    const numberMask = createNumberMask({
      ...maskOptions,
    })

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
          <MaskedInput
            className="pl-3 border border-border-grey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text"
            placeholder={placeholder}
            mask={numberMask}
            inputMode="numeric"
            onBlur={handleOnBlur}
            onChange={(e) => {
              const masked = e.target.value
              // eslint-disable-next-line no-useless-escape
              e.target.value = e.target.value.replace(/[^\d\.\-]/g, '')
              handleOnChange && handleOnChange(e)
              e.target.value = masked
              setFieldValue(e.target.value)
            }}
            {...props}
          />
          {maxLength && (
            <div className="text-right mt-2 text-grey-text font-normal text-[0.813rem] leading-5">
              {value?.toString().length}/{maxLength}
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

InputNumericTextField.displayName = 'InputNumericTextField'

export default InputNumericTextField

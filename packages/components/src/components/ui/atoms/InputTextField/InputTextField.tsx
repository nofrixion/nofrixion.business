import { forwardRef, useEffect, useId, useState } from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { ValidationMessage } from '../ValidationMessage/ValidationMessage'

export interface InputTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'numeric'
  label: string
  required?: boolean
  warningValidation?: (value: string) => string | undefined
  error?: string
  formSubmitted?: boolean
  subText?: string
}

const InputTextField = forwardRef<HTMLInputElement, InputTextFieldProps>(
  (
    {
      variant = 'default',
      label,
      required,
      maxLength,
      value,
      placeholder,
      formSubmitted,
      subText,
      onChange,
      onBlur,
      warningValidation,
      ...props
    },
    ref,
  ) => {
    const textId = useId()

    const [warning, setWarning] = useState<string>()
    const [requiredErrorPrompt, setRequiredErrorPrompt] = useState<boolean>(false)

    useEffect(() => {
      if (!formSubmitted && !required) {
        return
      }

      if (formSubmitted && required && !value) {
        setRequiredErrorPrompt(true)
      } else {
        setRequiredErrorPrompt(false)
      }
    }, [formSubmitted])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)

      required && !e.target.value ? setRequiredErrorPrompt(true) : setRequiredErrorPrompt(false)

      if (!warningValidation || !warning) {
        return
      }

      setWarning(warningValidation(e.target.value))
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)

      if (!warningValidation) {
        return
      }

      setWarning(warningValidation(e.target.value))
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

            {requiredErrorPrompt && (
              <div className="text-[#F32448] font-normal text-xs leading-4">REQUIRED</div>
            )}
            {!required && (
              <div className="text-grey-text font-normal text-xs leading-4">OPTIONAL</div>
            )}
          </div>
          {variant === 'numeric' && (
            <MaskedInput
              className="pl-3 border border-border-grey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text disabled:bg-[#F6F8F9]"
              placeholder={placeholder}
              mask={numberMask}
              inputMode="numeric"
              onBlur={handleOnBlur}
              value={value}
              onChange={(e) => {
                const masked = e.target.value
                // eslint-disable-next-line no-useless-escape
                e.target.value = e.target.value.replace(/[^\d\.\-]/g, '')
                handleOnChange && handleOnChange(e)
                e.target.value = masked
              }}
              {...props}
            />
          )}
          {variant === 'default' && (
            <input
              ref={ref}
              id={textId}
              maxLength={maxLength}
              type="text"
              value={value}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder={placeholder}
              className="pl-3 border border-border-grey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text disabled:bg-[#F6F8F9]"
              {...props}
            />
          )}
          {maxLength && (
            <div className="mt-2 text-grey-text font-normal text-[0.813rem] leading-5 flex justify-between">
              {subText && <span>{subText}</span>}
              <div className="ml-auto">
                {value?.toString().length}/{maxLength}
              </div>
            </div>
          )}
        </div>
        <ValidationMessage variant="warning" message={warning} />
      </div>
    )
  },
)

InputTextField.displayName = 'InputTextField'

export default InputTextField

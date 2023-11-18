import { Combobox, Transition } from '@headlessui/react'
import { forwardRef, Fragment, InputHTMLAttributes, useId, useState } from 'react'

export interface InputAutoCompleteFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  autoSuggestions: string[]
  onChange?: (value: string) => void
}

const InputAutoCompleteField = forwardRef<HTMLInputElement, InputAutoCompleteFieldProps>(
  ({ autoSuggestions, maxLength, type, value, onChange, onBlur, placeholder }, ref) => {
    const textId = useId()

    const [filteredSuggestions, setFilteredSuggestions] = useState<string[] | undefined>(undefined)

    const [showAll, setShowAll] = useState<boolean>(false)

    const filterSuggestions = (query: string) => {
      if (query === '') {
        setFilteredSuggestions(autoSuggestions)
      } else if (query === 'all') {
        setFilteredSuggestions(autoSuggestions)
      } else {
        query &&
          setFilteredSuggestions(
            autoSuggestions.filter((autoSuggestion) =>
              autoSuggestion
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toString().toLowerCase().replace(/\s+/g, '')),
            ),
          )
      }
    }

    return (
      <div>
        <Combobox
          value={value ?? ''}
          onChange={(selectedValue) => {
            onChange && onChange(String(selectedValue))
          }}
        >
          {({ open }) => (
            <div className="relative">
              <div className="relative w-full">
                <Combobox.Input
                  className="pl-3 border border-border-grey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text disabled:bg-[#F6F8F9]"
                  displayValue={(value: string) => value}
                  onChange={(event) => {
                    setShowAll(false)
                    filterSuggestions(event.target.value)
                    onChange && onChange(event.target.value)
                  }}
                  onClick={() => {
                    if (!value) {
                      setShowAll(true)
                      filterSuggestions('all')
                    } else {
                      setShowAll(true)
                      filterSuggestions(String(value))
                    }
                  }}
                  onBlur={(event) => {
                    if (!value && showAll) {
                      setShowAll(false)
                    }
                    onBlur && onBlur(event)
                  }}
                  maxLength={maxLength}
                  ref={ref}
                  id={textId}
                  type={type}
                  value={value}
                  placeholder={placeholder}
                />
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={
                  open === true || (showAll && !value)
                    ? filteredSuggestions && filteredSuggestions.length !== 0
                    : open
                }
              >
                <Combobox.Options
                  static
                  className="absolute z-[100] mt-1 max-h-fit w-full overflow-auto rounded-lg bg-white py-[5px] text-base shadow-[0_10px_20px_0_rgba(0,0,0,0.1)] text-default-text focus:outline-none"
                >
                  {filteredSuggestions &&
                    filteredSuggestions.length !== 0 &&
                    filteredSuggestions.map((suggestion) => (
                      <Combobox.Option
                        key={suggestion}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-6 ${
                            active ? 'bg-grey-bg ' : 'text-gray-900'
                          }`
                        }
                        value={suggestion}
                      >
                        {({ selected }) => (
                          <span
                            className={`block leading-6 text-sm ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {suggestion}
                          </span>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Transition>
            </div>
          )}
        </Combobox>
      </div>
    )
  },
)

InputAutoCompleteField.displayName = 'InputAutoCompleteField'

export default InputAutoCompleteField

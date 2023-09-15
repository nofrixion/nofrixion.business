import { Combobox, Transition } from '@headlessui/react'
import { forwardRef, Fragment, useId, useState } from 'react'

export interface InputAutoCompleteFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  autoSuggestions: string[]
  onSelected?: (value: string) => void
}

const InputAutoCompleteField = forwardRef<HTMLInputElement, InputAutoCompleteFieldProps>(
  ({ autoSuggestions, maxLength, type, value, onChange, onBlur, placeholder, onSelected }, ref) => {
    const textId = useId()
    //const [selected, setSelected] = useState<string | undefined>('')

    const [filteredPeople, setFilteredPeople] = useState<string[] | undefined>(undefined)

    const [showAll, setShowAll] = useState<boolean>(false)

    const filterPeople = (query: string) => {
      if (query === '') {
        setFilteredPeople(autoSuggestions)
      } else if (query === 'all') {
        setFilteredPeople(autoSuggestions)
      } else {
        query &&
          setFilteredPeople(
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
            onSelected && onSelected(String(selectedValue))
          }}
        >
          {({ open }) => (
            <div className="relative">
              <div className="relative w-full ">
                <Combobox.Input
                  className="pl-3 border border-border-grey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text disabled:bg-[#F6F8F9]"
                  displayValue={(person: string) => person}
                  onChange={(event) => {
                    console.log('event.target.value', event.target.value)
                    setShowAll(false)
                    onSelected && onSelected(event.target.value)
                    filterPeople(event.target.value)
                    onChange && onChange(event)
                  }}
                  onClick={() => {
                    if (!value) {
                      setShowAll(true)
                      filterPeople('all')
                    } else {
                      setShowAll(true)
                      filterPeople(String(value))
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
                    ? filteredPeople && filteredPeople.length !== 0
                    : open
                }
              >
                <Combobox.Options
                  static
                  className="absolute mt-1 max-h-fit w-full overflow-auto rounded-lg bg-white py-[5px] text-base shadow-[0_10px_20px_0_rgba(0,0,0,0.1)] text-default-text focus:outline-none"
                >
                  {filteredPeople &&
                    filteredPeople.length !== 0 &&
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-6 ${
                            active ? 'bg-grey-bg ' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block leading-6 text-sm ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person}
                            </span>
                          </>
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

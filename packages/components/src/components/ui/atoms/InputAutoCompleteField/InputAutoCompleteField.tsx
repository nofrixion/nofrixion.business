import { Combobox, Transition } from '@headlessui/react'
import { forwardRef, Fragment, useState } from 'react'

import { InputTextFieldProps } from '../InputTextField/InputTextField'

const people: string[] = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
]

const InputAutoCompleteField = forwardRef<HTMLInputElement, InputTextFieldProps>(() => {
  const [selected, setSelected] = useState<string | undefined>()

  const [filteredPeople, setFilteredPeople] = useState<string[] | undefined>(undefined)

  const [showAll, setShowAll] = useState<boolean>(false)

  const filterPeople = (query: string) => {
    if (query === '') {
      setFilteredPeople(people)
    } else if (query === 'all') {
      setFilteredPeople(people)
    } else {
      query &&
        setFilteredPeople(
          people.filter((person) =>
            person
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')),
          ),
        )
    }
  }

  return (
    <div className="fixed top-16 w-72">
      <Combobox value={selected ?? ''} onChange={setSelected}>
        {({ open }) => (
          <div>
            <Combobox.Input
              className="pl-3 border border-border-grey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text disabled:bg-[#F6F8F9]"
              displayValue={(person: string) => person}
              onChange={(event) => {
                setShowAll(false)
                setSelected(event.target.value)
                filterPeople(event.target.value)
              }}
              onClick={() => {
                console.log('selected', selected)
                if (!selected) {
                  setShowAll(true)
                  filterPeople('all')
                } else {
                  setShowAll(true)
                  filterPeople(selected)
                }
              }}
              onBlur={() => {
                if (!selected && showAll) {
                  setShowAll(false)
                }
              }}
            />
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={
                open === true || (showAll && !selected)
                  ? filteredPeople && filteredPeople.length !== 0
                  : open
              }
            >
              <div>
                <Combobox.Options
                  static
                  className=" mt-1 max-h-fit w-full overflow-auto rounded-lg bg-white py-[5px] text-base shadow-[0_10px_20px_0_rgba(0,0,0,0.1)] text-default-text focus:outline-none"
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
              </div>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  )
})

InputAutoCompleteField.displayName = 'InputAutoCompleteField'

export default InputAutoCompleteField

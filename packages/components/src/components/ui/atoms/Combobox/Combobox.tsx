import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

const people: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]

interface Person {
  id: number
  name: string
}

export default function Example() {
  const [selected, setSelected] = useState<Person | undefined>()
  //const [query, setQuery] = useState('')
  const [filteredPeople, setFilteredPeople] = useState<Person[] | undefined>(undefined)
  const [value, setValue] = useState('')

  const [command, setCommand] = useState<string | undefined>(undefined)

  const filterPeople = (query: string) => {
    console.log('query', query)
    if (query === 'hide') {
      setFilteredPeople(undefined)
    } else if (query === '') {
      setFilteredPeople(people)
    } else if (query === 'all') {
      setFilteredPeople(people)
    } else {
      setFilteredPeople(
        people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        ),
      )
    }
  }

  useEffect(() => {
    console.log('filteredPeople', filteredPeople)
  }, [filteredPeople])

  return (
    <div className="fixed top-16 w-72">
      <Combobox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(person: Person) => person.name}
                onChange={(event) => {
                  setCommand(undefined)
                  setValue(event.target.value)
                  setSelected(undefined)
                  filterPeople(event.target.value)
                }}
                onClick={() => {
                  if (value === '') {
                    setCommand('all')
                    filterPeople('all')
                  }
                }}
                onBlur={() => {
                  if (value === '' && command === 'all') {
                    setCommand(undefined)
                  }
                }}
              />
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              // afterLeave={() => filterPeople('hide')}
              show={
                open === true || command === 'all'
                  ? filteredPeople && filteredPeople.length !== 0
                  : open
              }
            >
              <div>
                <Combobox.Options
                  static
                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {filteredPeople &&
                    filteredPeople.length !== 0 &&
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              ></span>
                            ) : null}
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
}

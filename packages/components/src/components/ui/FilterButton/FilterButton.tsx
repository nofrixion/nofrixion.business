﻿import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Children, isValidElement, useState } from 'react'

export type FilterButtonFC = React.FC<FilterButtonProps> & {
  FilteredLayout: React.FC<FilterButtonFilteredLayoutProps>
  Body: React.FC<FilterButtonBody>
}

export interface FilterButtonProps {
  defaultIconSource?: string
  highlightedIconSource?: string
  label: string
  isFiltered: boolean
  children?: React.ReactNode
  onReset?: () => void
  onCancel?: () => void
  onApply?: () => void
}

export interface FilterButtonFilteredLayoutProps {
  children?: React.ReactNode
}

export interface FilterButtonBody {
  children?: React.ReactNode
}

const FilterButton: FilterButtonFC = ({
  defaultIconSource,
  highlightedIconSource,
  label,
  isFiltered = false,
  children,
  onReset,
  onApply,
  onCancel,
}) => {
  let filteredLayout: React.ReactNode | undefined
  let body: React.ReactNode | undefined
  const [iconSource, setIconSource] = useState<string | undefined>(defaultIconSource)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const filterButtonClassNames =
    'outline-none inline-flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-grey-bg hover:text-default-text transition-all'
  const actionButtonClassNames =
    'outline-none px-3 py-1 cursor-pointer leading-6 text-13px rounded-full transition-all'

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type !== 'string') {
      switch (child.type.name) {
        case FilterButtonFilteredLayout.name:
          filteredLayout = child
          break
        case FilterButtonBody.name:
          body = child
          break
      }
    }
  })

  const onMouseOver = () => {
    setIconSource(highlightedIconSource)
  }

  const onMouseOut = () => {
    setIconSource(defaultIconSource)
  }

  const onCancelClick = () => {
    if (onCancel) {
      onCancel()
    }

    setIsDialogOpen(false)
  }

  const onApplyClick = () => {
    if (onApply) {
      onApply()
    }

    setIsDialogOpen(false)
  }

  const onDropdownOpenChange = (open: boolean) => {
    if (onCancel && !open) {
      onCancel()
    }

    setIsDialogOpen(open)
  }

  return (
    <>
      <DropdownMenu.Root open={isDialogOpen} onOpenChange={onDropdownOpenChange}>
        <DropdownMenu.Trigger asChild>
          <button
            className={classNames(filterButtonClassNames, {
              'text-grey-text': !isDialogOpen,
              'text-default-text': isDialogOpen,
              'bg-grey-bg': isFiltered && filteredLayout,
            })}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {isFiltered && filteredLayout ? (
              filteredLayout
            ) : (
              <>
                {iconSource && (
                  <img
                    src={isDialogOpen ? highlightedIconSource : iconSource}
                    alt={label}
                    className="w-4 h-4"
                    title={label}
                  />
                )}
                <span className="text-sm">{label}</span>
              </>
            )}
          </button>
        </DropdownMenu.Trigger>
        <AnimatePresence>
          {isDialogOpen && (
            <DropdownMenu.Portal forceMount>
              <DropdownMenu.Content sideOffset={5} collisionPadding={40} side="bottom" asChild>
                <motion.div
                  className="rounded-lg py-6 px-8 bg-white min-w-[20rem] max-w-[40rem] select-none shadow-[0px_0px_16px_rgba(4,_41,_49,_0.15)] text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col space-y-8">
                    {body}
                    <div className="flex justify-between">
                      <button
                        className={classNames(
                          actionButtonClassNames,
                          'bg-white text-default-text border border-solid border-border-grey hover:border-border-grey-highlighted',
                        )}
                        onClick={onReset}
                      >
                        Reset
                      </button>
                      <div className="flex flex-row gap-x-4">
                        <button
                          className={classNames(
                            actionButtonClassNames,
                            'bg-white text-grey-text hover:text-default-text',
                          )}
                          onClick={onCancelClick}
                        >
                          Cancel
                        </button>
                        <button
                          className={classNames(
                            actionButtonClassNames,
                            'bg-primary-green font-semibold text-white rounded-full hover:bg-primary-green-hover',
                          )}
                          onClick={onApplyClick}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          )}
        </AnimatePresence>
      </DropdownMenu.Root>
    </>
  )
}

const FilterButtonFilteredLayout: React.FC<FilterButtonFilteredLayoutProps> = ({ children }) => {
  return <>{children}</>
}

const FilterButtonBody: React.FC<FilterButtonBody> = ({ children }) => {
  return <>{children}</>
}

FilterButton.FilteredLayout = FilterButtonFilteredLayout
FilterButton.Body = FilterButtonBody
export default FilterButton

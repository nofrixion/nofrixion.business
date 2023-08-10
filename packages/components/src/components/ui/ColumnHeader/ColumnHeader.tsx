import classNames from 'classnames'
import { useEffect, useState } from 'react'

export enum SortDirection {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ColumnHeaderProps {
  label: string
  onSort: (event: SortDirection) => void
}

const ColumnHeader = ({ label, onSort }: ColumnHeaderProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.NONE)

  useEffect(() => {
    onSort(sortDirection)
  }, [sortDirection])

  const doSort = () => {
    if (sortDirection === SortDirection.NONE) {
      setSortDirection(SortDirection.DESC)
    } else if (sortDirection === SortDirection.DESC) {
      setSortDirection(SortDirection.ASC)
    } else {
      setSortDirection(SortDirection.NONE)
    }
  }

  return (
    <button className="columnSort group" onClick={doSort}>
      <span className="select-none uppercase">{label}</span>

      <div
        className="ml-2.5 space-y-1 w-2.5 transition opacity-0 group-hover:opacity-100 data-[direction-selected='true']:opacity-100"
        data-direction-selected={sortDirection != SortDirection.NONE}
      >
        <svg
          className={classNames({
            'stroke-control-grey-hover': sortDirection === SortDirection.ASC,
            'stroke-control-grey':
              sortDirection === SortDirection.NONE || sortDirection === SortDirection.DESC,
          })}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 5L5 1L9 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          className={classNames({
            'stroke-control-grey-hover': sortDirection === SortDirection.DESC,
            'stroke-control-grey':
              sortDirection === SortDirection.NONE || sortDirection === SortDirection.ASC,
          })}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 1L5 5L1 1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}

export default ColumnHeader

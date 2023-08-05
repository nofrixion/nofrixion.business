import * as React from "react";
const { useEffect, useState } = React;
import { cn } from "@nofrixion/utils";
import { SortDirection } from "@nofrixion/utils/types";

interface ColumnHeaderProps {
  label: string;
  onSort: (event: SortDirection) => void;
}
export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ label, onSort }) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.NONE);

  useEffect(() => {
    onSort(sortDirection);
  }, [sortDirection]);

  const doSort = () => {
    if (sortDirection === SortDirection.NONE) {
      setSortDirection(SortDirection.DESC);
    } else if (sortDirection === SortDirection.DESC) {
      setSortDirection(SortDirection.ASC);
    } else {
      setSortDirection(SortDirection.NONE);
    }
  };

  return (
    <button className="columnSort group" onClick={doSort}>
      <span className="select-none uppercase">{label}</span>

      <div
        className="ml-2.5 space-y-1 w-2.5 transition opacity-0 group-hover:opacity-100 data-[direction-selected='true']:opacity-100"
        data-direction-selected={sortDirection != SortDirection.NONE}
      >
        <svg
          className={cn({
            "stroke-controlGreyHover": sortDirection === SortDirection.ASC,
            "stroke-controlGrey": sortDirection === SortDirection.NONE || sortDirection === SortDirection.DESC,
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
          className={cn({
            "stroke-controlGreyHover": sortDirection === SortDirection.DESC,
            "stroke-controlGrey": sortDirection === SortDirection.NONE || sortDirection === SortDirection.ASC,
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
  );
};

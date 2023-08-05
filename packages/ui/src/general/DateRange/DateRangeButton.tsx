import { cn } from "@nofrixion/utils";
import * as React from "react";
import { MouseEventHandler } from "react";

interface DateRangeButtonProps {
  direction: string;
  handleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean;
}

const svgClassNames = (disabled: boolean) => {
  return cn("h-3 w-3 stroke-controlGrey", {
    "cursor-default": disabled,
    "cursor-pointer group-hover:stroke-controlGreyHover": !disabled,
  });
};

const DateRangeButton: React.FC<DateRangeButtonProps> = ({ direction, handleClick, disabled }) => {
  return (
    <>
      {direction === "right" && (
        <button className="group px-2 py-2" onClick={handleClick}>
          <svg
            className={svgClassNames(disabled)}
            width="6"
            height="12"
            viewBox="0 0 6 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 12.5L7 6.5L0.999999 0.500001" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {direction === "left" && (
        <button className="group px-2 py-2" onClick={handleClick}>
          <svg
            className={svgClassNames(disabled)}
            width="6"
            height="12"
            viewBox="0 0 6 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.5 0.5L0.5 6.5L6.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
};

export default DateRangeButton;

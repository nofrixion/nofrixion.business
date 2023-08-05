import * as React from "react";
import { format, isEqual } from "date-fns";
import { useEffect, useState } from "react";
import { getDateFormat } from "@nofrixion/utils";
import ResizableComponent from "../ResizableComponent";

interface DateRangeInputProps {
  value: string[]; // [fromDate, toDate]
  openCalendar: () => void;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({ value, openCalendar }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");
  let fromDate: Date | undefined;
  let toDate: Date | undefined;

  if (value[0]) {
    fromDate = new Date(value[0]);
  }

  if (value[1]) {
    toDate = new Date(value[1]);
  }

  useEffect(() => {
    if (fromDate && toDate) {
      const dateFormat = getDateFormat(fromDate);

      if (isEqual(fromDate.getTime(), toDate.getTime())) {
        setFormattedDate(`${format(fromDate, dateFormat)}`);
      } else {
        setFormattedDate(`${format(fromDate, dateFormat)} - ${format(toDate, dateFormat)}`);
      }
    } else if (fromDate) {
      setFormattedDate(`${format(fromDate, getDateFormat(fromDate))}`);
    }
  }, [fromDate, toDate]);

  return (
    <div className="flex">
      <ResizableComponent>
        <button className="pl-4" onClick={openCalendar}>
          {formattedDate}
        </button>
      </ResizableComponent>
    </div>
  );
};

export default DateRangeInput;

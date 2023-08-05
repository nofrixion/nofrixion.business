import { isToday, isYesterday, isEqual, startOfDay, add } from "date-fns";
import { TDateRangeOptions } from "../molecules";

const getSelectRangeText = (fromDate: Date, toDate: Date): TDateRangeOptions | undefined => {
  if (isToday(fromDate) && isToday(toDate)) {
    return "today";
  } else if (isYesterday(fromDate) && isYesterday(toDate)) {
    return "yesterday";
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -7 })))) {
    return "last7Days";
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -30 })))) {
    return "last30Days";
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -90 })))) {
    return "last90Days";
  } else {
    return undefined;
  }
};

export { getSelectRangeText };

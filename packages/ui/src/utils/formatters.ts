import { isToday, isYesterday, isEqual, startOfDay, add } from "date-fns";
import { SortDirection } from "../general/ColumnHeader";
import { TDateRangeOptions } from "../molecules";

/**
 * Formats the given sort direction into a string that can be used in the API
 * @param statusSortDirection The sort direction for the status column
 * @param createdSortDirection The sort direction for the created/inserted column
 * @param contactSortDirection The sort direction for the CustomerEmailAddress column
 * @param amountSortDirection The sort direction for the amount column
 * @returns An expression to sort the order of the payment requests. Example "Amount desc,Inserted asc".
 */
const formatPaymentRequestSortExpression = (
  statusSortDirection: SortDirection,
  createdSortDirection: SortDirection,
  contactSortDirection: SortDirection,
  amountSortDirection: SortDirection,
): string => {
  let sortExpression = "";

  if (statusSortDirection !== SortDirection.NONE) {
    sortExpression += `Status ${statusSortDirection}`;
  }

  if (createdSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? "," : "";
    sortExpression += `Inserted ${createdSortDirection}`;
  }

  if (contactSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? "," : "";
    sortExpression += `CustomerEmailAddress ${contactSortDirection}`;
  }

  if (amountSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? "," : "";
    sortExpression += `Amount ${amountSortDirection}`;
  }

  return sortExpression;
};

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

export { formatPaymentRequestSortExpression, getSelectRangeText };

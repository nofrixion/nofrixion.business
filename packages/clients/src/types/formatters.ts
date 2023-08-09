import { SortDirection } from './Enums'

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
  let sortExpression = ''

  if (statusSortDirection !== SortDirection.NONE) {
    sortExpression += `Status ${statusSortDirection}`
  }

  if (createdSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Inserted ${createdSortDirection}`
  }

  if (contactSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `CustomerEmailAddress ${contactSortDirection}`
  }

  if (amountSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Amount ${amountSortDirection}`
  }

  return sortExpression
}

export { formatPaymentRequestSortExpression }

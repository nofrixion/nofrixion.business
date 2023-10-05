import { SortDirection } from './Enums'

interface SortExpressionProps {
  statusSortDirection?: SortDirection
  createdSortDirection?: SortDirection
  contactSortDirection?: SortDirection
  amountSortDirection?: SortDirection
  dateSortDirection?: SortDirection
  toSortDirection?: SortDirection
  referenceSortDirection?: SortDirection
  descriptionSortDirection?: SortDirection
  typeSortDirection?: SortDirection
  counterPartyNameSortDirection?: SortDirection
  lastModifiedSortDirection?: SortDirection
  nameSortDirection?: SortDirection
  roleSortDirection?: SortDirection
  forSortDirection?: SortDirection
}

/**
 * Formats the given sort direction into a string that can be used in the API
 * @param SortExpressionProps Props containing the sort directions
 * @returns An expression to sort the order of the records. Example "Amount desc,Inserted asc".
 */

const formatSortExpression = ({ ...props }: SortExpressionProps): string => {
  let sortExpression = ''

  if (props.dateSortDirection && props.dateSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Inserted ${props.dateSortDirection}`
  } else if (props.createdSortDirection && props.createdSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Inserted ${props.createdSortDirection}`
  }

  if (props.toSortDirection && props.toSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Counterparty.Name ${props.toSortDirection}`
  }

  if (props.referenceSortDirection && props.referenceSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `TheirReference ${props.referenceSortDirection}`
  }

  if (props.amountSortDirection && props.amountSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Amount ${props.amountSortDirection}`
  }

  if (props.descriptionSortDirection && props.descriptionSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Description ${props.descriptionSortDirection}`
  }

  if (props.typeSortDirection && props.typeSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Type ${props.typeSortDirection}`
  }

  if (props.statusSortDirection && props.statusSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Status ${props.statusSortDirection}`
  }

  if (props.contactSortDirection && props.contactSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `CustomerEmailAddress ${props.contactSortDirection}`
  }

  if (
    props.counterPartyNameSortDirection &&
    props.counterPartyNameSortDirection !== SortDirection.NONE
  ) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `DestinationAccountName ${props.counterPartyNameSortDirection}`
  }

  if (props.lastModifiedSortDirection && props.lastModifiedSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `LastModified ${props.lastModifiedSortDirection}`
  }

  if (props.nameSortDirection && props.nameSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Name ${props.nameSortDirection}`
  }

  if (props.roleSortDirection && props.roleSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `RoleType ${props.roleSortDirection}`
  }

  if (props.forSortDirection && props.forSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : ''
    sortExpression += `Title ${props.forSortDirection}`
  }

  return sortExpression
}

export { formatSortExpression }

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
}

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

  return sortExpression
}

export { formatSortExpression }

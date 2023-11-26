import { SortDirection } from './Enums'

interface SortExpressionProps {
  name?:
    | 'status'
    | 'created'
    | 'contact'
    | 'amount'
    | 'date'
    | 'to'
    | 'reference'
    | 'description'
    | 'type'
    | 'counterPartyName'
    | 'lastModified'
    | 'name'
    | 'role'
    | 'title'
    | 'numberOfTransactions'
    | 'scheduleDate'
  direction?: SortDirection
}

/**
 * Formats the given sort direction into a string that can be used in the API
 * @param SortExpressionProps Props containing the sort directions
 * @returns An expression to sort the order of the records. Example "Amount desc,Inserted asc".
 */

const formatSortExpression = ({ name, direction }: SortExpressionProps): string => {
  let sortExpression = ''

  if (!name || !direction || direction === SortDirection.NONE) {
    return sortExpression
  }

  switch (name) {
    case 'status':
      sortExpression = `Status ${direction}`
      break
    case 'created':
      sortExpression = `Inserted ${direction}`
      break
    case 'contact':
      sortExpression = `CustomerEmailAddress ${direction}`
      break
    case 'amount':
      sortExpression = `Amount ${direction}`
      break
    case 'to':
      sortExpression = `DestinationAccountName ${direction}`
      break
    case 'reference':
      sortExpression = `TheirReference ${direction}`
      break
    case 'description':
      sortExpression = `Description ${direction}`
      break
    case 'type':
      sortExpression = `Type ${direction}`
      break
    case 'counterPartyName':
      sortExpression = `DestinationAccountName ${direction}`
      break
    case 'lastModified':
      sortExpression = `LastModified ${direction}`
      break
    case 'name':
      sortExpression = `Name ${direction}`
      break
    case 'role':
      sortExpression = `RoleType ${direction}`
      break
    case 'title':
      sortExpression = `Title ${direction}`
      break
    case 'numberOfTransactions':
      sortExpression = `NumberOfTransactions ${direction}`
      break
    case 'scheduleDate':
      sortExpression = `ScheduleDate ${direction}`
      break
  }
  return sortExpression
}

export { formatSortExpression }

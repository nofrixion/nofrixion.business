/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { formatCurrency } from '@nofrixion/components/src/utils/uiFormaters'
import { formatDistanceToNowStrict, isToday, isYesterday } from 'date-fns'

// Get "Avatar" string form of Merchant name
// The merchant name should be the first character of each word in the name up to 2 words
// If the merchant name is one word, return the first two characters
// If the merchant name is two words or more words, return the first character of each word
// If merchant name is
// - "NoFrixion", return "NO"
import { Currency } from './types/localTypes'

// - "Green Bench", return "GB"
const getAvatarName = (name: string): string => {
  // Source: https://stackoverflow.com/a/63763497
  return name
    .match(/(^\S\S?|\b\S)?/g)
    ?.join('')
    ?.match(/(^\S|\S$)?/g)
    ?.join('')
    .toUpperCase()!
}

// Formats the given amount into a currency string.
// For example:
// - 10.5 -> '10.50'
// - 10.55 -> '10.55'
// - 115949 -> '115,949.00'
// - 29 -> '29.00'
// - 32 -> '32.00'
// - 89.99 -> '89.99'
// - 123456789 -> '123,456,789.00'
// - 115.5 -> '115.50'
// - 699.9 -> '699.90'
const formatAmount = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return formattedAmount
}

const displayAmount = (amount: number, currency: Currency): string => {
  return `${formatCurrency(currency)} ${formatAmount(amount)}`
}

// This function formats a date as a string, returning a human-readable
// representation of either "Today" or "Yesterday" if the date is within the
// last 48 hours, or a human-readable representation of the distance to the
// date otherwise.
//
// If the date is today, returns "Today"
// If the date is yesterday, returns "Yesterday"
// Otherwise, returns a human-readable representation of the distance to the
// date, such as "2 days ago"
const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return 'Today'
  } else if (isYesterday(date)) {
    return 'Yesterday'
  }

  return formatDistanceToNowStrict(date, { addSuffix: true })
}

export { displayAmount, formatAmount, formatDate, getAvatarName }

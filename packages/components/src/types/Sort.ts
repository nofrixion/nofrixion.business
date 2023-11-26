import { SortDirection } from '@nofrixion/moneymoov'

export interface Sort<T> {
  name: T
  direction: SortDirection
}

export type SortByTransactions = Sort<'created' | 'amount'>

export type SortByPayouts = Sort<
  'created' | 'status' | 'amount' | 'counterPartyName' | 'scheduleDate'
>

export type SortByPaymentRequests = Sort<'created' | 'amount' | 'title'>

export type SortByUsersAndInvites = Sort<'status' | 'lastModified' | 'name' | 'role'>

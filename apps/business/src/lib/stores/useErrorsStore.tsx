import { ApiError } from '@nofrixion/moneymoov'
import { create } from 'zustand'

export enum ErrorType {
  PAYOUT = 'PAYOUT',
}

export type Error = {
  type: ErrorType
  id: string
  error: ApiError
}

export interface ErrorState {
  errors: Error[]
  addError: (error: Error) => void
  removeError: (id: string) => void
}

export const useErrorsStore = create<ErrorState>((set) => ({
  errors: [],

  addError: (error: Error) => {
    set((state) => ({
      errors: [...state.errors, error],
    }))
  },

  removeError: (id: string) => {
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
    }))
  },
}))

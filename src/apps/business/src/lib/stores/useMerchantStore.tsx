import { Merchant } from '../types/localTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MerchantStore = {
  merchant?: Merchant
  setMerchant: (merchant: Merchant) => void
}

// This is a store that persists the merchant in the local storage
const useMerchantStore = create<MerchantStore>()(
  persist(
    (set) => ({
      merchant: undefined,
      setMerchant: (merchant: Merchant) => set(() => ({ merchant })),
    }),
    {
      name: 'merchant-storage',
    },
  ),
)

export default useMerchantStore

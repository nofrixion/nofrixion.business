import { create } from 'zustand'

import { Merchant } from '../types/localTypes'

type MerchantsStore = {
  merchants?: Merchant[]
  setMerchants: (merchants: Merchant[]) => void
}

const useMerchantsStore = create<MerchantsStore>()((set) => ({
  merchants: undefined,
  setMerchants: (merchants: Merchant[]) => set(() => ({ merchants })),
}))

export default useMerchantsStore

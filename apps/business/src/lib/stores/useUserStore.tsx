import { create } from 'zustand'

import { LocalUser } from '../types/localTypes'

type UserStore = {
  user?: LocalUser
  setUser: (user: LocalUser) => void
}

const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  setUser: (user: LocalUser) => set(() => ({ user })),
}))

export default useUserStore

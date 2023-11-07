import { LocalUser } from '@nofrixion/components/src/types/LocalTypes'
import { create } from 'zustand'

type UserStore = {
  user?: LocalUser
  setUser: (user: LocalUser) => void
}

const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  setUser: (user: LocalUser) => set(() => ({ user })),
}))

export default useUserStore

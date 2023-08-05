import { User } from '../types/localTypes'
import { create } from 'zustand'

type UserStore = {
  user?: User
  setUser: (user: User) => void
}

const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  setUser: (user: User) => set(() => ({ user })),
}))

export default useUserStore

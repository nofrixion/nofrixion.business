import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserSettings = {
  connectMaybeLater: boolean
}

interface UserSettingsState {
  settings?: UserSettings
  update: (settings: UserSettings) => void
}

export const useUserSettings = create<UserSettingsState>()(
  persist(
    (set) => ({
      settings: undefined,
      update: (settings: UserSettings) => set(() => ({ settings })),
    }),
    {
      name: 'user-settings',
    },
  ),
)

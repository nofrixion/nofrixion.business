import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserSettings = {
  connectMaybeLater: boolean
}

interface UserSettingsState {
  userSettings?: UserSettings
  updateUserSettings: (settings: UserSettings) => void
}

export const useUserSettings = create<UserSettingsState>()(
  persist(
    (set) => ({
      userSettings: undefined,
      updateUserSettings: (userSettings: UserSettings) => set(() => ({ userSettings })),
    }),
    {
      name: 'mm4b-user-settings',
    },
  ),
)

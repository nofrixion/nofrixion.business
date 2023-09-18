import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AutoSuggestions } from '../../types/LocalTypes'

type AutoSuggestionStore = {
  autoSuggestions?: AutoSuggestions[]
  setAutoSuggestions: (autoSuggestions: AutoSuggestions[]) => void
}

// This is a store that persists the autosuggestions in the local storage
const useAutoSuggestionsStore = create<AutoSuggestionStore>()(
  persist(
    (set) => ({
      autoSuggestions: undefined,
      setAutoSuggestions: (autoSuggestions: AutoSuggestions[]) => set(() => ({ autoSuggestions })),
    }),
    {
      name: 'autosuggestions-storage',
    },
  ),
)

export default useAutoSuggestionsStore

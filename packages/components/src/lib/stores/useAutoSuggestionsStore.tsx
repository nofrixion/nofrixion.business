import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AutoSuggestion } from '../../types/LocalTypes'

type AutoSuggestionStore = {
  autoSuggestions?: AutoSuggestion[]
  setAutoSuggestions: (autoSuggestions: AutoSuggestion[]) => void
}

// This is a store that persists the autosuggestions in the local storage
const useAutoSuggestionsStore = create<AutoSuggestionStore>()(
  persist(
    (set) => ({
      autoSuggestions: undefined,
      setAutoSuggestions: (autoSuggestions: AutoSuggestion[]) => set(() => ({ autoSuggestions })),
    }),
    {
      name: 'autosuggestions-storage',
    },
  ),
)

export default useAutoSuggestionsStore

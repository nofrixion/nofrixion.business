import { FieldID } from '../types/LocalEnums'
import { AutoSuggestionAdd, AutoSuggestions } from '../types/LocalTypes'

export const getRoute = (route: string) => {
  const pullRequestId = import.meta.env.VITE_NOFRIXION_PULL_REQUEST_ID

  return pullRequestId ? `/${pullRequestId}${route}` : route
}

export const addAutoSuggestion = (
  fieldValue: string,
  existingSuggestions: AutoSuggestions[] | undefined,
  fieldId: FieldID,
): AutoSuggestions[] => {
  const autosuggestions: AutoSuggestions[] = existingSuggestions ?? []

  const fieldAutoSuggestions = autosuggestions.find(
    (autoSuggestion) => autoSuggestion.fieldId === fieldId,
  )

  if (
    fieldAutoSuggestions &&
    !fieldAutoSuggestions.values.find((value) => value.value === fieldValue)
  ) {
    const last5Values = fieldAutoSuggestions.values ?? []
    if (last5Values.length === 5) {
      last5Values.shift()
    }

    last5Values.push({
      value: fieldValue,
      inserted: new Date(),
    })

    fieldAutoSuggestions.values = last5Values

    const fieldSuggestionIndex = autosuggestions.findIndex(
      (autoSuggestion) => autoSuggestion.fieldId === fieldId,
    )

    if (fieldSuggestionIndex !== -1) {
      autosuggestions[fieldSuggestionIndex] = fieldAutoSuggestions!
    }
  } else if (!fieldAutoSuggestions) {
    autosuggestions.push({
      fieldId: fieldId,
      values: [{ value: fieldValue, inserted: new Date() }],
    })
  }

  return autosuggestions
}

export const addAutoSuggestions = (
  autoSuggestionsToAdd: AutoSuggestionAdd[],
  existingSuggestions: AutoSuggestions[] | undefined,
): AutoSuggestions[] => {
  let newSuggestions = existingSuggestions ?? []
  autoSuggestionsToAdd.forEach((autoSuggestionToAdd) => {
    newSuggestions = addAutoSuggestion(
      autoSuggestionToAdd.value,
      newSuggestions,
      autoSuggestionToAdd.fieldId,
    )
  })

  return newSuggestions
}

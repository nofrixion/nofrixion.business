import { useEffect,useState } from 'react'

import disabledTagIcon from '../../../assets/icons/tag-icon-disabled.svg'
import enabledTagIcon from '../../../assets/icons/tag-icon-enabled.svg'
import FilterButton from '../FilterButton/FilterButton'
import SelectablePill from '../SelectablePill/SelectablePill'

export interface FilterableTag {
  id: string
  label: string
  isSelected: boolean
}

export interface TagFilterProps {
  tags: FilterableTag[]
  setTags: (tags: FilterableTag[]) => void
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, setTags }) => {
  const [localTags, setLocalTags] = useState<FilterableTag[]>([...tags])
  const [isFiltered, setIsFiltered] = useState<boolean>(false)

  useEffect(() => {
    const tempArray = tags.map((tag) => ({ ...tag }))
    setLocalTags([...tempArray])
    checkIfIsFiltered()
  }, [tags])

  const onReset = () => {
    const tempArray = localTags.map((tag) => ({ ...tag }))
    tempArray.forEach((tag) => (tag.isSelected = false))
    setLocalTags([...tempArray])
    setTags([...tempArray])
  }

  const onCancel = () => {
    const tempArray = tags.map((tag) => ({ ...tag }))
    setLocalTags([...tempArray])
  }

  const onApply = () => {
    const tempArray = localTags.map((tag) => ({ ...tag }))
    setTags([...tempArray])
    let isFiltered = false
    localTags.forEach((tag) => {
      if (tag.isSelected) {
        isFiltered = true
      }
    })
    setIsFiltered(isFiltered)
  }

  const checkIfIsFiltered = () => {
    let isFiltered = false
    tags.forEach((tag) => {
      if (tag.isSelected) {
        isFiltered = true
      }
    })
    setIsFiltered(isFiltered)
  }

  const getSelectedTagsLegend = () => {
    let selectedTagsCount = 0
    tags.forEach((tag) => {
      if (tag.isSelected) {
        selectedTagsCount++
      }
    })

    if (selectedTagsCount === 1) {
      return `1 tag applied`
    } else {
      return `${selectedTagsCount} tags applied`
    }
  }

  return (
    <FilterButton
      label="Tags"
      isFiltered={isFiltered}
      defaultIconSource={disabledTagIcon}
      highlightedIconSource={enabledTagIcon}
      onReset={onReset}
      onApply={onApply}
      onCancel={onCancel}
    >
      <FilterButton.Body>
        <div className="flex gap-x-2 flex-wrap gap-y-3.5 justify-items-center">
          {localTags.map((tag, index) => (
            <SelectablePill
              key={index}
              label={tag.label}
              selected={tag.isSelected}
              onSelect={(selected) => {
                const tempArray = [...localTags]
                tempArray[index].isSelected = selected
                setLocalTags([...tempArray])
              }}
            />
          ))}
        </div>
      </FilterButton.Body>
      <FilterButton.FilteredLayout>
        <img
          src={enabledTagIcon}
          alt={getSelectedTagsLegend()}
          className="w-4 h-4"
          title={getSelectedTagsLegend()}
        />
        <span className="text-sm">{getSelectedTagsLegend()}</span>
      </FilterButton.FilteredLayout>
    </FilterButton>
  )
}

export default TagFilter

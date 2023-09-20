import { useEffect, useRef, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { cn } from '../../../../utils'
import { Icon } from '../../atoms'

export interface EditableContentProps {
  initialValue: string
  onChange: (value: string) => void
  className?: string
}

const EditableContent = ({ initialValue, onChange, className }: EditableContentProps) => {
  const text = useRef(initialValue)
  const [isEditing, setIsEditing] = useState(false)

  const handleOnFocus = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    text.current = initialValue
  }, [initialValue])

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value
  }

  // Handle enter key otherwise the
  // contentEditable div will create a new line
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      evt.currentTarget.blur()
    }
  }

  //
  const handleBlur = () => {
    setIsEditing(false)

    // Trim whitespace at the start and end of the string if present
    text.current = text.current.replace(/^(&nbsp;)+|(&nbsp;)+$/g, '')

    // If edited text is empty, set it back to the original value
    if (!text.current) {
      text.current = initialValue
    }

    // Not triggering onChange if the value is the same
    if (text.current === initialValue) {
      return
    }

    onChange(text.current)
  }

  return (
    <div className={cn('flex group items-center space-x-2', className)}>
      <ContentEditable
        html={text.current}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        className="outline-none"
      />
      {!isEditing && (
        <Icon
          name="edit/16"
          className="text-border-grey-highlighted opacity-0 transition group-hover:opacity-100"
        />
      )}
      {isEditing && (
        <>
          <Icon name="keyboard-return/16" className="text-disabled-icon transition" />
          <span className="text-grey-text text-[11px]/8 font-normal">Press Enter to confirm</span>
        </>
      )}
    </div>
  )
}

export default EditableContent

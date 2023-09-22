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
  const contentEditable = useRef(null)
  const text = useRef(initialValue)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    text.current = initialValue
  }, [initialValue])

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      handleSubmit()
    } else if (evt.key === 'Escape') {
      evt.preventDefault()
      evt.currentTarget.blur()
    }
  }

  const handleBlur = () => {
    text.current = initialValue
    setIsEditing(false)
  }

  const handleSubmit = () => {
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

  const changeToEditMode = () => {
    setIsEditing(true)

    if (!contentEditable.current) {
      return
    }

    // Move cursor to the end of the input
    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(contentEditable.current)
    range.collapse(false)
    selection?.removeAllRanges()
    selection?.addRange(range)

    // Focus the input
    ;(contentEditable.current as any).focus()
  }

  return (
    <div className={cn('flex group items-center', className)}>
      {!isEditing && (
        <button onClick={changeToEditMode}>{text.current.replace(/&nbsp;/g, ' ')}</button>
      )}

      <ContentEditable
        innerRef={contentEditable}
        html={text.current}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn('outline-none', {
          // Have to hide the input when not editing because if not
          // the input will be visible on top of the button
          // and we need to have this element in the DOM
          // as if not, it won't be possible to focus it
          'absolute -z-50': !isEditing,
        })}
      />

      {!isEditing && (
        <button onClick={changeToEditMode} className="pl-2">
          <Icon
            name="edit/16"
            className="text-border-grey-highlighted opacity-0 transition group-hover:opacity-100"
          />
        </button>
      )}
      {isEditing && (
        <>
          <Icon name="keyboard-return/16" className="text-disabled-icon transition mx-2" />
          <span className="text-grey-text text-[11px]/8 font-normal">Press Enter to confirm</span>
        </>
      )}
    </div>
  )
}

export default EditableContent

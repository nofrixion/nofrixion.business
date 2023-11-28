import { useRef, useState } from 'react'

import { cn } from '../../../../utils'

export interface FileInputProps {
  onFileAdded: (file: File) => void
}

const FileInput = ({ onFileAdded }: FileInputProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click()
  }

  const onFileChange = (file: File) => {
    if (file && file.type === 'text/csv') {
      file.text().then((text) => {
        console.log(text)
      })
      onFileAdded(file)
    } else {
      // TODO: Show error message
      console.error('File is not a csv')
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      onFileChange(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    const file = event.dataTransfer.files && event.dataTransfer.files[0]

    if (file) {
      onFileChange(file)
    }
  }

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true)
    event.preventDefault()
    event.stopPropagation()
  }

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false)
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      className={cn('border border-dashed rounded-lg bg-main-grey py-20', {
        'bg-border-grey': isDragging,
      })}
      onDrop={handleDrop}
      onDragEnter={onDragEnter}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <div className="font-normal text-sm w-fit mx-auto">
        <div className="w-fit">Drop your CSV file here or</div>
        <button className="underline hover:no-underline mt-1" onClick={handleClick}>
          upload it from your device
        </button>
      </div>
      <input
        type="file"
        accept="text/csv"
        onChange={handleFileChange}
        ref={hiddenFileInput}
        className="hidden"
      />
    </div>
  )
}

export default FileInput

import Tag from '../Tag/Tag'

export interface TagListProps {
  labels: string[]
}

const TagList = ({ labels }: TagListProps) => {
  const remaining = labels.length - 2

  if (labels.length > 2) {
    labels = labels.slice(0, 2)
  }

  return (
    <div className="flex-grid flex-wrap space-x-1 items-center justify-items-end">
      {labels.map((label) => (
        <Tag key={label} id={label} label={label} readonly={true} />
      ))}
      {remaining > 0 && (
        <div className="inline-flex text-sm font-normal text-control-grey-hover">
          {' +'}
          {remaining}
        </div>
      )}
    </div>
  )
}

export default TagList

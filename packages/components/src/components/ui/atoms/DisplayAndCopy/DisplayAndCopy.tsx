import { cn } from '../../../../utils'
import { makeToast } from '../../Toast/Toast'
import { Icon } from '..'

export interface DisplayAndCopyProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  value: string
}

const DisplayAndCopy: React.FC<DisplayAndCopyProps> = ({ name, value, className, ...props }) => {
  const onCopy = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    value: string,
    name: string,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(value)
    makeToast('info', `${getNameOfValueCopied(name)} copied`)
  }

  const getNameOfValueCopied = (name: string) => {
    switch (name) {
      case 'IBAN':
        return name
      case 'SC':
        return 'Sort Code'
      case 'AN':
        return 'Account Number'
      default:
        return name
    }
  }

  return (
    <div
      className={cn('flex leading-4 gap-2 text-[13px] font-normal items-center', className)}
      {...props}
    >
      <span className="text-grey-text select-none">{name}</span>
      <span>{value}</span>
      <span onClick={(e) => onCopy(e, value, name)} aria-hidden="true">
        <Icon
          name="copy/12px"
          className="text-control-grey-hover cursor-pointer transition hover:text-border-grey-highlighted"
        />
      </span>
    </div>
  )
}

export default DisplayAndCopy

import { cn } from '../../../../utils'
import { Icon } from '..'

export interface DisplayAndCopyProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  value: string
}

const DisplayAndCopy: React.FC<DisplayAndCopyProps> = ({ name, value, className, ...props }) => {
  const onCopy = (accountInfo: string) => {
    navigator.clipboard.writeText(accountInfo)
    console.log('works')
  }

  return (
    <div className={cn('flex leading-4 gap-2 text-[13px] font-normal', className)} {...props}>
      <span className="text-grey-text">{name}</span>
      <span>{value}</span>
      <span onClick={() => onCopy(value)} aria-hidden="true">
        <Icon name="copy/16px" className="text-control-grey-hover hover:cursor-pointer" />
      </span>
    </div>
  )
}

export default DisplayAndCopy

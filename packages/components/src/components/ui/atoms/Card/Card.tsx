import { cn } from '../../../../utils'
import { Icon } from '../Icon/Icon'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtext?: string
  onShowViewAll?: () => void
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  subtext,
  onShowViewAll,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-6 md:p-10 rounded-lg bg-white w-full text-default-text transition',
        {
          'hover:shadow-[0px_2px_8px_0px_rgba(4,_41,_49,_0.1)] cursor-pointer': onShowViewAll,
        },
        className,
      )}
      {...props}
    >
      <div className="flex justify-between">
        {(title || subtext) && (
          <div className="flex flex-col">
            {title && <span className="font-semibold text-xl">{title}</span>}

            {subtext && <span className="text-gray-text text-sm/4 mt-2">{subtext}</span>}
          </div>
        )}

        {onShowViewAll && (
          <button
            onClick={onShowViewAll}
            className="flex items-center h-6 justify-end space-x-2 underline underline-offset-2 hover:no-underline"
          >
            <span className="hidden md:inline-block text-sm">View all</span>
            <Icon name="next/12" />
          </button>
        )}
      </div>

      {children}
    </div>
  )
}

export default Card

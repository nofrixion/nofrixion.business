import { cn } from '../../../../lib/utils/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
      className={cn('p-6 md:p-10 rounded-lg bg-white w-full text-default-text', className)}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M6 0.999999L11 6L6 11"
                stroke="#454D54"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M11 6L1 6" stroke="#454D54" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {children}
    </div>
  )
}

export default Card

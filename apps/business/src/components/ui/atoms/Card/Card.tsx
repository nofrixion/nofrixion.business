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
      className={cn(
        'biz-p-6 md:biz-p-10 biz-rounded-lg biz-bg-white biz-w-full biz-text-default-text',
        className,
      )}
      {...props}
    >
      <div className="biz-flex biz-justify-between">
        {(title || subtext) && (
          <div className="biz-flex biz-flex-col">
            {title && <span className="biz-font-semibold biz-text-xl">{title}</span>}

            {subtext && (
              <span className="biz-text-gray-text biz-text-sm/4 biz-mt-2">{subtext}</span>
            )}
          </div>
        )}

        {onShowViewAll && (
          <button
            onClick={onShowViewAll}
            className="biz-flex biz-items-center biz-h-6 biz-justify-end biz-space-x-2 biz-underline biz-underline-offset-2 hover:biz-no-underline"
          >
            <span className="biz-hidden md:biz-inline-block biz-text-sm">View all</span>
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

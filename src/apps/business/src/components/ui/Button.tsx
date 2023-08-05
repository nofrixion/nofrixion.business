import { cn } from '@/lib/utils/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        'biz-px-4 biz-py-2 biz-rounded-full biz-inline-flex biz-items-center biz-justify-center biz-bg-active-green biz-text-white biz-font-semibold biz-text-sm/6 biz-transition hover:biz-bg-[#00807F]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

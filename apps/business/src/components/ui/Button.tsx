import { cn } from '../../lib/utils/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-full inline-flex items-center justify-center bg-primary-green text-white font-semibold text-sm/6 transition hover:bg-[#00807F]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

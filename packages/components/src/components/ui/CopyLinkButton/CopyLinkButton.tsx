import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { cn } from '../../../utils'
import { Icon } from '../atoms'

export interface CopyLinkButtonProps {
  variant: 'hoverable' | 'filled'
  link: string
  className?: string
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ variant, link, className }) => {
  const [copied, setCopied] = useState(false)

  const baseButtonClassNames = 'w-24 flex items-center rounded-full py-1 absolute right-0'
  const copyButtonClassNames = 'gap-[0.281rem] px-2 transition duration-300 cursor-pointer z-0'

  const buttonVariant = cva(copyButtonClassNames, {
    variants: {
      intent: {
        hoverable: ['bg-white hover:bg-[#DEE5ED]'],
        filled: ['bg-[#DEE5ED]'],
      },
    },
    defaultVariants: {
      intent: 'hoverable',
    },
  })

  // Reset copied state after 1.5 seconds to allow user to copy again
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const copyLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    navigator.clipboard.writeText(link)
    setCopied(true)
  }

  return (
    <div className={cn('relative h-6 w-24', className)}>
      <AnimatePresence>
        {!copied ? (
          <motion.button
            key="copy-link"
            onClick={copyLink}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              baseButtonClassNames,
              buttonVariant({
                intent: variant,
              }),
            )}
          >
            <Icon name="copy-link/16" className="stroke-[#454D54]" />
            <span className="text-xs">Copy link</span>
          </motion.button>
        ) : (
          <motion.div
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(baseButtonClassNames, 'gap-[0.354rem] px-4 bg-[#CFFCED] z-50')}
          >
            <Icon name="tick-mark/12" className="stroke-[#454D54]" />
            <span className="text-xs">Copied</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CopyLinkButton

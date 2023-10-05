import * as Tooltip from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import InfoIcon from '../../../assets/icons/info-icon.svg'
import { cn } from '../../../utils'

export interface InfoTooltipProps {
  content: string
  children?: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  disableHover?: boolean
}

const InfoTooltip = ({
  content,
  children,
  side = 'top',
  className,
  disableHover,
}: InfoTooltipProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger
          className={cn(
            'w-4 h-4 min-w-[1rem] min-h-[1rem] inline-flex',
            {
              'pointer-events-none': disableHover,
            },
            className,
          )}
        >
          <>
            {/* If no children show img */}
            {!children && (
              <img src={InfoIcon} className="cursor-pointer w-full h-full" alt="Info icon" />
            )}

            {children}
          </>
        </Tooltip.Trigger>
        <AnimatePresence>
          {open && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content sideOffset={5} side={side} asChild>
                <motion.div
                  className={cn(
                    'rounded-lg p-4 bg-white select-none max-w-xs shadow-[0px_0px_16px_rgba(4,_41,_49,_0.15)] text-sm z-50',
                    {
                      'pointer-events-none': disableHover,
                    },
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {content}
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default InfoTooltip

import { VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { Button } from '../../atoms'
import { buttonVariants } from '../../atoms/Button/Button'

export interface ConfrimButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  primaryText: string
  confirmText: string
  onConfirm: () => void
  className?: string
}

const ConfrimButton = ({
  size,
  primaryText,
  confirmText,
  onConfirm,
  className,
}: ConfrimButtonProps) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false)
  const [confirmDisable, setConfirmDisable] = useState<boolean>(false)

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Escape') {
      evt.preventDefault()
      evt.currentTarget.blur()
      setIsConfirming(false)
    }
  }

  const handleOnConfirmClicked = () => {
    setConfirmDisable(true)
    onConfirm()
  }

  return (
    <AnimatePresence>
      {!isConfirming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size={size}
            variant={'secondary'}
            onClick={() => setIsConfirming(true)}
            className={className}
          >
            {primaryText}
          </Button>
        </motion.div>
      )}
      {isConfirming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size={size}
            variant={'confirm_negative'}
            onClick={handleOnConfirmClicked}
            onKeyDown={(event) => handleKeyDown(event)}
            onBlur={() => setIsConfirming(false)}
            className={className}
            disabled={confirmDisable}
          >
            {confirmText}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConfrimButton

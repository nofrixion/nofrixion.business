import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { Button } from '../../atoms'

export interface ConfrimButtonProps {
  primaryText: string
  confirmText: string
  onConfirm: () => void
}

const ConfrimButton = ({ primaryText, confirmText, onConfirm }: ConfrimButtonProps) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Escape') {
      evt.preventDefault()
      evt.currentTarget.blur()
      setIsConfirming(false)
    }
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
          <Button variant={'secondary'} onClick={() => setIsConfirming(true)} className="w-[189px]">
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
            variant={'confirm_negative'}
            onClick={onConfirm}
            onKeyDown={(event) => handleKeyDown(event)}
            onBlur={() => setIsConfirming(false)}
            className="w-[189px]"
          >
            {confirmText}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConfrimButton

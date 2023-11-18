import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import SessionEndSound from '../../../../assets/sounds/session-ending.mp3'
import { Button } from '../../atoms'

export interface NotifyModalProps {
  open: boolean
  notifyText: string
  buttonText: string
  onApply: () => void
}

const NotifyModal = ({ open, notifyText, buttonText, onApply }: NotifyModalProps) => {
  useEffect(() => {
    if (!open) return

    const sound = new Audio(SessionEndSound)

    sound.play()
  }, [open])

  return (
    <Dialog.Root open={open}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-25 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              forceMount
              className="fixed top-[50%] left-[50%] w-[528px] translate-x-[-50%] translate-y-[-50%] z-50"
              onEscapeKeyDown={onApply}
              onInteractOutside={onApply}
            >
              <div className="flex flex-col min-h-full justify-center items-center overflow-hidden rounded-lg bg-white align-middle shadow-xl transition-all text-default-text text-2xl font-semibold">
                <span className="md:px-12 mt-12 text-center max-w-[390px]">{notifyText}</span>
                <Button
                  variant="primaryDark"
                  size="large"
                  onClick={onApply}
                  className="mx-auto mt-8 mb-12 w-fit"
                >
                  {buttonText}
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default NotifyModal

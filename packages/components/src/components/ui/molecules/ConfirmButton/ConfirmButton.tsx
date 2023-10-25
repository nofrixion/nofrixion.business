import { Button } from '../../atoms'

export interface ConfrimButtonProps {
  primaryText: string
  confirmText: string
  onConfirm: () => void
}

const ConfrimButton = ({ primaryText, confirmText, onConfirm }: ConfrimButtonProps) => {
  return (
    <>
      <div className="flex-row">
        <Button variant={'secondary'} onClick={onConfirm} className="w-[189px]">
          {primaryText}
        </Button>
      </div>
      <Button variant={'confirm_negative'} onClick={onConfirm} className="w-[189px]">
        {confirmText}
      </Button>
    </>
  )
}

export default ConfrimButton

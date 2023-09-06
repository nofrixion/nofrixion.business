import { LocalPayout } from '../../../../types/LocalTypes'
import { Sheet, SheetContent } from '../../../ui/atoms'

export interface PayoutDetailsModalProps {
  payout?: LocalPayout
  open: boolean
  onDismiss: () => void
}

const PayoutDetailsModal = ({ payout, open, onDismiss }: PayoutDetailsModalProps) => {
  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOnOpenChange}>
      <SheetContent
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
        className="w-full lg:w-[37.5rem]"
      >
        <div className="bg-white max-h-full h-full overflow-auto">
          <div className="max-h-full h-full">
            <h1>{payout?.id}</h1>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default PayoutDetailsModal

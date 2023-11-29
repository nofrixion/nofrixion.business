import { Icon } from '../../atoms/Icon/Icon'
import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'

export interface SystemErrorModalProps extends BaseModalProps {
  onDismiss: () => void
  title: string
  message: string
}

const SystemErrorModal = ({ title, message, onDismiss, open }: SystemErrorModalProps) => {
  const handleOnDismiss = () => {
    onDismiss()
  }

  return (
    <CustomModal
      open={open}
      onApply={handleOnDismiss}
      onDismiss={handleOnDismiss}
      buttonText="Understood"
      showDefault={false}
    >
      <div className="flex justify-center h-full">
        my-8
        <Icon name="error/48" className="text-negative-red" />
        <div>
          <h3 className="text-2xl font-semibold leading-8 md:leading-6">{title}</h3>
        </div>
      </div>
      <p>{message}</p>

      <a href="https://tally.so#tally-open=3NX0Ap">Contact support</a>
    </CustomModal>
  )
}

export default SystemErrorModal

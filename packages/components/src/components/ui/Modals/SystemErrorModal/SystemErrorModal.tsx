import { Icon } from '../../atoms/Icon/Icon'
import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'

export interface SystemErrorModalProps extends BaseModalProps {
  onDismiss: () => void
  title?: string
  message?: string
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
      showSupport={true}
    >
      <div className='mt-6 md:mt-12 h-full'>
        <div className="flex flex-col items-center">
          <Icon name="error/48" className="text-negative-red" />
        </div>
        <h3 className="text-2xl font-semibold leading-8 md:leading-6 my-8 text-default-text">{title}</h3>
        <p className='text-sm font-normal leading-5 text-default-text'>{message}</p>
      </div>
    </CustomModal>
  )
}

export default SystemErrorModal

import { Icon } from '@nofrixion/components/src/components/ui/atoms'

import { Loader } from '../components/ui/Loader/Loader'
import useUserStore from '../lib/stores/useUserStore'

const NewlyRegistered = () => {
  const { user } = useUserStore()

  if (!user) {
    return <Loader className="flex items-center justify-center p-24 min-h-screen" />
  }

  return (
    <div className="flex flex-col">
      <div className="pl-10 text-[32px] font-semibold">{`${user?.firstName}, welcome to MoneyMoov for Business`}</div>
      <div className="flex rounded-lg mt-16 px-10 py-8 bg-white w-full">
        <div className="mt-1 w-4 h-4">
          <Icon name="info/16" className="stroke:control-grey-hover" />
        </div>

        <div className="flex flex-col pl-4">
          <div className="text-default-text text-base font-normal">
            Your system administrator has been notified of your login and will activate your account
            soon.
          </div>
          <div className="text-sm font-normal pt-2 text-grey-text">
            You will receive an email notification when your access is ready.
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewlyRegistered

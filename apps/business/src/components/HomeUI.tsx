import { useEffect, useState } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

import GraphicDesktopMoneyMoovForBusiness from '../assets/graphics/for-business-diagram-desktop.svg'
import LogoNofrixion from '../assets/graphics/nofrixion-logo.svg'
import IconArrowRight from '../assets/icons/arrow-right.svg'
import { AuthContextType } from '../lib/auth/AuthProvider'
import { useAuth } from '../lib/auth/useAuth'
import { NOFRIXION_BFF_URL } from '../lib/constants'
import { getRoute } from '../lib/utils/utils'
import { Loader } from './ui/Loader/Loader'
import { PRReview } from './ui/PRReview'

const CardHome = ({ onEnterPressed }: { onEnterPressed: () => void }) => {
  return (
    <div className="relative flex h-auto max-w-[600px] flex-col items-center rounded-[3rem] pb-8 lg:h-[23.625rem] lg:w-[37.5rem] lg:max-w-none bg-[#F3F7F6] text-[#143252]">
      <div className="absolute top-[0.3rem] w-full -translate-y-1/2 lg:top-2 lg:w-auto">
        <img
          src={GraphicDesktopMoneyMoovForBusiness}
          alt="MoneyMoov for Business Graphic"
          className="mx-auto h-full w-full object-cover"
        />
      </div>

      <h2 className="relative mt-[6.625rem] lg:mt-[7.688rem] px-10 text-[2rem] font-bold leading-[2.421rem] lg:px-0 text-center">
        MoneyMoov for Business
        <span className="align-super uppercase text-white bg-[#023] rounded-2xl px-2 py-0.5 text-[10px] leading-normal ml-0.5">
          Beta
        </span>
      </h2>

      <p className="mt-6 px-6 text-center text-sm leading-6 sm:px-32 lg:mt-8 lg:w-10/12 lg:px-0 lg:text-base xl:w-2/3">
        Send, receive, store and reconcile <b>automatically</b>. The intelligent Current Account
        that seamlessly blends into your business operations.
      </p>

      <button
        className="flex rounded-full px-6 py-3 mt-8 bg-[#001933] text-white"
        onClick={onEnterPressed}
      >
        <span>Enter</span>
        <img src={IconArrowRight} className="ml-2 h-6 w-6" alt="Right icon" />
      </button>
    </div>
  )
}

const HomeUI = () => {
  const { authState } = useAuth() as AuthContextType
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const origin = location.state?.from?.pathname

  const callbackUrl = searchParams.get('callbackUrl')

  const [finishedFirstLoading, setFinishedFirstLoading] = useState(false)

  useEffect(() => {
    if (!authState) {
      return
    }

    if (!authState?.isLoading) {
      setFinishedFirstLoading(true)
    }
  }, [authState?.isLoading])

  // Note: added `finishedFirstLoading` to prevent the page from flashing the loader
  // as react-query is fetching the user data every time the page is focused
  if (authState?.isLoading && !finishedFirstLoading) {
    return <Loader className="flex items-center justify-center p-24 min-h-full" />
  }

  if (authState?.isLoggedIn) {
    return <Navigate to={origin ?? getRoute('/home')} />
  }

  return (
    <main className="flex items-center justify-center p-24 min-h-full">
      <div>
        <CardHome
          onEnterPressed={() => {
            window.location.href = `${NOFRIXION_BFF_URL}/login?returnUrl=${
              callbackUrl ?? origin ?? getRoute('/home')
            }`
          }}
        />

        <div className="flex justify-center items-center text-gray-text mt-8">
          <span className="mr-4">Powered by</span>

          <img src={LogoNofrixion} alt="Nofrixion Logo" />
        </div>
        {import.meta.env.VITE_NOFRIXION_PULL_REQUEST_ID && (
          <div className="flex justify-center items-center">
            <PRReview />
          </div>
        )}
      </div>
    </main>
  )
}

export default HomeUI

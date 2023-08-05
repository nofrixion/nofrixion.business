import IconArrowRight from '../assets/icons/arrow-right.svg'
import GraphicDesktopMoneyMoovForBusiness from '../assets/graphics/for-business-diagram-desktop.svg'
import LogoNofrixion from '../assets/graphics/nofrixion-logo.svg'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/lib/auth/useAuth'
import { AuthContextType } from '@/lib/auth/AuthProvider'
import { Loader } from './ui/Loader/Loader'
import { NOFRIXION_BFF_URL } from '@/lib/constants'

const CardHome = ({ onEnterPressed }: { onEnterPressed: () => void }) => {
  return (
    <div className="biz-relative biz-flex biz-h-auto biz-max-w-[600px] biz-flex-col biz-items-center biz-rounded-[3rem] biz-pb-8 lg:biz-h-[23.625rem] lg:biz-w-[37.5rem] lg:biz-max-w-none biz-bg-[#F3F7F6] biz-text-[#143252]">
      <div className="biz-absolute biz-top-[0.3rem] biz-w-full -biz-translate-y-1/2 lg:biz-top-2 lg:biz-w-auto">
        <img
          src={GraphicDesktopMoneyMoovForBusiness}
          alt="MoneyMoov for Business Graphic"
          className="biz-mx-auto biz-h-full biz-w-full biz-object-cover"
        />
      </div>

      <h2 className="biz-relative biz-mt-[6.625rem] lg:biz-mt-[7.688rem] biz-px-10 biz-text-[2rem] biz-font-bold biz-leading-[2.421rem] lg:biz-px-0 biz-text-center">
        MoneyMoov for Business
        <span className="biz-align-super biz-uppercase biz-text-white biz-bg-[#023] biz-rounded-2xl biz-px-2 biz-py-0.5 biz-text-[10px] biz-leading-normal biz-ml-0.5">
          Beta+
        </span>
      </h2>

      <p className="biz-mt-6 biz-px-6 biz-text-center biz-text-sm biz-leading-6 sm:biz-px-32 lg:biz-mt-8 lg:biz-w-10/12 lg:biz-px-0 lg:biz-text-base xl:biz-w-2/3">
        Send, receive, store and reconcile <b>automatically</b>. The intelligent Current Account
        that seamlessly blends into your business operations.
      </p>

      <button onClick={onEnterPressed}>
        <a
          href="#"
          className="biz-flex biz-rounded-full biz-px-6 biz-py-3 biz-mt-8 biz-bg-[#001933] biz-text-white"
        >
          <span>Enter</span>
          <img src={IconArrowRight} className="biz-ml-2 biz-h-6 biz-w-6" alt="Right icon" />
        </a>
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

  if (authState?.isLoading) {
    return (
      <Loader className="biz-flex biz-items-center biz-justify-center biz-p-24 biz-min-h-screen" />
    )
  }

  if (authState?.isLoggedIn) {
    return <Navigate to={origin ?? '/home'} />
  }

  return (
    <main className="biz-flex biz-items-center biz-justify-center biz-p-24 biz-min-h-screen">
      <div>
        <CardHome
          onEnterPressed={() => {
            window.location.href = `${NOFRIXION_BFF_URL}/login?returnUrl=${
              callbackUrl ?? origin ?? '/home'
            }`
          }}
        />

        <div className="biz-flex biz-justify-center biz-items-center biz-text-gray-text biz-mt-8">
          <span className="biz-mr-4">Powered by</span>

          <img src={LogoNofrixion} alt="Nofrixion Logo" />
        </div>
      </div>
    </main>
  )
}

export default HomeUI

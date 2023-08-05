import { Navbar } from '@/components/Navbar/Navbar'
import { useMerchants, useUser } from '@nofrixion/moneymoov'
import { useEffect } from 'react'
import StickyFeedback from '@/components/StickyFeedback'
import useMerchantStore from '@/lib/stores/useMerchantStore'
import useMerchantsStore from '@/lib/stores/useMerchantsStore'
import useUserStore from '@/lib/stores/useUserStore'
import { useOutlet } from 'react-router-dom'
import '../index.css'
import { useAuth } from '@/lib/auth/useAuth'
import { AuthContextType } from '@/lib/auth/AuthProvider'
// interface DashboardLayoutProps {
//   children: React.ReactNode
// }

const Layout = () => {
  const { merchants, setMerchants } = useMerchantsStore()
  const { merchant, setMerchant } = useMerchantStore()
  const { user, setUser } = useUserStore()
  const { authState } = useAuth() as AuthContextType

  const outlet = useOutlet()

  const apiUrl = '/api'

  // Fetch merchants and user data
  // and store them in global state
  const {
    data: merchantsResponse,
    isLoading: isMerchantsLoading,
    isError: isMerchantsError,
  } = useMerchants({
    apiUrl: apiUrl,
  })

  const {
    data: userResponse,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser({
    apiUrl: apiUrl,
  })

  useEffect(() => {
    if (merchantsResponse?.status === 'success') {
      setMerchants(merchantsResponse.data)

      if (!merchant || !merchants?.find((m) => m.id === merchant.id)) {
        if (merchants && merchants.length > 0) {
          setMerchant(merchants[0])
        }
      }
    } else if (merchantsResponse?.status === 'error') {
      console.log('Error fetching merchants', merchantsResponse.error)
      authState?.logOut && authState.logOut()
    }
  }, [
    merchantsResponse,
    merchant,
    merchants,
    setMerchant,
    setMerchants,
    authState?.logOut,
    authState,
  ])

  useEffect(() => {
    if (userResponse?.status === 'success') {
      setUser(userResponse.data)
      // throw new Error('test')
    } else if (userResponse?.status === 'error') {
      console.log('Error fetching user', userResponse.error)
      authState?.logOut && authState.logOut()
    }
  }, [userResponse, user, setUser, authState])

  return (
    <>
      <div className="biz-font-inter biz-h-full">
        <StickyFeedback />
        <Navbar />
        <div className="biz-min-h-screen biz-flex">
          <div className="biz-bg-main-gray-bg biz-w-full biz-pb-28 biz-px-6 md:biz-px-[72px] biz-pt-8 md:biz-pb-16">
            {outlet}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout

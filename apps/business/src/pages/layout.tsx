import '../index.css'

import { parseApiUserToLocalUser } from '@nofrixion/components/src/utils/parsers'
import { useMerchants, useUser } from '@nofrixion/moneymoov'
import { useEffect } from 'react'
import { useOutlet } from 'react-router-dom'

import { Navbar } from '../components/Navbar/Navbar'
import StickyFeedback from '../components/StickyFeedback'
import { AuthContextType } from '../lib/auth/AuthProvider'
import { useAuth } from '../lib/auth/useAuth'
import useMerchantsStore from '../lib/stores/useMerchantsStore'
import useMerchantStore from '../lib/stores/useMerchantStore'
import useUserStore from '../lib/stores/useUserStore'

const Layout = () => {
  const { merchants, setMerchants } = useMerchantsStore()
  const { merchant, setMerchant } = useMerchantStore()
  const { setUser } = useUserStore()
  const { authState } = useAuth() as AuthContextType

  const outlet = useOutlet()

  const apiUrl = '/api'

  // Fetch merchants and user data
  // and store them in global state
  const { data: merchantsResponse } = useMerchants({
    apiUrl: apiUrl,
  })

  const { data: userResponse } = useUser({
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
      setUser(parseApiUserToLocalUser(userResponse.data, merchant?.id))
    } else if (userResponse?.status === 'error') {
      console.log('Error fetching user', userResponse.error)
      authState?.logOut && authState.logOut()
    }
  }, [userResponse, setUser, authState, merchant])

  return (
    <>
      <StickyFeedback />
      <Navbar />
      <div className="min-h-full flex">
        <div className="bg-main-grey w-full pb-28 px-6 md:px-[56px] pt-16 md:pb-16">{outlet}</div>
      </div>
    </>
  )
}

export default Layout

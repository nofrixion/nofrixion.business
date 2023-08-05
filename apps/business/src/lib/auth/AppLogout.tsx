import { useCallback, useEffect, useRef } from 'react'
import { useAuth } from './useAuth'
import { AuthContextType } from './AuthProvider'

const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']

interface AppLogoutProps {
  children: React.ReactNode
}

// TODO: Review this. We need to get user role from the API
// and possibly not enable the timer if user is a PaymentRequester?
const AppLogout = ({ children }: AppLogoutProps) => {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined)
  const { authState } = useAuth() as AuthContextType
  const expiryTimeMs = 1000 * 60 * 5 // 5 minutes

  const resetTimer = useCallback(() => {
    if (timer) clearTimeout(timer.current)
  }, [timer])

  const logout = useCallback(
    (callbackUrl?: string) => {
      resetTimer()
      authState?.logOut && authState.logOut(callbackUrl)
    },
    [authState, resetTimer],
  )

  // Create the timer
  const createLogoutTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      // Clean up
      resetTimer()

      events.map((event) => {
        window.removeEventListener(event, resetTimer)
      })

      logout(window.location.pathname)
    }, expiryTimeMs)
  }, [expiryTimeMs, logout, resetTimer])

  useEffect(() => {
    if (authState?.isLoggedIn) {
      events.map((event) => {
        window.addEventListener(event, () => {
          resetTimer()
          createLogoutTimer()
        })
      })
    }
  }, [resetTimer, createLogoutTimer, expiryTimeMs, authState?.isLoggedIn])

  return <>{children}</>
}

export default AppLogout

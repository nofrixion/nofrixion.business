import NotifyModal from '@nofrixion/components/src/components/ui/molecules/NotifyModal/NotifyModal'
import { LocalUserRoles } from '@nofrixion/components/src/types/LocalTypes'
import { useCallback, useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

import useUserStore from '../stores/useUserStore'
import { AuthContextType } from './AuthProvider'
import { useAuth } from './useAuth'
interface AppLogoutProps {
  children: React.ReactNode
}

const AppLogout = ({ children }: AppLogoutProps) => {
  const { authState } = useAuth() as AuthContextType
  const { user } = useUserStore()

  const [state, setState] = useState<'Active' | 'Prompted' | 'Idle'>('Active')
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  const timeout = user?.role === LocalUserRoles.PaymentRequestor ? 1000 * 60 * 30 : 1000 * 60 * 5
  const promptBeforeIdle = 1000 * 60

  useEffect(() => {
    if (state === 'Prompted') {
      document.title = `${remainingSeconds}s to end session`
    }
  }, [remainingSeconds])

  let interval: NodeJS.Timer

  useEffect(() => {
    if (state === 'Prompted') {
      interval = setInterval(() => {
        setRemainingSeconds(Math.ceil(getRemainingTime() / 1000))
      }, 500)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [state])

  // Logout the user
  const onIdle = () => {
    setState('Idle')
    setOpen(false)
    document.title = 'NoFrixion'
    logout()
  }

  // Prompt the user before 1 min before the session ends
  const onPrompt = () => {
    setState('Prompted')
    setOpen(true)
  }

  const onActive = () => {
    setState('Active')
    setOpen(false)
  }

  // Keep the user logged in by resetting the timer
  const stayLoggedIn = () => {
    document.title = 'NoFrixion'
    setState('Active')
    setOpen(false)
    start()
  }

  // Create the idle timer
  const { getRemainingTime, start } = useIdleTimer({
    onIdle,
    onPrompt,
    onActive,
    timeout,
    promptBeforeIdle,
    throttle: 500,
    startManually: true,
    crossTab: true,
    syncTimers: 200,
  })

  // Logout
  const logout = useCallback(
    (callbackUrl?: string) => {
      if (authState?.isLoggedIn) {
        authState?.logOut && authState.logOut(callbackUrl)
      }
    },
    [authState],
  )

  // Start the idle timer when the user is logged in
  useEffect(() => {
    if (authState?.isLoggedIn) {
      start()
    }
  }, [authState?.isLoggedIn])

  return (
    <>
      {children}
      {remainingSeconds > 0 && (
        <NotifyModal
          open={open}
          onApply={stayLoggedIn}
          notifyText={`Your session is ending in ${remainingSeconds} seconds`}
          buttonText="Keep me logged in"
        />
      )}
    </>
  )
}

export default AppLogout

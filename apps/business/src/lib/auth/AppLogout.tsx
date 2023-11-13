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

  // If the user is a payment requestor, the session should end after 30 minutes. Otherwise, it should end after 5 minutes.
  const timeout = user?.role === LocalUserRoles.PaymentRequestor ? 1000 * 60 * 30 : 1000 * 60 * 5
  // Prompt the user 1 min before the session ends
  const promptBeforeIdle = 1000 * 60

  const [state, setState] = useState<'Active' | 'Prompted' | 'Idle'>('Active')
  const [remainingSeconds, setRemainingSeconds] = useState<number>(promptBeforeIdle / 1000)
  const [promptOpen, setPromptOpen] = useState<boolean>(false)

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
    document.title = 'NoFrixion'
    setState('Idle')
    setPromptOpen(false)
    logout(window.location.pathname)
  }

  // Prompt the user 1 min before the session ends
  const onPrompt = () => {
    setState('Prompted')
    setPromptOpen(true)
  }

  const onActive = () => {
    setState('Active')
    setPromptOpen(false)
  }

  // Keep the user logged in by resetting the timer
  const stayLoggedIn = () => {
    message('stayLoggedIn')
    resetSession()
  }

  // Reset the timer
  const resetSession = () => {
    setRemainingSeconds(promptBeforeIdle / 1000)
    document.title = 'NoFrixion'
    setState('Active')
    setPromptOpen(false)
    activate()
  }

  const onMessage = () => {
    resetSession()
  }

  // Create the idle timer
  const { getRemainingTime, activate, message } = useIdleTimer({
    disabled: !authState?.isLoggedIn,
    onIdle,
    onPrompt,
    onActive,
    onMessage,
    timeout,
    promptBeforeIdle,
    throttle: 500,
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

  return (
    <>
      {children}
      {remainingSeconds > 0 && (
        <NotifyModal
          open={promptOpen}
          onApply={stayLoggedIn}
          notifyText={`Your session is ending in ${remainingSeconds} ${
            remainingSeconds === 1 ? 'second' : 'seconds'
          }`}
          buttonText="Keep me logged in"
        />
      )}
    </>
  )
}

export default AppLogout

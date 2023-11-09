import { LocalUserRoles } from '@nofrixion/components/src/types/LocalTypes'
import { useCallback, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'

import useUserStore from '../stores/useUserStore'
import { AuthContextType } from './AuthProvider'
import { useAuth } from './useAuth'

// const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']

interface AppLogoutProps {
  children: React.ReactNode
}

const timeout = 10_000
const promptBeforeIdle = 4_000

// TODO: Review this. We need to get user role from the API
// and possibly not enable the timer if user is a PaymentRequester?
const AppLogout = ({ children }: AppLogoutProps) => {
  // const timer = useRef<NodeJS.Timeout | undefined>(undefined)
  const { authState } = useAuth() as AuthContextType
  let expiryTimeMs = 1000 * 60 * 5 // 5 minutes

  // const [state, setState] = useState<string>('Active')
  // const [remaining, setRemaining] = useState<number>(timeout)
  // const [open, setOpen] = useState<boolean>(false)

  const onIdle = () => {
    // setState('Idle')
    // setOpen(false)
    console.log('user is idle')
    console.log('last active', getRemainingTime())
    logout()
  }

  const onActive = () => {
    // setState('Active')
    // setOpen(false)
    console.log('user is active')
  }

  const onPrompt = () => {
    // setState('Prompted')
    // setOpen(true)
    console.log('user is being prompted')
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500,
    startManually: true,
  })

  console.log('Remaining time', getRemainingTime())
  const { user } = useUserStore()

  if (user?.role === LocalUserRoles.PaymentRequestor) {
    expiryTimeMs = 1000 * 60 * 0.5
  }

  const logout = useCallback(
    (callbackUrl?: string) => {
      // resetTimer()
      authState?.logOut && authState.logOut(callbackUrl)
    },
    [authState],
  )

  useEffect(() => {
    if (authState?.isLoggedIn) {
      activate()
    }
  }, [expiryTimeMs, authState?.isLoggedIn])

  return <>{children}</>
}

export default AppLogout

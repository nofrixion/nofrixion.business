import { createContext, useEffect, useState } from 'react'

import { useAuthUser } from './userAuth'

export interface AuthContextValues {
  userName?: string
  logoutUrl?: string
  isLoading?: boolean
  isLoggedIn?: boolean
  expiresIn: number
  isError: boolean
  logOut?: (callback?: string) => void
  refresh: () => void
}

export type AuthContextType = {
  authState?: AuthContextValues
  updateAuthState: (values: AuthContextValues) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading, isLoggedIn, username, logoutUrl, expiresIn, isError, logOut, refresh } =
    useAuthUser()
  const [authState, setAuthState] = useState<AuthContextValues>()

  useEffect(() => {
    setAuthState({
      userName: username,
      logoutUrl: logoutUrl,
      isLoading: isLoading,
      isLoggedIn: isLoggedIn,
      expiresIn: expiresIn,
      isError: isError,
      logOut: logOut,
      refresh: refresh,
    })
  }, [isLoading, isLoggedIn, username, logoutUrl, expiresIn, isError, logOut, refresh])

  const updateAuthState = (values: AuthContextValues) => {
    setAuthState(values)
  }

  return (
    <AuthContext.Provider value={{ authState, updateAuthState }}>{children}</AuthContext.Provider>
  )
}

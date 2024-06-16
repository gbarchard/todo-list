import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  onAuthStateChanged,
  User,
  AuthError,
  AuthErrorCodes,
} from 'firebase/auth'

import { auth } from './firebase'

interface AuthState {
  user: User
  token: string
}

const AuthContext = React.createContext<AuthState | null>(null)

export const logout = () => auth.signOut()

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthContextProvider(props: React.PropsWithChildren<{}>) {
  const [authState, setAuthState] = React.useState<AuthState | null>()

  useEffect(
    () =>
      onAuthStateChanged(auth, (maybeUser) => {
        if (maybeUser) {
          maybeUser
            .getIdToken()
            .then((token) => setAuthState({ user: maybeUser, token }))
            .catch((e) => {
              console.error('Error getting token', e)
              setAuthState(null)
            })
        } else {
          if (window.location.href.includes('/app'))
            window.location.href = '/signin'
          setAuthState(null)
        }
      }),
    []
  )

  if (authState === undefined) return null
  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  )
}

/**
 * Function that will watch the auth state and redirect
 * to the app when the user is logged in
 */
export function useGoToAppWhenLoggedIn() {
  const auth = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth?.user) navigate('/app')
  }, [auth, navigate])
}

/**
 * Converts a firebase error to a human readable
 * message that can be displayed to the user
 * @param error firebase error object returned during authorization
 * @param defaultMsg message to fallback to if code is not matched
 * @returns message that can be displayed to user
 */
export function firebaseErrorMsg(error: AuthError, defaultMsg?: string) {
  switch (error.code) {
    case AuthErrorCodes.INVALID_PASSWORD:
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Invalid email or password'
    case AuthErrorCodes.USER_DELETED:
      return 'User not found'
    default:
      return defaultMsg || 'Unable to log in'
  }
}

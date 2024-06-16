import {
  applyActionCode,
  checkActionCode,
  confirmPasswordReset,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
} from 'firebase/auth'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { OrangeButton } from 'src/components/atoms/Button'
import { ConfirmPasswordInput } from 'src/components/atoms/TextInput'

import { LogoHeader } from 'src/components/Logo'
import { useAuthContext } from 'src/utils/auth'
import { auth } from 'src/utils/firebase'
import { BackToSignIn, SuccessfulMessage } from './NavigationLinks'

export function AuthActions() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const mode = params.get('mode')
  const actionCode = params.get('oobCode')
  const continueUrl = params.get('continueUrl')

  const { title, Handler } = useAuthHandler(mode)

  useEffect(() => {
    if (!Handler) navigate('/signin')
  }, [Handler, navigate])

  if (!Handler) return null

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LogoHeader title={title} />
        <Handler actionCode={actionCode} continueUrl={continueUrl} />
      </div>
    </div>
  )
}

function useAuthHandler(mode?: string | null) {
  let title = 'Redirecting...'
  let Handler:
    | ((props: {
        actionCode?: string | null
        continueUrl?: string | null
      }) => JSX.Element)
    | null = null

  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      Handler = ResetPassword
      title = 'Reset your password'
      break
    case 'recoverEmail':
      // Display email recovery handler and UI.
      Handler = RestoreEmail
      title = 'Restore your email'
      break
    case 'verifyEmail':
      // Display email verification handler and UI.
      Handler = VerifyEmail
      title = 'Verifying your email'
      break
  }

  return { title, Handler }
}

function ResetPassword(props: {
  actionCode?: string | null
  continueUrl?: string | null
}) {
  const { actionCode: code } = props
  const formRef = useRef<HTMLFormElement>(null)

  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState<string>()

  const resetPass = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!formRef.current) return

      const data = new FormData(formRef.current)
      const pass = data.get('password')
      const repeatPass = data.get('repeat-password')

      if (typeof pass !== 'string' || pass !== repeatPass) {
        setError('Passwords do not match')
        return
      }

      setLoading(true)
      try {
        if (!code) throw new Error('Invalid auth code')
        await verifyPasswordResetCode(auth, code)
        await confirmPasswordReset(auth, code, pass)
        setComplete(true)
      } catch (error) {
        console.error('Unable to reset password', error)
        setError('Unable to reset password, please try again later.')
      } finally {
        setLoading(false)
      }
    },
    [code]
  )

  return (
    <form
      ref={formRef}
      className="mt-8 space-y-4"
      onChange={() => setError(undefined)}
      onSubmit={resetPass}
    >
      {!complete && (
        <div>
          <ConfirmPasswordInput />
          <div className="text-sm text-red-500 mt-2">{error}</div>
        </div>
      )}

      {!complete && (
        <OrangeButton className="w-full" type="submit" disabled={loading}>
          Reset
        </OrangeButton>
      )}

      {complete ? (
        <SuccessfulMessage msg="Your password has been reset." />
      ) : (
        <BackToSignIn />
      )}
    </form>
  )
}

function RestoreEmail(props: {
  actionCode?: string | null
  continueUrl?: string | null
}) {
  const { actionCode: code } = props

  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState<string>()

  const restoreEmail = useCallback(async () => {
    setLoading(true)
    try {
      if (!code) throw new Error('Invalid auth code')
      const info = await checkActionCode(auth, code)
      await applyActionCode(auth, code)

      const restoredEmail = info.data.email
      if (restoredEmail) await sendPasswordResetEmail(auth, restoredEmail)
      setComplete(true)
    } catch (error) {
      console.error('Unable to restore email', error)
      setError('Unable to restore email, please try again later.')
    } finally {
      setLoading(false)
    }
  }, [code])

  return (
    <div className="mt-8 space-y-4">
      <div className="text-sm text-red-500 mt-2">{error}</div>

      {!complete && (
        <OrangeButton
          className="w-full"
          disabled={loading}
          onClick={restoreEmail}
        >
          Restore email
        </OrangeButton>
      )}

      {complete ? (
        <SuccessfulMessage msg="Your email has been restored and your password has been reset." />
      ) : (
        <BackToSignIn />
      )}
    </div>
  )
}

function VerifyEmail(props: {
  actionCode?: string | null
  continueUrl?: string | null
}) {
  const { actionCode: code } = props

  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState<string>()

  const authContext = useAuthContext()

  const verifyEmail = useCallback(async () => {
    setLoading(true)
    try {
      if (!code) throw new Error('Invalid auth code')
      await applyActionCode(auth, code)
      await authContext?.user.reload()
      setComplete(true)
    } catch (error) {
      console.error('Unable to verify email', error)
      setError('Unable to verify email, please try again later.')
    } finally {
      setLoading(false)
    }
  }, [authContext?.user, code])

  return (
    <div className="mt-8 space-y-4">
      <div className="text-sm text-red-500 mt-2">{error}</div>

      {!complete && (
        <OrangeButton
          className="w-full"
          disabled={loading}
          onClick={verifyEmail}
        >
          Verify email
        </OrangeButton>
      )}

      {complete ? (
        <SuccessfulMessage msg="Your email has been verified." />
      ) : (
        <BackToSignIn />
      )}
    </div>
  )
}

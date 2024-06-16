import React, { FormEvent, useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'

import { TextInput } from 'src/components/atoms/TextInput'
import { firebaseErrorMsg, useGoToAppWhenLoggedIn } from 'src/utils/auth'
import { LogoHeader } from 'src/components/Logo'
import { OrangeButton } from 'src/components/atoms/Button'
import { auth } from 'src/utils/firebase'
import { BackToSignIn, SuccessfulMessage } from './NavigationLinks'

export function ForgotPassword() {
  const formRef = React.useRef<HTMLFormElement>(null)

  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)

  useGoToAppWhenLoggedIn()

  const sendForgotPassEmail = React.useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const data = new FormData(formRef.current)
    const email = data.get('email')

    if (typeof email == 'string') {
      try {
        setLoading(true)
        // send reset email
        await sendPasswordResetEmail(auth, email)
      } catch (e: any) {
        console.error('error sending password email')
        setError(firebaseErrorMsg(e, 'Error while trying to reset password'))
      } finally {
        setLoading(false)
        setComplete(true)
      }
    }
  }, [])

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LogoHeader title="Forgot your password?" />
        <form
          onChange={() => setError(undefined)}
          ref={formRef}
          className="mt-8 space-y-3"
          onSubmit={sendForgotPassEmail}
        >
          {!complete && (
            <div>
              <TextInput
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
              />
              <div className="text-sm text-red-500 mt-2">{error}</div>
            </div>
          )}

          {!complete && (
            <OrangeButton className="w-full" type="submit" disabled={loading}>
              Submit
            </OrangeButton>
          )}

          {complete ? (
            <SuccessfulMessage msg="Reset email sent." />
          ) : (
            <BackToSignIn />
          )}
        </form>
      </div>
    </div>
  )
}

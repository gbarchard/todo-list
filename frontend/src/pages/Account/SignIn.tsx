import React, { FormEvent, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'
import {
  browserSessionPersistence,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

import { auth } from 'src/utils/firebase'
import { BottomTextInput, TopTextInput } from 'src/components/atoms/TextInput'
import { firebaseErrorMsg, useGoToAppWhenLoggedIn } from 'src/utils/auth'
import { LogoHeader } from 'src/components/Logo'
import PublicDarkModeToggle from 'src/components/molecules/PublicPageDarkModeToggle'

const googleProvider = new GoogleAuthProvider()

export function SignIn() {
  const formRef = React.useRef<HTMLFormElement>(null)

  const [error, setError] = useState<string>()

  const navigate = useNavigate()
  useGoToAppWhenLoggedIn()

  const signIn = React.useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!formRef.current) return

      const data = new FormData(formRef.current)
      const email = data.get('email')
      const pass = data.get('password')
      const remember = data.get('remember') === 'on'

      if (typeof email == 'string' && typeof pass == 'string') {
        try {
          const persistence = remember
            ? browserLocalPersistence
            : browserSessionPersistence
          await setPersistence(auth, persistence)
          await signInWithEmailAndPassword(auth, email, pass)
          navigate('/app')
        } catch (e: any) {
          console.error('error logging in', e)
          if (e?.code) setError(firebaseErrorMsg(e))
          else setError('Unable to login')
        }
      }
    },
    [navigate]
  )

  return (
    <>
      <PublicDarkModeToggle />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <LogoHeader title="Sign in to your account" />
          <form
            onChange={() => setError(undefined)}
            ref={formRef}
            className="mt-8 space-y-6"
            onSubmit={signIn}
          >
            <div>
              <EmailPasswordInput />
              <div className="text-sm text-red-500 mt-2">{error}</div>
            </div>

            <div className=" text-e-gray-10 flex items-center justify-between">
              <RememberMe />
              <ForgotPasswordButton />
            </div>

            <button onClick={() => signInWithPopup(auth, googleProvider)}>
              Sign In With Google
            </button>
            <SignInButton />
            <SignUpLink />
          </form>
        </div>
      </div>
    </>
  )
}

function EmailPasswordInput() {
  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <TopTextInput
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
        />
      </div>
      <div>
        <BottomTextInput
          id="password"
          name="password"
          isSensitive
          autoComplete="current-password"
          required
          placeholder="Password"
        />
      </div>
    </div>
  )
}

function RememberMe() {
  return (
    <div className="flex items-center">
      <input
        id="remember"
        name="remember"
        type="checkbox"
        className="h-4 w-4 text-e-blue-20 focus:ring-e-blue-20 border-gray-300 rounded"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-colored">
        Remember me
      </label>
    </div>
  )
}

function SignUpLink() {
  return (
    <div className="text-sm text-colored w-full flex justify-center">
      <span>Need an account?</span>
      <Link
        to="/signup"
        className="font-medium text-e-blue-20 hover:text-e-blue-30 ml-1"
      >
        Sign up
      </Link>
    </div>
  )
}

function ForgotPasswordButton() {
  return (
    <Link
      to="/forgot-pass"
      className="text-sm font-medium text-e-blue-20 hover:text-e-blue-30 ml-1"
    >
      Forgot password?
    </Link>
  )
}

function SignInButton() {
  return (
    <div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-e-orange-20 hover:bg-e-orange-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-e-orange-30"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-e-orange-10 group-hover:text-e-orange-10"
            aria-hidden="true"
          />
        </span>
        Sign in
      </button>
    </div>
  )
}

import React, { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth"

import { auth } from "src/utils/firebase"
import {
  BottomTextInput,
  ConfirmPasswordInput,
  TextInput,
  TopTextInput,
} from "src/components/atoms/TextInput"
import { useGoToAppWhenLoggedIn } from "src/utils/auth"
import { LogoHeader } from "src/components/Logo"
import PublicDarkModeToggle from "src/components/molecules/PublicPageDarkModeToggle"

export function SignUp() {
  const formRef = React.useRef<HTMLFormElement>(null)

  const [error, setError] = React.useState<string>()

  const navigate = useNavigate()
  useGoToAppWhenLoggedIn()

  const onSubmit = React.useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!formRef.current) return

      const data = new FormData(formRef.current)
      const email = data.get("email")
      const pass = data.get("password")
      const repeatPass = data.get("repeat-password")

      const firstName = data.get("first-name")
      const lastName = data.get("last-name")

      if (pass !== repeatPass) {
        setError("Passwords do not match")
      } else if (typeof email == "string" && typeof pass == "string") {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, pass)
          await updateProfile(res.user, {
            displayName: firstName?.toString() || "Unknown",
          })

          await sendEmailVerification(res.user)

          // TODO: Send firstName/lastName to server
          navigate("/signin")
        } catch (e) {
          console.error("Error logging in", e)
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
          <LogoHeader title="Create an account" />
          <form
            ref={formRef}
            className="mt-8 space-y-6"
            onChange={() => setError(undefined)}
            onSubmit={onSubmit}
          >
            <EmailInput />
            <NameInput />
            <ConfirmPasswordInput />

            {error && <span className="text-red-700 text-sm m-1">{error}</span>}

            <div className="flex items-center justify-center">
              <SignInLink />
            </div>

            <SignUpButton />
          </form>
        </div>
      </div>
    </>
  )
}

function EmailInput() {
  return (
    <div>
      <TextInput
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Email address"
      />
    </div>
  )
}

function NameInput() {
  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <TopTextInput
          id="first-name"
          name="first-name"
          autoComplete="given-name"
          required
          placeholder="First Name"
        />
      </div>
      <div>
        <BottomTextInput
          id="last-name"
          name="last-name"
          autoComplete="family-name"
          required
          placeholder="Last Name"
        />
      </div>
    </div>
  )
}

function SignInLink() {
  return (
    <div className="text-sm">
      <span>Already have an account?</span>
      <Link
        to="/signin"
        className="font-medium text-e-blue-20 hover:text-e-blue-30 ml-1"
      >
        Sign in
      </Link>
    </div>
  )
}

function SignUpButton() {
  return (
    <div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-e-orange-20 hover:bg-e-orange-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-e-orange-30"
      >
        Create Account
      </button>
    </div>
  )
}

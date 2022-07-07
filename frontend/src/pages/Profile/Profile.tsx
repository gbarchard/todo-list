import React from "react"
import { useVersionQuery } from "src/generated/graphql"

import { LockClosedIcon } from "@heroicons/react/solid"
import { signOut } from "firebase/auth"
import { auth } from "src/utils/firebase"
import { Row } from "src/components/atoms/Row"

export function Profile() {
  const { data } = useVersionQuery()

  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="text-4xl m-4">Version</div>
      <div className="text-xl m-4">{data?.version}</div>
      <Row>
        <SignOutButton />
      </Row>
    </div>
  )
}

function SignOutButton() {
  return (
    <div>
      <button
        onClick={() => signOut(auth)}
        className="group relative flex justify-center py-2 px-4 w-32 border border-transparent text-sm font-medium rounded-md text-white bg-e-orange-20 hover:bg-e-orange-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-e-orange-30"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-e-orange-10 group-hover:text-e-orange-10"
            aria-hidden="true"
          />
        </span>
        Sign out
      </button>
    </div>
  )
}

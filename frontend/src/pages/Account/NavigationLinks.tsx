import { Link } from "react-router-dom"

export function BackToSignIn() {
  return (
    <div className="text-sm text-colored w-full flex justify-center">
      <span>Need to sign in?</span>
      <Link
        to="/signin"
        className="font-medium text-e-blue-20 hover:text-e-blue-30 ml-1"
      >
        Click here
      </Link>
    </div>
  )
}

export function SuccessfulMessage(props: { msg: string }) {
  return (
    <div className="text-sm text-colored w-full flex justify-center">
      <span>{props.msg}</span>
      <Link
        to="/signin"
        className="font-medium text-e-blue-20 hover:text-e-blue-30 ml-1"
      >
        Back to sign in
      </Link>
    </div>
  )
}

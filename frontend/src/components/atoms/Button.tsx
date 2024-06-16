import cx from 'classnames'
import React from 'react'
import { TrashIcon } from '@heroicons/react/solid'

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button = (props: ButtonProps) => (
  <button
    type="button"
    {...props}
    className={cx(
      'inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
      props.className
    )}
  >
    {props.children}
  </button>
)

export const PrimaryButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={cx(
      'text-white bg-e-green-30 hover:bg-e-green-31 focus:bg-e-green-31 disabled:bg-e-gray-10 disabled:cursor-not-allowed',
      props.className
    )}
  >
    {props.children}
  </Button>
)

export const SecondaryButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={cx(
      'text-e-green-30 bg-e-green-09 hover:bg-e-green-10 focus:bg-e-green-10 disabled:bg-e-gray-10 disabled:cursor-not-allowed',
      props.className
    )}
  >
    {props.children}
  </Button>
)

export const OrangeButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={cx(
      'text-white bg-e-orange-30 hover:bg-e-orange-31 focus:bg-e-orange-31 disabled:bg-e-gray-10 disabled:cursor-not-allowed',
      props.className
    )}
  >
    {props.children}
  </Button>
)

export const RedButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={cx(
      'text-white bg-red-700 hover:bg-red-600 focus:bg-red-600 disabled:bg-e-gray-10 disabled:cursor-not-allowed',
      props.className
    )}
  >
    {props.children}
  </Button>
)

export const WhiteButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cx(
        'text-e-gray-30 bg-white hover:bg-gray-200 focus:bg-gray-200 border-e-gray-20 disabled:cursor-not-allowed',
        props.className
      )}
    >
      {props.children}
    </Button>
  )
}

export const DeleteIconButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={cx(
      'text-white bg-red-700 hover:bg-red-600 focus:bg-red-600 disabled:bg-e-gray-10 disabled:cursor-not-allowed pr-2 pl-2 pt-1 pb-1',
      props.className
    )}
  >
    <TrashIcon className="h-5 w-5" aria-hidden="true" />
    {props.children}
  </Button>
)

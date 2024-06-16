import cx from 'classnames'
import React, { ChangeEvent, InputHTMLAttributes } from 'react'

export type TextInputChangeEvent = ChangeEvent<HTMLInputElement>

export type TextInputProps = {
  label?: string
  isSensitive?: boolean
  containerProps?: InputHTMLAttributes<HTMLDivElement>
} & InputHTMLAttributes<HTMLInputElement>

export function TextInput(props: TextInputProps) {
  return (
    <div
      {...props.containerProps}
      className={cx('w-full', props.containerProps?.className)}
    >
      {props.label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-white-700 mb-1"
        >
          {props.label}
        </label>
      )}
      <div className="w-full">
        <input
          type={props.isSensitive ? 'password' : 'text'}
          {...props}
          className={cx(
            'appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 dark:text-white-900 text-gray-900  rounded-md focus:outline-none focus:ring-e-blue-20 focus:border-e-blue-20 focus:z-10 sm:text-sm',
            props.className
          )}
        />
      </div>
    </div>
  )
}

export const TopTextInput = (props: TextInputProps) => (
  <TextInput {...props} className={cx('rounded-b-none', props.className)} />
)

export const MiddleTextInput = (props: TextInputProps) => (
  <TextInput
    {...props}
    className={cx('rounded-b-none', 'rounded-t-none', props.className)}
  />
)

export const BottomTextInput = (props: TextInputProps) => (
  <TextInput {...props} className={cx('rounded-t-none', props.className)} />
)

export function ConfirmPasswordInput() {
  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <TopTextInput
          id="password"
          name="password"
          isSensitive
          autoComplete="new-password"
          required
          minLength={8}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          placeholder="Password"
          title="Password must have at least 8 characters and contain at least one capital letter, number, and special character"
        />
      </div>
      <div>
        <BottomTextInput
          id="repeat-password"
          name="repeat-password"
          isSensitive
          autoComplete="repeat-password"
          required
          placeholder="Repeat Password"
          title="Password must have at least 8 characters and contain at least one capital letter, number, and special character"
        />
      </div>
    </div>
  )
}

import React, { ChangeEvent, TextareaHTMLAttributes } from 'react'

export type TextAreaInputChangeEvent = ChangeEvent<HTMLTextAreaElement>

export type TextAreaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  value: string
  onChangeHandler: (event: TextAreaInputChangeEvent) => void
}

export function TextAreaInput(props: TextAreaInputProps) {
  return (
    <div>
      {props.label && (
        <label
          htmlFor={props.id}
          className="block text-lg font-medium text-gray-700 dark:text-white mb-1"
        >
          {props.label}
        </label>
      )}
      <textarea
        className="w-full h-32 border rounded-md border-gray-200 p-3"
        value={props.value}
        onChange={props.onChangeHandler}
      />
    </div>
  )
}

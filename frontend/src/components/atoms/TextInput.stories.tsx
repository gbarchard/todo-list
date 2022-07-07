import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import {
  BottomTextInput,
  MiddleTextInput,
  TextInput,
  TextInputProps,
  TopTextInput,
} from "src/components/atoms/TextInput"

export default {
  title: "Atoms/TextInput",
  component: TextInput,
  argTypes: {
    autoComplete: {
      description:
        "The value of the 'autocomplete' attribute for the input HTML tag. See the following link for all options: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
      defaultValue: "on",
      control: { type: "radio" },
      options: [
        "on",
        "name",
        "email",
        "username",
        "new-password",
        "current-password",
      ],
      type: { name: "string", required: false },
    },
    className: {
      description:
        "Additional classes (e.g. Tailwind classes) to apply to the Input component",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    defaultValue: {
      description: "The default value of the Input component",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    id: {
      description: "The value of the 'id' attribute for the input HTML tag",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    isSensitive: {
      description:
        "Determines if the type of the textbox is 'password' or 'text'",
      default: false,
      control: { type: "boolean" },
      type: { name: "boolean", required: false },
    },
    label: {
      description: "Sets the 'label' attribute for the input HTML tag",
      defaultValue: "First Name",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    name: {
      description: "The value of the 'name' attribute for the input HTML tag",
      defaultValue: "",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    onChange: {
      description: "Handler function for the input's on-change event",
      action: "changed",
      type: { name: "function", required: false },
    },
    placeholder: {
      description: "The placeholder text for the Input component",
      defaultValue: "Susie",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    required: {
      description:
        "If this tag is present, indicates the input is required to have a truthy value",
      control: { type: "boolean" },
      type: { name: "boolean", required: false },
    },
    value: {
      description: "The current value of the text input",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
  },
} as ComponentMeta<typeof TextInput>

const DefaultTemplate: ComponentStory<typeof TextInput> = (
  args: TextInputProps
) => <TextInput {...args} />
export const Default = DefaultTemplate.bind({})
Default.args = {}

const TopTextInputTemplate: ComponentStory<typeof TopTextInput> = (
  args: TextInputProps
) => <TopTextInput {...args} />
export const Top = TopTextInputTemplate.bind({})
Top.args = {}

const MiddleTextInputTemplate: ComponentStory<typeof MiddleTextInput> = (
  args: TextInputProps
) => <MiddleTextInput {...args} />
export const Middle = MiddleTextInputTemplate.bind({})
Middle.args = {}

const BottomTextInputTemplate: ComponentStory<typeof BottomTextInput> = (
  args: TextInputProps
) => <BottomTextInput {...args} />
export const Bottom = BottomTextInputTemplate.bind({})
Bottom.args = {}

// Example of form with two inputs
const TwoInputStackTemplate: ComponentStory<typeof TopTextInput> = (
  args: TextInputProps
) => (
  <div className="rounded-md shadow-sm -space-y-px">
    <div>
      <TopTextInput {...args} label="" placeholder="email" />
    </div>
    <div>
      <BottomTextInput {...args} label="" placeholder="password" isSensitive />
    </div>
  </div>
)
export const TwoInputStack = TwoInputStackTemplate.bind({})
TwoInputStack.args = {}

// Example of a form with three or more inputs
const ThreeInputStackTemplate: ComponentStory<any> = (args: TextInputProps) => (
  <div className="rounded-md shadow-sm -space-y-px">
    <div>
      <TopTextInput
        {...args}
        label=""
        placeholder="email"
        isSensitive={false}
      />
    </div>
    <div>
      <MiddleTextInput
        {...args}
        label=""
        placeholder="phone"
        isSensitive={false}
      />
    </div>
    <div>
      <BottomTextInput {...args} label="" placeholder="password" isSensitive />
    </div>
  </div>
)
export const ThreeInputStack = ThreeInputStackTemplate.bind({})
ThreeInputStack.args = {}

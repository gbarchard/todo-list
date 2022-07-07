import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { AddIcon } from "src/components/atoms/StarterIcon"

export default {
  title: "Atoms/StarterIcon",
  component: AddIcon,
  argTypes: {
    className: {
      description:
        "Additional classes (e.g. Tailwind classes) to apply to the component",
      defaultValue: "",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    iconColor: {
      description:
        "The CSS color of the icon; overrides CSS classes to change stroke color of the icon",
      defaultValue: "#31343F",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    iconSize: {
      description:
        "The CSS size of the icon; overrides CSS classes to change size of the icon",
      defaultValue: "20px",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
  },
} as ComponentMeta<typeof AddIcon>

const DefaultTemplate: ComponentStory<typeof AddIcon> = (
  args: React.ComponentProps<typeof AddIcon>
) => <AddIcon {...args} />
export const Default = DefaultTemplate.bind({})
Default.args = {}

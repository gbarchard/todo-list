import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import {
  Button,
  ButtonProps,
  DeleteIconButton,
  OrangeButton,
  PrimaryButton,
  SecondaryButton,
  WhiteButton,
} from "src/components/atoms/Button"
import { childrenArg, classNameArg } from "../helpers.stories"

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    children: childrenArg("Button Content"),
    className: classNameArg(),
    label: {
      description: "Sets the 'label' attribute for the button",
      defaultValue: "button-label-1",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
    onClick: {
      description: "Handler function for the button's click event",
      action: "clicked",
      type: { name: "function", required: false },
    },
  },
} as ComponentMeta<typeof Button>

const DefaultTemplate: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} />
)
export const Default = DefaultTemplate.bind({})
Default.args = {
  className: "text-white bg-e-orange-30",
}

const PrimaryTemplate: ComponentStory<typeof PrimaryButton> = (
  args: ButtonProps
) => <PrimaryButton {...args} />
export const Primary = PrimaryTemplate.bind({})

const SecondaryTemplate: ComponentStory<typeof SecondaryButton> = (
  args: ButtonProps
) => <SecondaryButton {...args} />
export const Secondary = SecondaryTemplate.bind({})

const OrangeTemplate: ComponentStory<typeof OrangeButton> = (
  args: ButtonProps
) => <OrangeButton {...args} />
export const Orange = OrangeTemplate.bind({})

const WhiteTemplate: ComponentStory<typeof WhiteButton> = (
  args: ButtonProps
) => <WhiteButton {...args} />
export const White = WhiteTemplate.bind({})

const DeleteIconTemplate: ComponentStory<typeof DeleteIconButton> = (
  args: ButtonProps
) => <DeleteIconButton {...args} />
export const Delete = DeleteIconTemplate.bind({})

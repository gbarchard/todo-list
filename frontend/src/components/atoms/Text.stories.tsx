import { ComponentStory, ComponentMeta } from "@storybook/react"

import { B, H3, H5 } from "src/components/atoms/Text"

export default {
  title: "Atoms/Text",
  component: H3,
  argTypes: {
    children: {
      description: "The string value that renders within the Text component",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
  },
} as ComponentMeta<typeof H3>

const h3Template: ComponentStory<typeof H3> = (
  args: React.ComponentProps<typeof H3>
) => <H3 {...args} />
export const H3_Text = h3Template.bind({})
H3_Text.args = {
  children: "H3 Header Content",
}

const h5Template: ComponentStory<typeof H5> = (
  args: React.ComponentProps<typeof H5>
) => <H5 {...args} />
export const H5_Text = h5Template.bind({})
H5_Text.args = {
  children: "H5 Header Content",
}

const bTemplate: ComponentStory<typeof B> = (
  args: React.ComponentProps<typeof B>
) => <B {...args} />
export const B_Text = bTemplate.bind({})
B_Text.args = {
  children: "B Content",
}

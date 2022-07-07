import { ComponentMeta, ComponentStory } from "@storybook/react"
import { classNameArg } from "src/components/helpers.stories"

import { Column, ColumnProps } from "./Column"

export default {
  title: "Atoms/Column",
  component: Column,
  argTypes: {
    className: classNameArg(),
  },
} as ComponentMeta<typeof Column>

const DefaultTemplate: ComponentStory<typeof Column> = (args: ColumnProps) => (
  <Column {...args}>
    <div className="w-20 h-20 bg-green-300 m-5">1</div>
    <div className="w-20 h-20 bg-yellow-300 m-5">2</div>
    <div className="w-20 h-20 bg-red-300 m-5">3</div>
  </Column>
)
export const Default = DefaultTemplate.bind({})
Default.args = {}

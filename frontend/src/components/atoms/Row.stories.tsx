import { ComponentMeta, ComponentStory } from "@storybook/react"
import { classNameArg } from "src/components/helpers.stories"

import { Row, RowProps } from "./Row"

export default {
  title: "Atoms/Row",
  component: Row,
  argTypes: {
    className: classNameArg(),
  },
} as ComponentMeta<typeof Row>

const DefaultTemplate: ComponentStory<typeof Row> = (args: RowProps) => (
  <Row {...args}>
    <div className="w-20 h-20 bg-green-300 m-5">1</div>
    <div className="w-20 h-20 bg-yellow-300 m-5">2</div>
    <div className="w-20 h-20 bg-red-300 m-5">3</div>
  </Row>
)
export const Default = DefaultTemplate.bind({})
Default.args = {}

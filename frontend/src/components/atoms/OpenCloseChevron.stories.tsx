import { ComponentMeta, ComponentStory } from "@storybook/react"
import { classNameArg } from "src/components/helpers.stories"

import { OpenCloseChevron, OpenCloseChevronProps } from "./OpenCloseChevron"

export default {
  title: "Atoms/OpenCloseChevron",
  component: OpenCloseChevron,
  argTypes: {
    className: classNameArg("h-5 w-5"),
    open: {
      type: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof OpenCloseChevron>

const DefaultTemplate: ComponentStory<typeof OpenCloseChevron> = (
  args: OpenCloseChevronProps
) => <OpenCloseChevron {...args} />
export const Default = DefaultTemplate.bind({})
Default.args = {}

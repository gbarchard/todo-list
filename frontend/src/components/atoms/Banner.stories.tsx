import { ComponentMeta, ComponentStory } from "@storybook/react"
import { childrenArg, classNameArg } from "src/components/helpers.stories"

import { Banner, BannerProps } from "./Banner"

export default {
  title: "Atoms/Banner",
  component: Banner,
  argTypes: {
    children: childrenArg("This is a Banner"),
    className: classNameArg(),
  },
} as ComponentMeta<typeof Banner>

const DefaultTemplate: ComponentStory<typeof Banner> = (args: BannerProps) => (
  <Banner {...args}>{args.children}</Banner>
)
export const Default = DefaultTemplate.bind({})
Default.args = {}

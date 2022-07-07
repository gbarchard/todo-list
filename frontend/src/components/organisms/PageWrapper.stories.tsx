import React, { PropsWithChildren } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import PageWrapper from "src/components/organisms/PageWrapper"

export default {
  title: "Organisms/PageWrapper",
  component: PageWrapper,
  argTypes: {
    children: {
      description:
        "The content that renders within the Page Wrapper. This can be any html content or React element",
      defaultValue: "Page Content",
      control: { type: "text" },
      type: { name: "string", required: false },
    },
  },
} as ComponentMeta<typeof PageWrapper>

const DefaultTemplate: ComponentStory<typeof PageWrapper> = (
  args: PropsWithChildren<{}>
) => {
  return (
    <Router>
      <PageWrapper {...args}></PageWrapper>
    </Router>
  )
}
export const Default = DefaultTemplate.bind({})
Default.args = {}

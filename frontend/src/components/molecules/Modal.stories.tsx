import React, { useEffect } from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useArgs } from "@storybook/client-api"

import { Modal, ModalProps } from "src/components/molecules/Modal"
import { PrimaryButton } from "src/components/atoms/Button"

export default {
  title: "Molecules/Modal",
  component: Modal,
  argTypes: {
    open: {
      description:
        "Determines if the modal is visible in the UI. This property should be controlled programmatically, where an event triggers setting 'open' to true, and a button click in the Modal sets 'open' to false.",
      defaultValue: true,
      control: { type: "boolean" },
      type: { name: "boolean", required: true },
    },
  },
} as ComponentMeta<typeof Modal>

const DefaultTemplate: ComponentStory<typeof Modal> = (args: ModalProps) => {
  // Ensure the modal closes when story is changed
  useEffect(() => {
    return () => {
      args.open = false
    }
  })

  // Allow the button in the modal to close the modal
  const [_, updateArgs] = useArgs()
  const clickHandler = () => {
    updateArgs({ ...args, open: false })
  }

  return (
    <Modal open={args.open}>
      <Modal.Body>Modal Body Content</Modal.Body>
      <Modal.ButtonFooter>
        <PrimaryButton onClick={clickHandler}>Example Button</PrimaryButton>
      </Modal.ButtonFooter>
    </Modal>
  )
}
export const Default = DefaultTemplate.bind({})
Default.args = {
  open: true,
}

export const childrenArg = (defaultValue?: string) => ({
  name: "children",
  description:
    "The content that renders within the component. This can be any html content or React element",
  control: { type: "text" },
  type: { name: "string", required: false },
  defaultValue,
})

export const classNameArg = (defaultValue?: string) => ({
  name: "className",
  description:
    "Additional classes (e.g. Tailwind classes) to apply to the component",
  control: { type: "text" },
  type: { name: "string", required: false },
  defaultValue,
})

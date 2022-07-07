import cx from "classnames"
import { HTMLDivProps, HTMLSpanProps } from "src/types/html.types"

export const H2 = (props: HTMLDivProps) => (
  <div {...props} className={cx(props.className, "text-3xl font-medium")}>
    {props.children}
  </div>
)

export const H3 = (props: HTMLDivProps) => (
  <div {...props} className={cx(props.className, "text-2xl font-medium")}>
    {props.children}
  </div>
)

export const H5 = (props: HTMLDivProps) => (
  <div {...props} className={cx(props.className, "text-xl font-medium")}>
    {props.children}
  </div>
)

export const B = (props: HTMLSpanProps) => (
  <b className="text-e-gray-30" {...props}>
    {props.children}
  </b>
)

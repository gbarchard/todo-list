import cx from "classnames"
import { HTMLDivProps } from "src/types/html.types"

export type BannerProps = HTMLDivProps

export const Banner = (props: BannerProps) => (
  <div
    {...props}
    className={cx(
      "p-2 pl-6 pr-6 h-14 flex flex-row items-center justify-between bg-gray-50 border-gray-200 font-normal text-sm",
      props.className
    )}
  >
    {props.children}
  </div>
)

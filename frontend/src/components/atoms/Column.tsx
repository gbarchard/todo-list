import cx from 'classnames'
import { HTMLDivProps } from 'src/types/html.types'

export type ColumnProps = HTMLDivProps

export const Column = (props: ColumnProps) => (
  <div {...props} className={cx('flex flex-col', props.className)}>
    {props.children}
  </div>
)

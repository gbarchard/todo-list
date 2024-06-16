import cx from 'classnames'
import { HTMLDivProps } from 'src/types/html.types'

export type RowProps = HTMLDivProps

export const Row = (props: RowProps) => (
  <div {...props} className={cx('flex flex-row', props.className)}>
    {props.children}
  </div>
)

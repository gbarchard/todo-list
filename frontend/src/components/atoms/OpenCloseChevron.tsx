import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'

export type OpenCloseChevronProps = {
  /** whether to display the right or down Chevron icon */
  open?: boolean
} & React.ComponentProps<typeof ChevronDownIcon>

export function OpenCloseChevron(props: OpenCloseChevronProps) {
  if (props.open) return <ChevronDownIcon {...props} />
  else return <ChevronRightIcon {...props} />
}

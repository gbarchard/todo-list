import { Fragment, InputHTMLAttributes, PropsWithChildren } from 'react'
import cx from 'classnames'
import { Dialog, Transition } from '@headlessui/react'

export type ModalProps = {
  open: boolean
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  const { open } = props

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {}}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {props.children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

Modal.Body = (props: InputHTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cx('mt-4 sm:flex sm:items-start sm:flex-col', props.className)}
  >
    {props.children}
  </div>
)

Modal.ButtonFooter = (props: InputHTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cx('mt-6 sm:flex sm:flex-row justify-between', props.className)}
  >
    {props.children}
  </div>
)

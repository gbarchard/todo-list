import { PropsWithChildren } from "react"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { MenuIcon, XIcon, ViewGridIcon } from "@heroicons/react/outline"
import { Link, useLocation } from "react-router-dom"

import DarkModeToggle from "src/components/atoms/DarkModeToggle"
import { useAuthContext } from "src/utils/auth"

const navigation = [{ name: "Home", href: "/app/home", icon: ViewGridIcon }]

function useCurrentNavigation() {
  const location = useLocation()
  return navigation.find((nav) => location.pathname.startsWith(nav.href))?.name
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function PageWrapper(props: PropsWithChildren<{}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <DesktopSidebar />

        {/* Body */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="flex items-center sticky top-0 z-10 h-14 md:hidden bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 h-screen">{props.children}</main>
        </div>
      </div>
    </>
  )
}

function DesktopSidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-colored bg-colored">
        <NavList />
        <UserProfile />
      </div>
    </div>
  )
}

function MobileSidebar(props: {
  sidebarOpen: boolean
  setSidebarOpen(open: boolean): void
}) {
  const { sidebarOpen, setSidebarOpen } = props

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <NavList />
            <UserProfile />
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function NavList() {
  const currentName = useCurrentNavigation()

  return (
    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
      <div className="flex-shrink-0 flex items-center px-4">
        <img className="h-8 w-auto" src="/logo512.png" alt="Starter" />
      </div>
      <nav className="mt-5 px-2 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              item.name === currentName
                ? "bg-gray-100 text-gray-900 dark:text-e-gray-30 dark:hover:text-e-gray-30 dark:bg-gray-300"
                : "text-gray-600 dark:text-e-gray-10 hover:bg-gray-50 dark:hover:bg-gray-100 dark:hover:text-e-gray-30",
              "group flex items-center px-2 py-2 text-base font-medium rounded-md "
            )}
          >
            <item.icon
              className={classNames(
                item.name === currentName
                  ? "text-gray-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "mr-4 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function UserProfile() {
  const context = useAuthContext()
  const user = context?.user

  if (!user) return null
  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <Link to="/app/profile" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            {user.photoURL ? (
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={user.photoURL}
                alt={user.displayName || "Unknown User"}
              />
            ) : (
              <InitialsCircle name={user.displayName} />
            )}
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900 dark:text-e-gray-10">
              {user.displayName || "Unknown User"}
            </p>
            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:text-e-orange-20">
              View profile
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-end flex-1">
        <DarkModeToggle />
      </div>
    </div>
  )
}

function InitialsCircle(props: { name?: string | null }) {
  const names = (props.name || "Unknown User").split(" ")
  const initials = names
    .map((name) => name[0])
    .slice(0, 2)
    .join("")

  return (
    <div className="flex flex-col justify-center items-center inline-block h-10 w-10 rounded-full bg-e-gray-10 text-lg">
      {initials}
    </div>
  )
}

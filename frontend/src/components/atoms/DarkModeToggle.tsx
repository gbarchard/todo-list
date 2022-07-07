import { Switch } from "@headlessui/react"
import { SunIcon, MoonIcon } from "@heroicons/react/solid"
import classNames from "classnames"

import { useThemeContext } from "src/utils/darkmode"

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useThemeContext()

  const enabled = theme === "dark"

  return (
    <Switch
      checked={enabled}
      onChange={toggleTheme}
      className={classNames(
        enabled ? "bg-e-green-20" : "bg-e-orange-10",
        // Add className "bg-colored" for a subtler experience
        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-e-gray-30"
      )}
    >
      <span
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-all ease-in-out duration-200"
        )}
      >
        <span
          className={classNames(
            enabled
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <SunIcon className="text-e-orange-30 h-4 w-4" />
        </span>
        <span
          className={classNames(
            enabled
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <MoonIcon className="text-e-gray-20 h-4 w-4" />
        </span>
      </span>
    </Switch>
  )
}

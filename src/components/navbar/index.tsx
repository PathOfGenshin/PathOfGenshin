import { useState } from "react"

import Link from "next/link"

import clsx from "clsx"

import { SettingsDropdown } from "@/components/navbar/SettingsDropdown"
import { ToggleDarkMode } from "@/components/theme/ToggleDarkMode"
import { routes } from "@/routes"
import { MenuIcon, XIcon } from "@heroicons/react/solid"

import { Logo } from "./Logo"
import { NavbarLink } from "./NavbarLink"

export const NavBar: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
}: React.HTMLAttributes<HTMLElement>) => {
  const [hamburgerEnabled, setHamburgerEnabled] = useState(false)
  const toggleHamburger = (): void => setHamburgerEnabled(!hamburgerEnabled)

  return (
    <nav className={clsx("bg-gray-800 dark:bg-g-dark-800", className)}>
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex relative justify-between items-center h-16">
          <div className="flex absolute inset-y-0 left-0 items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              className="inline-flex justify-center items-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
              onClick={toggleHamburger}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon
                className={clsx(hamburgerEnabled ? "hidden" : "block", "h-6 w-6")}
              />
              <XIcon
                className={clsx(hamburgerEnabled ? "block" : "hidden", "h-6 w-6")}
              />
            </button>
          </div>
          <div className="flex flex-1 justify-center items-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <a>
                  <div
                    className="block w-auto h-8 text-white lg:hidden"
                    role="img"
                    aria-label="Path of Genshin Logo"
                  >
                    <Logo />
                  </div>
                </a>
              </Link>
              <Link href="/">
                <a>
                  <div
                    className="hidden w-auto h-8 text-white lg:block"
                    role="img"
                    aria-label="Path of Genshin Logo"
                  >
                    <Logo />
                  </div>
                </a>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {routes.map((route) => (
                  <NavbarLink
                    key={route.path}
                    name={route.name}
                    path={route.path}
                    isSmall={true}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Toggle Dark Mode */}
            <ToggleDarkMode />
            {/* Settings dropdown */}
            <SettingsDropdown />
          </div>
        </div>
      </div>
      <div className={clsx(hamburgerEnabled ? "block" : "hidden", "sm:hidden")}>
        <div className="absolute z-10 px-2 pt-2 pb-3 space-y-1 w-full bg-gray-800 shadow-lg dark:bg-g-dark-800">
          {routes.map((route) => (
            <NavbarLink
              key={route.path}
              name={route.name}
              path={route.path}
              isSmall={false}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

export default NavBar

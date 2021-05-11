import Link from "next/link"

import clsx from "clsx"

import { Menu, Transition } from "@headlessui/react"

export const SettingsDropdown: React.FC = () => {
  return (
    <div className="relative ml-3">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="p-1 text-gray-400 bg-gray-800 rounded-full dark:bg-g-dark-800 dark:hover:bg-g-dark-700 hover:text-white dark:text-g-dark-2 dark:hover:text-g-dark-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/static/elements/Hydro_White.png"
                alt=""
              />
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md border border-gray-200 divide-y divide-gray-100 shadow-lg origin-top-right outline-none"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/calculator/settings">
                        <a
                          className={clsx(
                            "flex justify-between py-2 px-4 w-full text-sm leading-5 text-left",
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          )}
                        >
                          Settings
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

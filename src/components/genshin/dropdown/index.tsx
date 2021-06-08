import { Fragment } from "react"

import clsx from "clsx"

import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid"

interface DropdownSelectorProps<T> {
  label?: string
  width: "sm" | "md" | "lg"
  selected: T
  options: T[] | Readonly<T[]>
  buttonValue: (t: T) => string | number
  optionValue: (t: T) => string | number
  onSelected: (t: T) => void
  disabled?: boolean
}

const WIDTH_SIZES = Object.freeze({ sm: "w-24", md: "w-36", lg: "w-48" })

const DropdownSelector = <T,>({
  label,
  width,
  selected,
  options,
  buttonValue,
  optionValue,
  onSelected,
  disabled,
}: DropdownSelectorProps<T>): React.ReactElement | null => {
  return (
    <div className="h-10 font-genshin">
      <div className="h-10 text-g-paper-0">
        <Listbox value={selected} onChange={onSelected} disabled={disabled}>
          {({ open }) => (
            <div className="flex items-center space-x-4">
              {label && (
                <Listbox.Label className="text-g-paper-0 dark:text-g-dark-0">
                  {label}
                </Listbox.Label>
              )}
              <div className={clsx("relative", WIDTH_SIZES[width])}>
                <Listbox.Button
                  className={clsx(
                    "relative py-2 pr-8 pl-3 w-full text-left rounded-full ring-inset shadow-md transition duration-100 cursor-default bg-g-dark-1 sm:text-sm",
                    !disabled
                      ? "hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring"
                      : "",
                    open
                      ? "hover:ring-g-button-focus-ring ring ring-g-button-focus-ring"
                      : "",
                  )}
                >
                  <span
                    className={clsx(
                      "block truncate",
                      disabled ? "text-g-button-focus" : "",
                    )}
                  >
                    {buttonValue(selected)}
                  </span>
                  <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className={clsx(
                        "w-5 h-5 text-g-paper-0",
                        disabled ? "opacity-0" : "",
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="overflow-auto absolute z-10 p-1 mt-1 w-full text-base rounded-xl ring-1 ring-black ring-opacity-5 shadow-lg max-h-47 bg-g-dark-600 focus:outline-none sm:text-sm">
                    {options.map((option: T, index: number) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          clsx(
                            "cursor-default select-none relative py-2 pl-2 text-g-dark-1 rounded-lg",
                            active ? "bg-g-dark-500" : "",
                          )
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={clsx(
                                "block truncate",
                                selected ? "font-medium" : "font-normal",
                              )}
                            >
                              {optionValue(option)}
                            </span>
                            {selected ? (
                              <span className="flex absolute inset-y-0 right-0 items-center pr-2">
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  )
}

export default DropdownSelector

import { Fragment } from "react"

import clsx from "clsx"

import { Ascension } from "@/generated/model/ascension"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid"

interface AscensionSelectorProps {
  selected: Ascension
  ascensions: Ascension[]
  onSelected: (ascension: Ascension) => void
}

const AscensionSelector: React.FC<AscensionSelectorProps> = ({
  selected,
  ascensions,
  onSelected,
}: AscensionSelectorProps) => {
  return (
    <div className="h-10 leading-6 font-genshin">
      <div className="fixed w-24 h-10 text-g-paper-0">
        <Listbox value={selected} onChange={onSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative py-2 pr-8 pl-3 w-full text-left rounded-full shadow-md cursor-default bg-g-dark-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.maxLevel}</span>
              <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
                <ChevronDownIcon
                  className="w-5 h-5 text-g-paper-0"
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
              <Listbox.Options className="overflow-auto absolute p-1 mt-1 w-full max-h-48 text-base rounded-xl ring-1 ring-black ring-opacity-5 shadow-lg bg-g-dark-600 focus:outline-none sm:text-sm">
                {ascensions.map((ascension: Ascension, ascensionIdx: number) => (
                  <Listbox.Option
                    key={ascensionIdx}
                    className={({ active }) =>
                      clsx(
                        "cursor-default select-none relative py-2 pl-2 text-g-dark-1 rounded-lg",
                        active ? "bg-g-dark-500" : "",
                      )
                    }
                    value={ascension}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={clsx(
                            "block truncate",
                            selected ? "font-medium" : "font-normal",
                          )}
                        >
                          {ascension.maxLevel}
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
        </Listbox>
      </div>
    </div>
  )
}

export default AscensionSelector

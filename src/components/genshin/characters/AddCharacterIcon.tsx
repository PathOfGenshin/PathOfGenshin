import { forwardRef, HTMLProps } from "react"

import { useRouter } from "next/router"

import clsx from "clsx"

import { PlusIcon } from "@heroicons/react/solid"

interface AddCharacterIconProps {
  disabled?: boolean
}

const AddCharacterIcon: React.FC<AddCharacterIconProps> = forwardRef<
  HTMLAnchorElement,
  AddCharacterIconProps
>(
  (
    { onClick, href, disabled }: AddCharacterIconProps & HTMLProps<HTMLAnchorElement>,
    ref,
  ) => {
    const router = useRouter()

    return (
      <div className="block w-16 h-16 md:w-18 md:h-18 lg:w-24 lg:h-24">
        <a
          href={href}
          onClick={onClick}
          ref={ref}
          className={clsx(
            "flex relative justify-center items-center w-16 h-16 transition-transform duration-100 transform md:w-18 md:h-18 lg:w-24 lg:h-24 focus:outline-none",
            router.asPath === href ? "text-g-char-selected" : "",
            disabled ? "opacity-30" : "hover:text-g-char-selected opacity-100",
          )}
        >
          <div
            className={clsx(
              "flex justify-center items-center w-12 h-12 rounded-full border-2 transition-colors duration-100 md:border-3 md:w-13.5 md:h-13.5 lg:w-18 lg:h-18 lg:border-4 border-g-dark-2",
              router.asPath === href ? "border-g-char-selected" : "",
              disabled ? "opacity-30" : "hover:border-g-char-selected opacity-100",
            )}
          >
            <PlusIcon className="w-5 h-5 lg:w-8 lg:h-8 text-g-dark-800 dark:text-g-dark-0" />
          </div>
        </a>
      </div>
    )
  },
)
AddCharacterIcon.displayName = "AddCharacterIcon"

export default AddCharacterIcon

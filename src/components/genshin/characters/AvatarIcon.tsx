import { SVGProps } from "react"

import Image from "next/image"

import clsx from "clsx"

import { avatarIcon, elementalIcon, rarityBackground } from "@/assets/static"
import styles from "@/styles/image.module.scss"

import { AvatarIconProps } from "./icon"

interface FocusedProps {
  isFocused: boolean
}

// The curvature at the bottom-right of the avatar icon, which overlays on top of the
// existing character image.
const SVGRoundBorder = ({
  className,
}: SVGProps<SVGSVGElement>): React.ReactElement<SVGSVGElement> => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 177 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="m147 32c17.965-4.5716 27.189-15.211 30-32l0.11165 32h-0.11165z"
        fill="currentColor" // inherits passed-in text color
      />
    </svg>
  )
}

const AvatarIcon: React.FC<AvatarIconProps & FocusedProps> = ({
  iconName,
  charName,
  rarity,
  element,
  onClick,
  "data-id": dataId,
  "data-name": dataName,
  isFocused,
  disabled,
}: AvatarIconProps & FocusedProps) => {
  return (
    <div className={clsx("block w-24 2xl:w-32", disabled ? "opacity-30" : "")}>
      <button
        data-id={dataId}
        data-name={dataName}
        className={clsx(
          "block relative w-24 rounded-md shadow-md transition duration-75 transform 2xl:w-32 hover:outline-none focus:outline-none",
          isFocused ? "ring ring-blue-400 dark:ring-blue-50 scale-105" : "",
          !disabled
            ? "hover:ring hover:ring-blue-400 dark:hover:ring-blue-50 hover:scale-105 focus:ring focus:ring-blue-400 dark:focus:ring-blue-50 focus:scale-105"
            : "cursor-not-allowed",
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="absolute w-full">
          <Image
            className={clsx(
              "rounded-md opacity-80 pointer-events-none select-none",
              styles.crisp,
            )}
            src={rarityBackground(rarity)}
            alt={`${rarity} Star`}
            quality={100}
            priority
            layout="responsive"
            width={78}
            height={96}
          />
        </div>
        <div className="flex relative flex-col">
          <div className="relative w-24 h-24 2xl:w-32 2xl:h-32">
            <Image
              className={clsx(
                "w-24 rounded-md pointer-events-none select-none 2xl:w-32",
                styles.crisp,
              )}
              src={avatarIcon(iconName)}
              alt={charName}
              quality={100}
              layout="responsive"
              width={128}
              height={128}
            />
            <SVGRoundBorder className="absolute -bottom-px text-g-paper" />
          </div>
          <div className="relative h-6 text-sm leading-6 tracking-tight rounded-b-md font-genshin bg-g-paper text-g-paper-0 2xl:h-7.5 2xl:text-lg 2xl:leading-7.5">
            {charName}
          </div>
        </div>
        <div className="absolute w-6 h-6 top-0.5 left-0.5 2xl:w-8 2xl:h-8">
          <Image
            className={clsx("pointer-events-none select-none", styles.crisp)}
            src={elementalIcon(element)}
            alt={element}
            quality={100}
            priority
            layout="responsive"
            width={32}
            height={32}
          />
        </div>
      </button>
    </div>
  )
}

export default AvatarIcon

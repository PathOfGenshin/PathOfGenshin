import { HTMLProps } from "react"

import Image from "next/image"

import clsx from "clsx"

import { avatarIcon, elementalIcon, qualityBackground } from "@/assets/static"
import image from "@/styles/image.module.scss"

import SVGRoundBorder from "../icons/SVGRoundBorder"
import { AvatarIconButtonProps, AvatarIconProps } from "./icon"

interface FocusedProps {
  isFocused: boolean
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  iconName,
  charName,
  quality,
  element,
  label,
}: AvatarIconProps) => {
  const avatarName: string = label ?? charName
  const isLongName: boolean = avatarName.length >= 14
  return (
    <div className="block relative w-24 text-center rounded-md shadow-md 2xl:w-32">
      <div className="absolute w-full pointer-events-none select-none">
        <Image
          className={clsx(
            "rounded-md opacity-80 pointer-events-none select-none",
            image.crisp,
          )}
          src={qualityBackground(quality)}
          alt={`${quality} Star`}
          quality={100}
          priority
          width={130}
          height={160}
        />
      </div>
      <div className="flex relative flex-col">
        <div className="relative w-24 h-24 pointer-events-none select-none 2xl:w-32 2xl:h-32">
          <Image
            className={clsx(
              "w-24 rounded-md pointer-events-none select-none 2xl:w-32",
              image.crisp,
            )}
            src={avatarIcon(iconName)}
            alt={charName}
            quality={100}
            width={256}
            height={256}
          />
          <SVGRoundBorder className="absolute -bottom-px pointer-events-none select-none text-g-paper" />
        </div>
        <div
          className={clsx(
            "relative h-6 text-sm leading-6 tracking-tight rounded-b-md font-genshin bg-g-paper text-g-paper-0 2xl:h-7.5 2xl:leading-7.5 overflow-hidden",
            isLongName ? "2xl:text-sm" : "2xl:text-lg",
          )}
        >
          {avatarName}
        </div>
      </div>
      <div className="absolute w-6 h-6 top-0.5 left-0.5 2xl:w-8 2xl:h-8 select-none pointer-events-none">
        <Image
          className={clsx("pointer-events-none select-none", image.crisp)}
          src={elementalIcon(element)}
          alt={element}
          quality={100}
          priority
          width={32}
          height={32}
        />
      </div>
    </div>
  )
}

export const AvatarIconButton: React.FC<
  AvatarIconButtonProps & FocusedProps & HTMLProps<HTMLButtonElement>
> = ({
  iconName,
  charName,
  quality,
  element,
  onClick,
  isFocused,
  disabled,
}: AvatarIconButtonProps & FocusedProps & HTMLProps<HTMLButtonElement>) => {
  return (
    <div className={clsx("block w-24 2xl:w-32", disabled ? "opacity-30" : "")}>
      <button
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
        <AvatarIcon
          iconName={iconName}
          charName={charName}
          quality={quality}
          element={element}
        />
      </button>
    </div>
  )
}

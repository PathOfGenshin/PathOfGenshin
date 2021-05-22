import { HTMLProps } from "react"

import Image from "next/image"

import clsx from "clsx"

import { avatarIcon, elementalIcon, rarityBackground } from "@/assets/static"
import styles from "@/styles/image.module.scss"

import SVGRoundBorder from "../icons/SVGRoundBorder"
import { AvatarIconButtonProps, AvatarIconProps } from "./icon"

interface FocusedProps {
  isFocused: boolean
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  iconName,
  charName,
  rarity,
  element,
  label,
}: AvatarIconProps) => {
  return (
    <div className="block relative w-24 text-center rounded-md shadow-md 2xl:w-32">
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
          width={130}
          height={160}
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
            width={256}
            height={256}
          />
          <SVGRoundBorder className="absolute -bottom-px text-g-paper" />
        </div>
        <div className="relative h-6 text-sm leading-6 tracking-tight rounded-b-md font-genshin bg-g-paper text-g-paper-0 2xl:h-7.5 2xl:text-lg 2xl:leading-7.5">
          {label ?? charName}
        </div>
      </div>
      <div className="absolute w-6 h-6 top-0.5 left-0.5 2xl:w-8 2xl:h-8">
        <Image
          className={clsx("pointer-events-none select-none", styles.crisp)}
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
  rarity,
  element,
  onClick,
  "data-id": dataId,
  "data-name": dataName,
  "data-weapon-id": dataWeaponId,
  isFocused,
  disabled,
}: AvatarIconButtonProps & FocusedProps & HTMLProps<HTMLButtonElement>) => {
  return (
    <div className={clsx("block w-24 2xl:w-32", disabled ? "opacity-30" : "")}>
      <button
        data-id={dataId}
        data-name={dataName}
        data-weapon-id={dataWeaponId}
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
          rarity={rarity}
          element={element}
        />
      </button>
    </div>
  )
}

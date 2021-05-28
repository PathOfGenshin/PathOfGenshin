import Image from "next/image"

import clsx from "clsx"

import { weaponIcon, qualityBackground } from "@/assets/static"
import { StarQuality } from "@/generated/model/type_aliases"
import image from "@/styles/image.module.scss"

import SVGRoundBorder from "../icons/SVGRoundBorder"

export interface WeaponIconProps {
  iconName: string
  weaponName: string
  quality: StarQuality
  label?: string
}

export const WeaponIcon: React.FC<WeaponIconProps> = ({
  iconName,
  weaponName,
  quality,
  label,
}: WeaponIconProps) => {
  return (
    <div className="block relative w-24 text-center rounded-md shadow-md 2xl:w-32">
      <div className="absolute w-full">
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
        <div className="relative w-24 h-24 2xl:w-32 2xl:h-32">
          <Image
            className={clsx(
              "w-24 rounded-md pointer-events-none select-none 2xl:w-32",
              image.crisp,
            )}
            src={weaponIcon(iconName)}
            alt={weaponName}
            quality={100}
            width={256}
            height={256}
          />
          <SVGRoundBorder className="absolute -bottom-px text-g-paper" />
        </div>
        <div className="relative h-6 text-sm leading-6 tracking-tight rounded-b-md font-genshin bg-g-paper text-g-paper-0 2xl:h-7.5 2xl:text-lg 2xl:leading-7.5">
          {label ?? weaponName}
        </div>
      </div>
    </div>
  )
}

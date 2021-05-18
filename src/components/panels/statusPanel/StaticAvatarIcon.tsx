import Image from "next/image"

import clsx from "clsx"

import { avatarIcon, elementalIcon, rarityBackground } from "@/assets/static"
import { SVGRoundBorder } from "@/components/genshin/characters/AvatarIcon"
import { AvatarIconProps } from "@/components/genshin/characters/icon"
import styles from "@/styles/image.module.scss"

interface StaticAvatarIconProps extends AvatarIconProps {
  level: number
  maxLevel: number
}

export const StaticAvatarIcon: React.FC<StaticAvatarIconProps> = ({
  iconName,
  charName,
  rarity,
  element,
  level,
  maxLevel,
}: StaticAvatarIconProps) => {
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
            width={128}
            height={128}
          />
          <SVGRoundBorder className="absolute -bottom-px text-g-paper" />
        </div>
        <div className="relative h-6 text-sm leading-6 tracking-tight rounded-b-md font-genshin bg-g-paper text-g-paper-0 2xl:h-7.5 2xl:text-lg 2xl:leading-7.5">
          Lv. {level} / {maxLevel}
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

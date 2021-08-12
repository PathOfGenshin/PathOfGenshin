import Image from "next/image"
import clsx from "clsx"

import { qualityBackgroundSquare, weaponIcon } from "@/assets/static"
import { StarQuality } from "@/generated/model/type_aliases"
import image from "@/styles/image.module.scss"

interface WeaponIconSquareProps {
  iconName: string
  weaponName: string
  quality: StarQuality
}

export const WeaponIconSquare: React.FC<WeaponIconSquareProps> = ({
  iconName,
  weaponName,
  quality,
}: WeaponIconSquareProps) => {
  return (
    <div className="block relative w-24 text-center rounded-md shadow-md">
      <div className="absolute w-full h-full pointer-events-none select-none">
        <Image
          className={clsx(
            "rounded-md opacity-80 pointer-events-none select-none",
            image.crisp,
          )}
          src={qualityBackgroundSquare(quality)}
          alt={`${quality} Star`}
          quality={100}
          priority
          width={128}
          height={128}
        />
      </div>
      <div className="flex relative flex-col">
        <div className="relative w-24 h-24 pointer-events-none select-none">
          <Image
            className={clsx(
              "w-24 rounded-md pointer-events-none select-none",
              image.crisp,
            )}
            src={weaponIcon(iconName)}
            alt={weaponName}
            quality={100}
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  )
}

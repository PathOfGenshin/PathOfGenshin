import { avatarIcon, rarityBackground } from "@/assets/static"

import { AvatarIconProps } from "./icon"

const AvatarIcon: React.FC<AvatarIconProps> = ({
  iconName,
  charName,
  rarity,
}: AvatarIconProps) => {
  return (
    <button className="relative block w-24 transition-all duration-75 transform rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-50 focus:scale-105 hover:scale-105">
      <img
        className="absolute w-full rounded-md pointer-events-none select-none opacity-80"
        src={rarityBackground(rarity)}
        alt={`${rarity} Star`}
      />
      <div className="relative flex flex-col">
        <div className="relative w-24 h-24">
          <img
            className="absolute w-24 pointer-events-none select-none"
            src={avatarIcon(iconName)}
            alt={charName}
          />
        </div>
        <div className="h-6 text-sm leading-6 rounded-b-md font-genshin bg-g-paper text-g-paper-0">
          {charName}
        </div>
      </div>
    </button>
  )
}

export default AvatarIcon

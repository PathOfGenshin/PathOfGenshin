import clsx from "clsx"

import { avatarIcon, rarityBackground } from "@/assets/static"

import { AvatarIconProps } from "./icon"

interface FocusedProps {
  isFocused: boolean
}

const AvatarIcon: React.FC<AvatarIconProps & FocusedProps> = ({
  iconName,
  charName,
  rarity,
  onClick,
  "data-id": dataId,
  "data-name": dataName,
  "data-index": dataIndex,
  isFocused,
}: AvatarIconProps & FocusedProps) => {
  return (
    <div className="block w-24">
      <button
        data-id={dataId}
        data-name={dataName}
        data-index={dataIndex}
        className={clsx(
          "relative block w-24 transition duration-75 transform rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-50 focus:scale-105 hover:scale-105",
          isFocused ? "ring ring-blue-400 dark:ring-blue-50 scale-105" : "",
        )}
        onClick={onClick}
      >
        <img
          className="absolute w-full rounded-md pointer-events-none select-none opacity-80"
          src={rarityBackground(rarity)}
          alt={`${rarity} Star`}
        />
        <div className="relative flex flex-col">
          <div className="relative w-24 h-24">
            <img
              className="absolute w-24 rounded-md pointer-events-none select-none"
              src={avatarIcon(iconName)}
              alt={charName}
            />
          </div>
          <div className="h-6 text-sm leading-6 tracking-tight rounded-b-md font-genshin bg-g-paper text-g-paper-0">
            {charName}
          </div>
        </div>
      </button>
    </div>
  )
}

export default AvatarIcon

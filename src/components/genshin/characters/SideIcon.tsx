import clsx from "clsx"

import { avatarIcon } from "@/assets/static"

import { AvatarIconProps } from "./icon"

const SideIcon: React.FC<AvatarIconProps> = ({
  iconName,
  charName,
  isSelected,
}: AvatarIconProps) => {
  return (
    <div>
      <button className="relative flex items-center justify-center w-24 h-24">
        <div
          className={clsx(
            "border-4 rounded-full w-18 h-18",
            isSelected
              ? "border-g-char-selected bg-g-char-selected-fill"
              : "border-g-char",
          )}
        ></div>
        <img
          className="absolute w-24 h-24 select-none -top-4"
          src={avatarIcon(iconName)}
          alt={charName}
        />
      </button>
    </div>
  )
}

export default SideIcon

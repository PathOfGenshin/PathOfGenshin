import clsx from "clsx"

import { avatarIcon } from "@/assets/static"

import { AvatarIconProps } from "./icon"

const SideIcon: React.FC<AvatarIconProps> = ({
  iconName,
  charName,
  isSelected,
  onClick,
  "data-id": dataId,
  "data-name": dataName,
  "data-index": dataIndex,
}: AvatarIconProps) => {
  return (
    <button
      data-id={dataId}
      data-name={dataName}
      data-index={dataIndex}
      className={clsx(
        "relative flex items-center justify-center w-24 h-24 transition-transform duration-100 transform focus:outline-none hover:scale-110",
        isSelected ? "scale-110" : "scale-100",
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "transition-colors duration-100 border-4 rounded-full w-18 h-18",
          isSelected
            ? "border-g-char-selected bg-g-char-selected-fill"
            : "border-g-char",
        )}
      ></div>
      <img
        className="absolute w-24 h-24 pointer-events-none select-none -top-4"
        src={avatarIcon(iconName)}
        alt={charName}
      />
      <div
        className={clsx(
          "absolute bottom-0 transition duration-100 h-1.5",
          isSelected ? "w-full bg-g-char-selected-fill" : "w-0 opacity-0",
        )}
      ></div>
    </button>
  )
}

export default SideIcon

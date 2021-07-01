import clsx from "clsx"

import { WeaponIconSquare } from "@/components/genshin/weapons/WeaponIconSquare"
import { StarQuality } from "@/generated/model/type_aliases"

interface WeaponIconButtonProps {
  iconName: string
  weaponName: string
  quality: StarQuality
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  isFocused: boolean
}

export const WeaponIconButton: React.FC<WeaponIconButtonProps> = ({
  iconName,
  weaponName,
  quality,
  onClick,
  isFocused,
  disabled,
}: WeaponIconButtonProps) => {
  return (
    <div className={clsx("block w-24", disabled ? "opacity-30" : "")}>
      <button
        className={clsx(
          "block relative w-24 rounded-md shadow-md transition duration-75 transform hover:outline-none focus:outline-none",
          isFocused ? "ring ring-blue-400 dark:ring-blue-50 scale-105" : "",
          !disabled
            ? "hover:ring hover:ring-blue-400 dark:hover:ring-blue-50 hover:scale-105 focus:ring focus:ring-blue-400 dark:focus:ring-blue-50 focus:scale-105"
            : "cursor-not-allowed",
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <WeaponIconSquare
          iconName={iconName}
          weaponName={weaponName}
          quality={quality}
        />
      </button>
    </div>
  )
}

import { StarQuality } from "@/generated/model/type_aliases"

import { WeaponIconButton } from "./WeaponIconButton"

interface WeaponSelectionProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  weaponName: string
  iconName: string
  quality: StarQuality
  description: string
  isFocused: boolean
}

export const WeaponSelection: React.FC<WeaponSelectionProps> = ({
  onClick,
  weaponName,
  iconName,
  quality,
  description,
  isFocused,
}: WeaponSelectionProps) => {
  return (
    <div className="flex flex-row my-2 space-x-4">
      <WeaponIconButton
        iconName={iconName}
        weaponName={weaponName}
        quality={quality}
        isFocused={isFocused}
        onClick={onClick}
      />
      <div className="flex flex-col">
        <h3 className="font-genshin">{weaponName}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

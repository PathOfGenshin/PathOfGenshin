import { WeaponIcon } from "@/components/genshin/weapons/WeaponIcon"
import { StarQuality } from "@/generated/model/type_aliases"

interface WeaponInfoProps {
  iconName: string
  awakenIconName: string
  quality: StarQuality
  weaponName: string
  description: string
  level: number
  maxLevel: number
}

const WeaponInfo: React.FC<WeaponInfoProps> = ({
  iconName,
  awakenIconName,
  quality,
  weaponName,
  description,
  level,
  maxLevel,
}: WeaponInfoProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-2">
        <WeaponIcon
          iconName={maxLevel >= 50 ? awakenIconName : iconName}
          weaponName={weaponName}
          quality={quality}
          label={`Lv. ${level} / ${maxLevel}`}
        />
        <div className="flex flex-col text-sm">
          <h2 className="text-lg tracking-tight font-genshin">{weaponName}</h2>
          <p className="my-0.5">{description}</p>
        </div>
      </div>
      <p className="mt-2 text-sm italic">{description}</p>
    </div>
  )
}

export default WeaponInfo

import { useQuery } from "react-query"

import { querySingleWeapon, queryWeaponsByType } from "@/db"
import { StarQuality } from "@/generated/model/type_aliases"
import { Weapon } from "@/generated/model/weapon"
import { useAppDispatch } from "@/store/hooks"
import { setWeapon } from "@/store/party/partySlice"

import { TabContentProps } from "../../TabContent"
import { WeaponIconButton } from "./WeaponIconButton"

interface WeaponSelectionProps {
  weaponId: number
  weaponName: string
  iconName: string
  quality: StarQuality
  description: string
}

const WeaponSelection: React.FC<WeaponSelectionProps> = ({
  weaponId,
  weaponName,
  iconName,
  quality,
  description,
}: WeaponSelectionProps) => {
  const dispatch = useAppDispatch()

  const setWeaponId = (): void => {
    dispatch(setWeapon(weaponId))
  }

  return (
    <div className="flex flex-row my-2 space-x-4">
      <WeaponIconButton
        iconName={iconName}
        weaponName={weaponName}
        quality={quality}
        isFocused={false}
        onClick={setWeaponId}
      />
      <div className="flex flex-col">
        <h3 className="tracking-tight font-genshin">{weaponName}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

const sortByQuality = (a: Weapon, b: Weapon): number => {
  const q = b.quality - a.quality
  return q === 0 ? (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : q
}

export const WeaponsTab: React.FC<TabContentProps> = ({
  character,
  config,
}: TabContentProps) => {
  const { data: weapons } = useQuery(
    ["weaponsByType", character.weaponType],
    queryWeaponsByType(character.weaponType),
  )

  const { data: currentWeapon } = useQuery(
    ["weapon", character.id, config.weaponId],
    querySingleWeapon(config.weaponId),
  )

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl tracking-tight font-genshin">Weapon Settings</h2>
      {currentWeapon && <div>{currentWeapon.name}</div>}
      <h2 className="text-2xl tracking-tight font-genshin">Switch Weapon</h2>
      <div className="flex flex-col">
        {weapons &&
          weapons
            .sort(sortByQuality)
            .map((weapon: Weapon) => (
              <WeaponSelection
                key={weapon.id}
                weaponId={weapon.id}
                weaponName={weapon.name}
                iconName={weapon.icon}
                description={weapon.description}
                quality={weapon.quality}
              />
            ))}
      </div>
    </div>
  )
}

import React, { MouseEventHandler, useEffect, useState } from "react"

import { noop } from "lodash"
import { useQuery } from "react-query"

import { Dialog } from "@/components"
import { QUALITY_TEXT_COLORS } from "@/components/genshin/quality/colorMapping"
import { querySingleWeapon, queryWeaponsByType } from "@/db"
import { StarQuality } from "@/generated/model/type_aliases"
import { Weapon } from "@/generated/model/weapon"
import { useAppDispatch } from "@/store/hooks"
import { setWeapon } from "@/store/party/partySlice"

import { TabContentProps } from "../../TabContent"
import { WeaponSelection } from "./WeaponSelection"

interface SelectedWeapon {
  id: number
  name: string
  quality: StarQuality
  targetElement: HTMLButtonElement
}

const sortByQuality = (a: Weapon, b: Weapon): number => {
  const q = b.quality - a.quality
  return q === 0 ? (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : q
}

export const WeaponsTab: React.FC<TabContentProps> = ({
  character,
  config,
}: TabContentProps) => {
  const dispatch = useAppDispatch()

  const { data: weapons } = useQuery(
    ["weaponsByType", character.weaponType],
    queryWeaponsByType(character.weaponType),
  )

  const { data: currentWeapon } = useQuery(
    ["weapon", character.id, config.weaponId],
    querySingleWeapon(config.weaponId),
  )

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [wantedWeapon, setWantedWeapon] = useState<SelectedWeapon | null>(null)

  const selectWeapon = (
    id: number,
    name: string,
    quality: StarQuality,
  ): MouseEventHandler<HTMLButtonElement> => {
    return (event: React.MouseEvent<HTMLButtonElement>): void => {
      setDialogOpen(true)
      setWantedWeapon({
        id,
        name,
        quality,
        targetElement: event.currentTarget,
      })
    }
  }

  const setWeaponById = (): void => {
    if (wantedWeapon) {
      dispatch(setWeapon(wantedWeapon.id))
    }
  }

  // Clear and unfocus the wanted weapon
  useEffect(() => {
    if (!dialogOpen && wantedWeapon !== null) {
      wantedWeapon.targetElement.blur()
    }
  }, [dialogOpen, wantedWeapon])

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-genshin">Weapon Settings</h2>
      {currentWeapon && <div>{currentWeapon.name}</div>}
      <h2 className="text-2xl font-genshin">Switch Weapon</h2>
      <div className="flex flex-col">
        {weapons &&
          weapons
            .sort(sortByQuality)
            .map((weapon: Weapon) => (
              <WeaponSelection
                key={weapon.id}
                onClick={selectWeapon(weapon.id, weapon.name, weapon.quality)}
                weaponName={weapon.name}
                iconName={weapon.icon}
                description={weapon.description}
                quality={weapon.quality}
                isFocused={dialogOpen && wantedWeapon?.id === weapon.id}
              />
            ))}
      </div>
      <Dialog
        description={
          <div>
            <p>
              Would you like to equip{" "}
              <span className={QUALITY_TEXT_COLORS[wantedWeapon?.quality ?? 0]}>
                {wantedWeapon?.name}
              </span>{" "}
              on <span>{character.name}</span>?
            </p>
            <p>Note that this will reset the level of the weapon to Lv. 1/20!</p>
          </div>
        }
        confirmText="Confirm"
        cancelText="Cancel"
        confirmAction={setWeaponById}
        cancelAction={noop}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  )
}

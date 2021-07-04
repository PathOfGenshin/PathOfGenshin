import React, { MouseEventHandler, useEffect, useState } from "react"

import { noop } from "lodash"
import { useQuery } from "react-query"

import { Dialog } from "@/components"
import { QUALITY_TEXT_COLORS } from "@/components/genshin/quality/colorMapping"
import { WeaponIcon } from "@/components/genshin/weapons/WeaponIcon"
import { querySingleWeapon, queryWeaponsByType } from "@/db"
import { Ascension } from "@/generated/model/ascension"
import { StarQuality } from "@/generated/model/type_aliases"
import { Weapon } from "@/generated/model/weapon"
import { useAppDispatch } from "@/store/hooks"
import {
  setWeapon,
  setWeaponLevel,
  setWeaponMaxLevel,
  setWeaponRefinement,
} from "@/store/party/partySlice"

import { TabContentProps } from "../../TabContent"
import { LevelDropdown } from "./LevelDropdown"
import { MaxLevelDropdown } from "./MaxLevelDropdown"
import { RefinementRankDropdown } from "./RefinementRankDropdown"
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

  const onSelectedLevel = (level: number): void => {
    dispatch(setWeaponLevel(level))
  }

  const onSelectedRank = (rank: number): void => {
    dispatch(setWeaponRefinement(rank))
  }

  const onSelectedMaxLevel = (ascension: Ascension): void => {
    const prevIndex: number = ascension.ascensionLevel - 1
    dispatch(
      setWeaponMaxLevel({
        ascensionLevel: ascension.ascensionLevel,
        maxLevel: ascension.maxLevel,
        lowerMaxLevel:
          prevIndex >= 0 ? currentWeapon?.ascensions[prevIndex].maxLevel ?? 1 : 1,
      }),
    )
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
      {currentWeapon && (
        <div className="flex space-x-4">
          <WeaponIcon
            iconName={
              config.weaponAscensionLevel >= 2
                ? currentWeapon.iconAwakened
                : currentWeapon.icon
            }
            weaponName={currentWeapon.name}
            quality={currentWeapon.quality}
            label={`Lv. ${config.weaponLevel} / ${config.weaponMaxLevel}`}
          />
          <div className="space-y-2">
            <h3 className="text-xl font-genshin">{currentWeapon.name}</h3>
            <RefinementRankDropdown config={config} onSelectedRank={onSelectedRank} />
            <div className="flex flex-row">
              <LevelDropdown config={config} onSelectedLevel={onSelectedLevel} />
              <MaxLevelDropdown
                config={config}
                weapon={currentWeapon}
                onSelectedAscension={onSelectedMaxLevel}
              />
            </div>
          </div>
        </div>
      )}
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
          <div className="text-center">
            <p>
              Would you like to equip{" "}
              <span className={QUALITY_TEXT_COLORS[wantedWeapon?.quality ?? 0]}>
                {wantedWeapon?.name}
              </span>{" "}
              on <span>{character.name}</span>?
            </p>
            <br />
            <p>
              Note that this will reset the weapon level to Lv. 1/20 and Refinement rank
              to 1.
            </p>
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

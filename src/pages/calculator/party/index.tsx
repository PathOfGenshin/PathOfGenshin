import { useCallback, useEffect, useState } from "react"

import clsx from "clsx"
import { useLiveQuery } from "dexie-react-hooks"
import { noop } from "lodash"

import { GenshinElement, Rarity } from "@/assets/static"
import { AvatarIconButton } from "@/components/genshin/characters/AvatarIcon"
import ConfirmationDialog from "@/components/genshin/dialog/ConfirmationDialog"
import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { queryAllCharacters, queryDefaultWeapons } from "@/db"
import { Character } from "@/generated/model/characters"
import { Weapon, WeaponType } from "@/generated/model/weapon"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  addCharacter,
  CharacterData,
  MAX_PARTY_SIZE,
  selectCharacters,
} from "@/store/party/partySlice"
import { selectTravelerGender, TravelerGender } from "@/store/settings/settingsSlice"

interface SelectedCharacter {
  id: number
  name: string
  defaultWeaponId: number
  targetElement: HTMLButtonElement
}

export const PartyAdd: React.FC & ComponentWithLayout = () => {
  const travelerGender: TravelerGender = useAppSelector(selectTravelerGender)
  const allCharacters: Character[] | undefined = useLiveQuery(queryAllCharacters)
  const defaultWeapons: Record<WeaponType, Weapon> | undefined =
    useLiveQuery(queryDefaultWeapons)
  const dispatch = useAppDispatch()

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [wantedCharacter, setWantedCharacter] = useState<SelectedCharacter | null>(null)

  const party: CharacterData[] = useAppSelector(selectCharacters)

  const selectCharacter = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const dataset = event.currentTarget.dataset
    const charId = dataset["id"]
    const charName = dataset["name"]
    const defaultWeaponId = dataset["weaponId"]
    if (charId && charName && defaultWeaponId) {
      setDialogOpen(true)
      setWantedCharacter({
        id: parseInt(charId),
        name: charName,
        defaultWeaponId: parseInt(defaultWeaponId),
        targetElement: event.currentTarget,
      })
    }
  }

  const addCharacterById = useCallback(() => {
    if (wantedCharacter) {
      dispatch(
        addCharacter({
          id: wantedCharacter.id,
          name: wantedCharacter.name,
          defaultWeaponId: wantedCharacter.defaultWeaponId,
        }),
      )
    }
  }, [dispatch, wantedCharacter])

  // Clear and unfocus the wanted character
  useEffect(() => {
    if (!dialogOpen && wantedCharacter !== null) {
      wantedCharacter.targetElement.blur()
    }
  }, [dialogOpen, wantedCharacter])

  return (
    <div className="w-full space-y-2">
      <div className="font-semibold text-center">
        {party.length < MAX_PARTY_SIZE ? (
          <>Select a character to add to your party.</>
        ) : (
          <>
            Your party is now full! Please remove a character from your party before
            adding another to your party.
          </>
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        <div
          className={clsx(
            "grid gap-4 justify-center transition-opacity duration-1000 grid-cols-auto-icon-6 2xl:grid-cols-auto-icon-8",
            party.length >= MAX_PARTY_SIZE ? "opacity-50 pointer-events-none" : "",
          )}
        >
          {allCharacters &&
            defaultWeapons &&
            travelerGender &&
            allCharacters
              .filter((char: Character) =>
                travelerGender === "male" ? char.id !== 10000007 : char.id !== 10000005,
              )
              .map((char: Character) => (
                <AvatarIconButton
                  key={char.id}
                  data-id={char.id}
                  data-name={char.name}
                  data-weapon-id={defaultWeapons[char.weaponType].id}
                  charName={char.name}
                  iconName={char.icon}
                  rarity={char.quality as Rarity}
                  element={char.element as GenshinElement}
                  onClick={selectCharacter}
                  isFocused={dialogOpen && (wantedCharacter?.id === char.id ?? false)}
                  disabled={party.some((partyChar) => partyChar.id === char.id)}
                />
              ))}
        </div>
        <ConfirmationDialog
          description={`Would you like to add ${wantedCharacter?.name} to your team?`}
          confirmText="Confirm"
          cancelText="Cancel"
          confirmAction={addCharacterById}
          cancelAction={noop}
          isOpen={dialogOpen}
          setIsOpen={setDialogOpen}
        />
      </div>
    </div>
  )
}

PartyAdd.Layout = CalculatorLayout

export default PartyAdd

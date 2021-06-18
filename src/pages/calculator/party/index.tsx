import React, { MouseEventHandler, useEffect, useState } from "react"

import clsx from "clsx"
import { noop, partition } from "lodash"
import { useQuery } from "react-query"

import { AvatarIconButton } from "@/components/genshin/characters/AvatarIcon"
import {
  TRAVELER_ID_FEMALE,
  TRAVELER_ID_MALE,
} from "@/components/genshin/characters/constants"
import ConfirmationDialog from "@/components/genshin/dialog/ConfirmationDialog"
import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { queryAllCharacters, queryDefaultWeapons } from "@/db"
import { Character, VisionType } from "@/generated/model/characters"
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
  defaultSkillDepotId: number | null
  vision: VisionType
}

export const PartyAdd: React.FC & ComponentWithLayout = () => {
  const { data: allCharacters } = useQuery("allCharacters", queryAllCharacters)
  const { data: defaultWeapons } = useQuery("defaultWeapons", queryDefaultWeapons)
  const dispatch = useAppDispatch()

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [wantedCharacter, setWantedCharacter] = useState<SelectedCharacter | null>(null)

  const party: CharacterData[] = useAppSelector(selectCharacters)

  const travelerGender: TravelerGender | null = useAppSelector(selectTravelerGender)

  const selectCharacter = (
    id: number,
    name: string,
    defaultWeaponId: number,
    defaultSkillDepotId: number | null,
    vision: VisionType,
  ): MouseEventHandler<HTMLButtonElement> => {
    return (event: React.MouseEvent<HTMLButtonElement>): void => {
      setDialogOpen(true)
      setWantedCharacter({
        id,
        name,
        defaultWeaponId,
        defaultSkillDepotId,
        vision,
        targetElement: event.currentTarget,
      })
    }
  }

  // Sorts characters by placing traveler as the first selection
  const sortedCharacters = (characters: Character[]): Character[] =>
    partition(
      characters,
      (char: Character) =>
        char.id === TRAVELER_ID_MALE || char.id === TRAVELER_ID_FEMALE,
    )
      .flat()
      .filter((char: Character) =>
        travelerGender === "male"
          ? char.id !== TRAVELER_ID_FEMALE
          : char.id !== TRAVELER_ID_MALE,
      )

  const addCharacterById = (): void => {
    if (wantedCharacter) {
      dispatch(
        addCharacter({
          id: wantedCharacter.id,
          name: wantedCharacter.name,
          defaultWeaponId: wantedCharacter.defaultWeaponId,
          defaultSkillDepotId: wantedCharacter.defaultSkillDepotId,
          vision: wantedCharacter.vision,
        }),
      )
    }
  }

  // Clear and unfocus the wanted character
  useEffect(() => {
    if (!dialogOpen && wantedCharacter !== null) {
      wantedCharacter.targetElement.blur()
    }
  }, [dialogOpen, wantedCharacter])

  return (
    <div className="space-y-2 w-full">
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

      <div className="mx-auto max-w-5xl">
        <div
          className={clsx(
            "grid gap-4 justify-center p-4 transition-opacity duration-1000 grid-cols-auto-icon-6 2xl:grid-cols-auto-icon-8",
            party.length >= MAX_PARTY_SIZE ? "opacity-50 pointer-events-none" : "",
          )}
        >
          {allCharacters &&
            defaultWeapons &&
            travelerGender &&
            sortedCharacters(allCharacters).map((char: Character) => (
              <AvatarIconButton
                key={char.id}
                charName={char.name}
                iconName={char.icon}
                quality={char.quality}
                element={char.metadata.vision}
                onClick={selectCharacter(
                  char.id,
                  char.name,
                  defaultWeapons[char.weaponType].id,
                  char.skillDepotIds.length === 1 ? char.skillDepotIds[0] : null,
                  char.metadata.vision,
                )}
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

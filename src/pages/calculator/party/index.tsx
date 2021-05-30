import { useCallback, useEffect, useState } from "react"

import clsx from "clsx"
import { noop } from "lodash"
import { useQuery } from "react-query"

import { AvatarIconButton } from "@/components/genshin/characters/AvatarIcon"
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

  const selectCharacter = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const dataset = event.currentTarget.dataset
    const charId = dataset["id"]
    const charName = dataset["name"]
    const defaultWeaponId = dataset["weaponId"]
    const skillDepotId = dataset["skillDepotId"]
    const vision = (dataset["vision"] as VisionType | undefined) ?? VisionType.None
    if (charId && charName && defaultWeaponId) {
      setDialogOpen(true)
      setWantedCharacter({
        id: parseInt(charId),
        name: charName,
        defaultWeaponId: parseInt(defaultWeaponId),
        defaultSkillDepotId: skillDepotId ? parseInt(skillDepotId) : null,
        vision,
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
          defaultSkillDepotId: wantedCharacter.defaultSkillDepotId,
          vision: wantedCharacter.vision,
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
            allCharacters.map((char: Character) => (
              <AvatarIconButton
                key={char.id}
                data-id={char.id}
                data-name={char.name}
                data-weapon-id={defaultWeapons[char.weaponType].id}
                data-skill-depot-id={
                  char.skillDepotIds.length === 1 ? char.skillDepotIds[0] : null
                }
                data-vision={char.metadata.vision}
                charName={char.name}
                iconName={char.icon}
                quality={char.quality}
                element={char.metadata.vision}
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

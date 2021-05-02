import React, { useCallback, useEffect, useState } from "react"

import clsx from "clsx"
import { useLiveQuery } from "dexie-react-hooks"
import { noop } from "lodash"

import { Rarity } from "@/assets/static"
import AvatarIcon from "@/components/genshin/characters/AvatarIcon"
import ConfirmationDialog from "@/components/genshin/dialog/ConfirmationDialog"
import { queryAllCharacters } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  addCharacter,
  MAX_PARTY_SIZE,
  selectCharacterIds,
} from "@/store/party/partySlice"

interface SelectedCharacter {
  id: number
  name: string
  targetElement: HTMLButtonElement
}

export const PartyAddCharacterTab: React.FC = () => {
  const allCharacters = useLiveQuery(queryAllCharacters)
  const dispatch = useAppDispatch()

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [wantedCharacter, setWantedCharacter] = useState<SelectedCharacter | null>(null)

  const partyIds: number[] = useAppSelector(selectCharacterIds)

  const selectCharacter = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const charId: number = parseInt(event.currentTarget.dataset["id"])
    const charName: string = event.currentTarget.dataset["name"]
    setDialogOpen(true)
    setWantedCharacter({
      id: charId,
      name: charName,
      targetElement: event.currentTarget,
    })
  }

  const addCharacterById = useCallback(() => {
    dispatch(addCharacter(wantedCharacter.id))
  }, [dispatch, wantedCharacter])

  // Clear and unfocus the wanted character
  useEffect(() => {
    if (!dialogOpen && wantedCharacter !== null) {
      wantedCharacter.targetElement.blur()
      setWantedCharacter(null)
    }
  }, [dialogOpen, wantedCharacter])

  return (
    <div className="w-full space-y-2">
      <div className="font-semibold text-center">
        {partyIds.length < MAX_PARTY_SIZE ? (
          <>Select a character to add to your party.</>
        ) : (
          <>
            Your party is now full! Please remove a character from your party before
            adding another to your party.
          </>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        <div
          className={clsx(
            "transition-opacity duration-1000",
            partyIds.length >= MAX_PARTY_SIZE ? "opacity-50 pointer-events-none" : "",
          )}
        >
          {allCharacters &&
            allCharacters.map((char: Character) => (
              <div key={char.id} className="inline-block m-2">
                <AvatarIcon
                  data-id={char.id}
                  data-name={char.name}
                  charName={char.name}
                  iconName={char.icon}
                  rarity={char.quality as Rarity}
                  onClick={selectCharacter}
                  isFocused={wantedCharacter?.id === char.id ?? false}
                />
              </div>
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

import React, { useCallback } from "react"

import { useLiveQuery } from "dexie-react-hooks"

import { Rarity } from "@/assets/static"
import AvatarIcon from "@/components/genshin/characters/AvatarIcon"
import { queryAllCharacters } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppDispatch } from "@/store/hooks"
import { addCharacter } from "@/store/party/partySlice"

export const PartyAddCharacterTab: React.FC = () => {
  const allCharacters = useLiveQuery(queryAllCharacters)
  const dispatch = useAppDispatch()

  const addCharacterById = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      dispatch(addCharacter(parseInt(event.currentTarget.dataset["id"])))
    },
    [dispatch],
  )

  if (!allCharacters) return null

  return (
    <div className="max-w-4xl mx-auto space-y-2">
      <div className="font-semibold">Select a character to add to your party.</div>
      <div>
        {allCharacters.map((char: Character) => (
          <div key={char.id} className="inline-block m-2">
            <AvatarIcon
              data-id={char.id}
              charName={char.name}
              iconName={char.icon}
              rarity={char.quality as Rarity}
              onClick={addCharacterById}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

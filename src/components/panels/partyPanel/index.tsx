import { useCallback } from "react"

import { useLiveQuery } from "dexie-react-hooks"

import { Rarity } from "@/assets/static"
import AvatarSideIcon from "@/components/genshin/characters/AvatarSideIcon"
import SideIconAdd from "@/components/genshin/characters/AddCharacterIcon"
import { queryCharactersByIds } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  MAX_PARTY_SIZE,
  selectCharacterIds,
  selectCurrentCharacter,
  setCurrentCharacter,
} from "@/store/party/partySlice"

export const PartyPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const partyIds: number[] = useAppSelector(selectCharacterIds)
  const currentCharacterId: number = useAppSelector(selectCurrentCharacter)
  const partyCharacters: Character[] = useLiveQuery(queryCharactersByIds(partyIds), [
    partyIds,
  ])

  const setCharacter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log(event.currentTarget.dataset)
      dispatch(setCurrentCharacter(parseInt(event.currentTarget.dataset["index"])))
    },
    [dispatch],
  )

  return (
    <div className="flex flex-row max-w-xs py-2 m-auto overflow-x-auto md:overflow-x-visible md:max-w-full md:items-center md:justify-center">
      {partyCharacters &&
        partyCharacters.map((char: Character, index: number) => (
          <AvatarSideIcon
            data-index={index}
            key={char.id}
            iconName={char.sideIcon}
            charName={char.name}
            rarity={char.quality as Rarity}
            isSelected={currentCharacterId === char.id}
            onClick={setCharacter}
          />
        ))}
      {partyIds.length < MAX_PARTY_SIZE && <SideIconAdd />}
    </div>
  )
}

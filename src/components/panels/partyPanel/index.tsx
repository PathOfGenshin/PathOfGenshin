import { useCallback } from "react"

import Link from "next/link"

import { useLiveQuery } from "dexie-react-hooks"

import { Rarity } from "@/assets/static"
import AddCharacterIcon from "@/components/genshin/characters/AddCharacterIcon"
import AvatarSideIcon from "@/components/genshin/characters/AvatarSideIcon"
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
  const currentCharacterId: number | null = useAppSelector(selectCurrentCharacter)
  const partyCharacters: Character[] = useLiveQuery(queryCharactersByIds(partyIds), [
    partyIds,
  ])

  const setCharacter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(setCurrentCharacter(parseInt(event.currentTarget.dataset["index"])))
    },
    [dispatch],
  )

  return (
    <div className="flex overflow-x-auto flex-row py-2 m-auto max-w-xs md:overflow-x-visible md:max-w-full md:items-center md:justify-center">
      {partyCharacters &&
        partyCharacters.map((char: Character, index: number) => (
          <Link key={char.id} href={`/calculator/current#${index}`} passHref>
            <AvatarSideIcon
              data-index={index}
              iconName={char.sideIcon}
              charName={char.name}
              rarity={char.quality as Rarity}
              isSelected={currentCharacterId === char.id}
              onClick={setCharacter}
            />
          </Link>
        ))}
      <Link href="/calculator/party" passHref>
        <AddCharacterIcon disabled={partyIds.length >= MAX_PARTY_SIZE} />
      </Link>
    </div>
  )
}

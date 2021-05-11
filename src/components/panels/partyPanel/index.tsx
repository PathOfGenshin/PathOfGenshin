import Link from "next/link"

import { useLiveQuery } from "dexie-react-hooks"

import { Rarity } from "@/assets/static"
import AddCharacterIcon from "@/components/genshin/characters/AddCharacterIcon"
import AvatarSideIcon from "@/components/genshin/characters/AvatarSideIcon"
import { queryCharactersByIds } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import {
  MAX_PARTY_SIZE,
  selectCharacterIds,
  selectCurrentCharacter,
} from "@/store/party/partySlice"

export const PartyPanel: React.FC = () => {
  const partyIds: number[] = useAppSelector(selectCharacterIds)
  const currentCharacterId: number | null = useAppSelector(selectCurrentCharacter)
  const partyCharacters: Character[] = useLiveQuery(queryCharactersByIds(partyIds), [
    partyIds,
  ])

  return (
    <div className="flex overflow-x-auto flex-row py-2 m-auto max-w-xs md:overflow-x-visible md:max-w-full md:items-center md:justify-center">
      {partyCharacters &&
        partyCharacters.map((char: Character) => (
          <Link key={char.id} href={`/calculator/current/${char.id}`} passHref>
            <AvatarSideIcon
              iconName={char.sideIcon}
              charName={char.name}
              rarity={char.quality as Rarity}
              isSelected={currentCharacterId === char.id}
            />
          </Link>
        ))}
      <Link href="/calculator/party" passHref>
        <AddCharacterIcon disabled={partyIds.length >= MAX_PARTY_SIZE} />
      </Link>
    </div>
  )
}

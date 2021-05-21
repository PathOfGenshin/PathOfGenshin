import Link from "next/link"

import { useLiveQuery } from "dexie-react-hooks"

import { GenshinElement, Rarity } from "@/assets/static"
import AddCharacterIcon from "@/components/genshin/characters/AddCharacterIcon"
import AvatarSideIcon from "@/components/genshin/characters/AvatarSideIcon"
import { queryCharactersByIds } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import {
  MAX_PARTY_SIZE,
  selectCharacters,
  selectCurrentCharacter,
  CharacterData,
} from "@/store/party/partySlice"

export const PartyPanel: React.FC = () => {
  const party: CharacterData[] = useAppSelector(selectCharacters)
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const partyCharacters: Character[] = useLiveQuery(
    queryCharactersByIds(party.map((char) => char.id)),
    [party],
  )

  return (
    <div className="flex flex-row justify-center items-center py-2 max-w-full">
      {partyCharacters &&
        partyCharacters.map((char: Character) => (
          <Link key={char.id} href={`/calculator/current#${char.name}`} passHref>
            <AvatarSideIcon
              iconName={char.sideIcon}
              charName={char.name}
              rarity={char.quality as Rarity}
              element={char.element as GenshinElement}
              isSelected={currentCharacter.id === char.id}
            />
          </Link>
        ))}
      <Link href="/calculator/party" passHref>
        <AddCharacterIcon disabled={party.length >= MAX_PARTY_SIZE} />
      </Link>
    </div>
  )
}

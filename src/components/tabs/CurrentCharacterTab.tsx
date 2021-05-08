import { useLiveQuery } from "dexie-react-hooks"

import { queryCharacterById } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentCharacter } from "@/store/party/partySlice"

export const CurrentCharacterTab: React.FC = () => {
  const currentCharacterId: number | null = useAppSelector(selectCurrentCharacter)
  const character: Character | null = useLiveQuery(
    queryCharacterById(currentCharacterId),
    [currentCharacterId],
  )

  return (
    <div className="flex justify-center w-full max-w-5xl">
      <div>{character && character.name}</div>
    </div>
  )
}

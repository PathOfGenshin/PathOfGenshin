import { useLiveQuery } from "dexie-react-hooks"

import { queryAllCharacters } from "@/db"
import { Character } from "@/generated/model/characters"

export const PartyAddCharacterTab: React.FC = () => {
  const allCharacters = useLiveQuery(queryAllCharacters)

  if (!allCharacters) return null

  return (
    <div className="flex flex-row flex-wrap justify-evenly">
      {allCharacters.map((char: Character) => (
        <div key={char.baseInfo.id} className="block">
          <img
            className="w-24 h-24"
            src={`/static/avatar_icon/${char.baseInfo.icon}.png`}
            alt={char.baseInfo.name}
          />
        </div>
      ))}
    </div>
  )
}

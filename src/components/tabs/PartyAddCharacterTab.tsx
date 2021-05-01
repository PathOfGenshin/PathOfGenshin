import { useLiveQuery } from "dexie-react-hooks"

import { Rarity } from "@/assets/static"
import AvatarIcon from "@/components/genshin/characters/AvatarIcon"
import { queryAllCharacters } from "@/db"
import { Character } from "@/generated/model/characters"

export const PartyAddCharacterTab: React.FC = () => {
  const allCharacters = useLiveQuery(queryAllCharacters)

  if (!allCharacters) return null

  return (
    <div className="mx-auto 2xl:max-w-4xl">
      {allCharacters.map((char: Character) => (
        <div key={char.id} className="inline-block m-2">
          <AvatarIcon
            charName={char.name}
            iconName={char.icon}
            rarity={char.quality as Rarity}
          />
        </div>
      ))}
    </div>
  )
}

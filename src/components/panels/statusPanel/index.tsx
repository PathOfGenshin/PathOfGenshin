import { useCallback } from "react"

import { useRouter } from "next/router"

import clsx from "clsx"
import { useLiveQuery } from "dexie-react-hooks"

import { GenshinElement, Rarity } from "@/assets/static"
import { querySingleCharacter } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import { CharacterData, selectCurrentCharacter } from "@/store/party/partySlice"

import CharacterInfo from "./CharacterInfo"

export const StatusPanel: React.FC = () => {
  const { asPath } = useRouter()
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const character: Character | null = useLiveQuery(
    querySingleCharacter(currentCharacter),
    [currentCharacter],
  )

  const getBirthday: () => string | null = useCallback(() => {
    if (
      character &&
      character.metadata.birthMonth > 0 &&
      character.metadata.birthDay > 0
    ) {
      return `${character.metadata.birthDay}/${character.metadata.birthMonth}`
    }
    return "N/A"
  }, [character])

  const getTitle: () => string = useCallback(() => {
    if (character && character.metadata.title) {
      return character.metadata.title
    }
    return "\u00A0"
  }, [character])

  return (
    <div
      className={clsx(
        "flex flex-col flex-shrink-0 p-4 w-96 max-w-full opacity-100 transition-opacity duration-200",
        asPath.startsWith("/calculator/current") ? "" : "opacity-30",
      )}
    >
      <div>
        <h1 className="my-2 text-xl tracking-tight leading-6 font-genshin">
          Character
        </h1>
        {character && (
          <CharacterInfo
            iconName={character.icon}
            charName={character.name}
            rarity={character.quality as Rarity}
            element={character.element as GenshinElement}
            title={getTitle()}
            description={character.metadata.description}
            birthday={getBirthday()}
            affiliation={character.metadata.affiliation}
            vision={character.metadata.vision}
            constellationName={character.metadata.constellation}
          />
        )}
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Constellations
        </h1>
        <div>TODO</div>
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Talents
        </h1>
        <div>TODO</div>
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Weapons
        </h1>
        <div>Currently none equipped.</div>
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Artifacts
        </h1>
        <div>Currently none equipped.</div>
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Status
        </h1>
      </div>
    </div>
  )
}

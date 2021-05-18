import { useCallback } from "react"

import { useRouter } from "next/router"

import clsx from "clsx"
import { useLiveQuery } from "dexie-react-hooks"

import { GenshinElement, Rarity } from "@/assets/static"
import { queryCharacterById } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentCharacterId } from "@/store/party/partySlice"

import { StaticAvatarIcon } from "./StaticAvatarIcon"

export const StatusPanel: React.FC = () => {
  const { asPath } = useRouter()
  const currentCharacterId: number | null = useAppSelector(selectCurrentCharacterId)
  const character: Character | null = useLiveQuery(
    queryCharacterById(currentCharacterId),
    [currentCharacterId],
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
          <div className="flex flex-col w-full">
            <div className="flex flex-row space-x-2">
              <StaticAvatarIcon
                iconName={character.icon}
                charName={character.name}
                rarity={character.quality as Rarity}
                element={character.element as GenshinElement}
                level={80} // TODO: level for current character
                maxLevel={90} // TODO: max level for current character
              />
              <div className="flex flex-col text-sm">
                <h2 className="text-lg tracking-tight leading-6 font-genshin">
                  {character.name}
                </h2>
                <p className="text-xs tracking-tight leading-6 font-genshin">
                  {getTitle()}
                </p>
                <p className="my-0.5">Birthday: {getBirthday()}</p>
                <p className="my-0.5">Affiliation: {character.metadata.affiliation}</p>
                <p className="my-0.5">Vision: {character.metadata.vision}</p>
                <p className="my-0.5">
                  Constellation: {character.metadata.constellation}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm italic">{character.metadata.description}</p>
          </div>
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

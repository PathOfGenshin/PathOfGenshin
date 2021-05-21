import { useCallback } from "react"

import { useRouter } from "next/router"

import clsx from "clsx"
import { useLiveQuery } from "dexie-react-hooks"

import { GenshinElement, Rarity } from "@/assets/static"
import { querySingleCharacter, querySingleWeapon } from "@/db"
import { Character } from "@/generated/model/characters"
import { Weapon } from "@/generated/model/weapon"
import { useAppSelector } from "@/store/hooks"
import { CharacterConfig } from "@/store/party/characterConfig"
import {
  CharacterData,
  selectCharacterConfig,
  selectCurrentCharacter,
} from "@/store/party/partySlice"

import CharacterInfo from "./CharacterInfo"

export const StatusPanel: React.FC = () => {
  const { asPath } = useRouter()
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const config: CharacterConfig | null = useAppSelector(selectCharacterConfig)
  const character: Character | null | undefined = useLiveQuery(
    querySingleCharacter(currentCharacter),
    [currentCharacter],
  )
  const weapon: Weapon | null | undefined = useLiveQuery(
    querySingleWeapon(config?.weaponId ?? null),
    [config],
  )

  const getBirthday: () => string = useCallback(() => {
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
        {character && config && (
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
            level={config.level}
            maxLevel={config.maxLevel}
          />
        )}
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Constellations
        </h1>
        {config && <div>{config.constellationLevel}</div>}
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Talents
        </h1>
        {config && (
          <>
            <div>{config.levelTalentAttack}</div>
            <div>{config.levelTalentSkill}</div>
            <div>{config.levelTalentBurst}</div>
          </>
        )}
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Weapons
        </h1>
        {weapon && <div>{weapon.name}</div>}
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Artifacts
        </h1>
        <div>Currently none equipped.</div>
      </div>
      <div>
        <h1 className="mt-4 mb-2 text-xl tracking-tight leading-6 font-genshin">
          Stats
        </h1>
      </div>
    </div>
  )
}

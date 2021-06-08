import { useCallback, useEffect, useState } from "react"

import { useRouter } from "next/router"

import { identity, range } from "lodash"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

import DropdownSelector from "@/components/genshin/dropdown"
import { querySingleCharacter } from "@/db"
import { Ascension } from "@/generated/model/ascension"
import { Character } from "@/generated/model/characters"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { CharacterConfig } from "@/store/party/characterConfig"
import {
  CharacterData,
  removeCharacterById,
  selectCharacterConfig,
  selectCurrentCharacter,
  setAscension,
  setLevel,
} from "@/store/party/partySlice"
import { ArchiveIcon } from "@heroicons/react/solid"

interface CurrentCharacterTabProps {
  isValidCharacter: boolean
}

interface CharacterSettingsProps {
  character: Character
  config: CharacterConfig
}

const CharacterSettings: React.FC<CharacterSettingsProps> = ({
  character,
  config,
}: CharacterSettingsProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onSelectedAscension = useCallback(
    (ascension: Ascension): void => {
      const prevIndex: number = ascension.ascensionLevel - 1
      dispatch(
        setAscension({
          maxLevel: ascension.maxLevel,
          lowerMaxLevel: prevIndex >= 0 ? character.ascensions[prevIndex].maxLevel : 1,
        }),
      )
    },
    [character.ascensions, dispatch],
  )

  const onSelectedLevel = useCallback(
    (level: number): void => {
      dispatch(setLevel(level))
    },
    [dispatch],
  )

  const ascensionLevelValue = useCallback((a: Ascension): number => a.maxLevel, [])

  const removeFromParty = useCallback(() => {
    dispatch(removeCharacterById(character.id))
    router.back()
  }, [dispatch, character.id, router])

  return (
    <div className="relative w-full">
      <button
        className="py-2 px-4 mb-4 h-10 text-sm rounded-full ring-inset transition duration-100 xl:top-0 xl:right-0 xl:absolute font-genshin text-g-paper bg-g-dark-600 hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring focus:bg-g-button-focus focus:text-g-button-focus"
        onClick={removeFromParty}
      >
        <span>
          <ArchiveIcon className="inline-block pr-1 w-5 h-5" /> Remove from party
        </span>
      </button>
      <h2 className="py-2 text-2xl tracking-tight font-genshin">
        Character Settings
      </h2>
      <div className="flex flex-row items-center py-2">
        <span className="pr-4">Level</span>
        <DropdownSelector<number>
          selected={config.level}
          options={range(config.lowerMaxLevel, config.maxLevel + 1)}
          onSelected={onSelectedLevel}
          buttonValue={identity}
          optionValue={identity}
        />
        <span className="pr-4 pl-8">Max Level</span>
        <DropdownSelector<Ascension>
          selected={
            character.ascensions.find((a) => a.maxLevel === config.maxLevel) ??
            character.ascensions[0]
          }
          options={character.ascensions}
          onSelected={onSelectedAscension}
          buttonValue={ascensionLevelValue}
          optionValue={ascensionLevelValue}
        />
      </div>
      <div>Constellations</div>
    </div>
  )
}

export const CurrentCharacterTab: React.FC<CurrentCharacterTabProps> = ({
  isValidCharacter,
}: CurrentCharacterTabProps) => {
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const config = useSelector(selectCharacterConfig)
  const { data: character } = useQuery(
    ["character", currentCharacter],
    querySingleCharacter(currentCharacter),
  )
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (character && config) {
      setIsLoaded(true)
    }
  }, [character, config])

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      {!isValidCharacter && isLoaded && (
        <div>
          The specified character is either invalid or does not exist in your party.
        </div>
      )}
      {isValidCharacter && isLoaded && character && config && (
        <CharacterSettings character={character} config={config} />
      )}
    </div>
  )
}

import { useCallback, useEffect, useState } from "react"

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
  selectCharacterConfig,
  selectCurrentCharacter,
  setAscension,
  setLevel,
} from "@/store/party/partySlice"

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

  return (
    <div>
      <h2 className="mb-2 text-2xl tracking-tight leading-6 font-genshin">
        Character Settings
      </h2>
      <div className="flex flex-row items-center">
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
    <div className="flex mx-auto w-full max-w-5xl">
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

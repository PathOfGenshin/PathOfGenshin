import { useCallback, useEffect, useState } from "react"

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

  const [selectedAscension, setSelectedAscension] = useState<Ascension>(
    character.ascensions.find((a) => a.maxLevel === config.maxLevel) ??
      character.ascensions[0],
  )
  const onSelectedAscension = useCallback(
    (ascension: Ascension): void => {
      setSelectedAscension(ascension)
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
  const ascensionLevelValue = useCallback((a: Ascension): number => a.maxLevel, [])

  return (
    <div>
      <h2 className="mb-2 text-2xl tracking-tight leading-6 font-genshin">
        Character Settings
      </h2>
      <h3 className="text-lg italic font-semibold">Level and Ascensions</h3>
      <div className="flex flex-row items-center">
        <span className="w-24">Max Level</span>
        <DropdownSelector<Ascension>
          selected={selectedAscension}
          options={character.ascensions}
          onSelected={onSelectedAscension}
          buttonValue={ascensionLevelValue}
          optionValue={ascensionLevelValue}
        />
      </div>
      <p>Level</p>
      <p className="tracking-tight leading-6 font-genshin">
        Level: {config.level} / {config.maxLevel}
      </p>
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

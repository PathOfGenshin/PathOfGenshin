import { useEffect, useState } from "react"

import { useQuery } from "react-query"
import { useSelector } from "react-redux"

import { querySingleCharacter } from "@/db"
import { useAppSelector } from "@/store/hooks"
import {
  CharacterData,
  selectCharacterConfig,
  selectCurrentCharacter,
} from "@/store/party/partySlice"

import { CharacterSettings } from "./CharacterSettings"

interface CurrentCharacterTabProps {
  isValidCharacter: boolean
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

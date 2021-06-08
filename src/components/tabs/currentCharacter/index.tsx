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
    ["character", currentCharacter?.id],
    querySingleCharacter(currentCharacter),
  )

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      {!isValidCharacter && config && character && (
        <div>
          The specified character is either invalid or does not exist in your party.
        </div>
      )}
      {isValidCharacter && config && character && (
        <CharacterSettings character={character} config={config} />
      )}
    </div>
  )
}

import { useEffect, useState } from "react"

import { useQuery } from "react-query"

import { querySingleCharacter } from "@/db"
import { useAppSelector } from "@/store/hooks"
import { CharacterData, selectCurrentCharacter } from "@/store/party/partySlice"

interface CurrentCharacterTabProps {
  isValidCharacter: boolean
}

export const CurrentCharacterTab: React.FC<CurrentCharacterTabProps> = ({
  isValidCharacter,
}: CurrentCharacterTabProps) => {
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const { data: character } = useQuery(
    ["character", currentCharacter],
    querySingleCharacter(currentCharacter),
  )
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (character !== undefined) {
      setIsLoaded(true)
    }
  }, [character])

  return (
    <div className="flex justify-center w-full max-w-5xl">
      {isValidCharacter && isLoaded && character && <div>{character.name}</div>}
      {!isValidCharacter && isLoaded && (
        <div>
          The specified character is either invalid or does not exist in your party.
        </div>
      )}
    </div>
  )
}

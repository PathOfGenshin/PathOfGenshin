import { useEffect, useState } from "react"

import { useLiveQuery } from "dexie-react-hooks"

import { querySingleCharacter } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import { CharacterData, selectCurrentCharacter } from "@/store/party/partySlice"

interface CurrentCharacterTabProps {
  isValidCharacter: boolean
}

export const CurrentCharacterTab: React.FC<CurrentCharacterTabProps> = ({
  isValidCharacter,
}: CurrentCharacterTabProps) => {
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const character: Character | null | undefined = useLiveQuery(
    querySingleCharacter(currentCharacter),
    [currentCharacter],
    undefined,
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

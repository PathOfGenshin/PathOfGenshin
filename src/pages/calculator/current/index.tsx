import { useLiveQuery } from "dexie-react-hooks"

import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { queryCharacterById } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentCharacter } from "@/store/party/partySlice"

export const CurrentCharacterPage: React.FC & ComponentWithLayout = () => {
  const currentCharacterId: number | null = useAppSelector(selectCurrentCharacter)
  const character: Character | null = useLiveQuery(
    queryCharacterById(currentCharacterId),
    [currentCharacterId],
  )

  return (
    <div className="flex justify-center w-full max-w-5xl">
      <div>{character && character.name}</div>
    </div>
  )
}
CurrentCharacterPage.Layout = CalculatorLayout

export default CurrentCharacterPage

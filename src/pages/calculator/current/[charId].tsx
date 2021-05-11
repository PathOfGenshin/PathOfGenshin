import { useEffect } from "react"

import { useRouter } from "next/router"

import { useLiveQuery } from "dexie-react-hooks"

import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { queryCharacterById } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCurrentCharacter, setCurrentCharacter } from "@/store/party/partySlice"

export const CurrentCharacterPage: React.FC & ComponentWithLayout = () => {
  const router = useRouter()
  const { charId } = router.query
  const dispatch = useAppDispatch()
  const currentCharacterId = useAppSelector(selectCurrentCharacter)

  const character: Character | null = useLiveQuery(
    queryCharacterById(currentCharacterId),
    [currentCharacterId],
  )

  useEffect(() => {
    dispatch(setCurrentCharacter(parseInt(charId as string)))
  }, [dispatch, charId])

  return (
    <div className="flex justify-center w-full max-w-5xl">
      <div>{character && character.name}</div>
    </div>
  )
}
CurrentCharacterPage.Layout = CalculatorLayout

export default CurrentCharacterPage

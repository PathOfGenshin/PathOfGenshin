import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { CurrentCharacterTab } from "@/components/tabs/CurrentCharacterTab"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCharacterNames, setCurrentCharacter } from "@/store/party/partySlice"

export const CurrentCharacterPage: React.FC & ComponentWithLayout = () => {
  const router = useRouter()
  const { charName } = router.query
  const dispatch = useAppDispatch()
  const characterNames: string[] = useAppSelector(selectCharacterNames)

  const name: string = charName as string

  const [isValidCharacter, setIsValidCharacter] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Wait for name to load
  useEffect(() => {
    if (!isLoaded && name) {
      setIsLoaded(true)
    }
  }, [isLoaded, name])

  useEffect(() => {
    if (isLoaded) {
      if (characterNames.includes(name)) {
        dispatch(setCurrentCharacter(name))
        setIsValidCharacter(true)
      } else {
        setIsValidCharacter(false)
      }
    }
  }, [dispatch, name, characterNames, isLoaded])

  return (
    <div className="flex justify-center w-full max-w-5xl">
      {isLoaded && isValidCharacter && <CurrentCharacterTab />}
      {isLoaded && !isValidCharacter && (
        <div>The character &quot;{name}&quot; does not exist in your party.</div>
      )}
    </div>
  )
}

CurrentCharacterPage.Layout = CalculatorLayout

export default CurrentCharacterPage

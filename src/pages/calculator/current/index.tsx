import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { memoize } from "lodash"

import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { CurrentCharacterTab } from "@/components/tabs/CurrentCharacterTab"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCharacterNames, setCurrentCharacter } from "@/store/party/partySlice"

const extractName = memoize((asPath: string): string => {
  const hashIndex = asPath.lastIndexOf("#")
  if (hashIndex > -1) {
    return asPath.substring(hashIndex + 1)
  }
  return ""
})

export const CurrentCharacterPage: React.FC & ComponentWithLayout = () => {
  const dispatch = useAppDispatch()
  const characterNames: string[] = useAppSelector(selectCharacterNames)
  const { asPath } = useRouter()

  const [isValidCharacter, setIsValidCharacter] = useState<boolean>(false)

  useEffect(() => {
    const charName = extractName(asPath)
    if (characterNames.includes(charName)) {
      dispatch(setCurrentCharacter(charName))
      setIsValidCharacter(true)
    } else {
      setIsValidCharacter(false)
    }
  }, [dispatch, asPath, characterNames])

  return (
    <div className="flex justify-center w-full max-w-5xl">
      {isValidCharacter && <CurrentCharacterTab />}
      {!isValidCharacter && (
        <div>
          The character &quot;{extractName(asPath)}&quot; does not exist in your party.
        </div>
      )}
    </div>
  )
}

CurrentCharacterPage.Layout = CalculatorLayout

export default CurrentCharacterPage

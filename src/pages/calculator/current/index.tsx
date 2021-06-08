import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { memoize } from "lodash"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import CharacterSettings from "@/components/panels/currentCharacter/CharacterSettings"
import { querySingleCharacter } from "@/db"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  CharacterData,
  selectCharacterConfig,
  selectCharacters,
  selectCurrentCharacter,
  setCurrentCharacter,
} from "@/store/party/partySlice"

const extractName = memoize((asPath: string): string => {
  const hashIndex = asPath.lastIndexOf("#")
  if (hashIndex > -1) {
    return asPath.substring(hashIndex + 1)
  }
  return ""
})

enum ValidCharacter {
  LOADING,
  IS_VALID,
  NOT_VALID,
}

export const CurrentCharacterPage: React.FC & ComponentWithLayout = () => {
  const dispatch = useAppDispatch()
  const party: CharacterData[] = useAppSelector(selectCharacters)
  const { asPath: routerPath } = useRouter()
  const [validCharacter, setValidCharacter] = useState<ValidCharacter>(
    ValidCharacter.LOADING,
  )

  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const config = useSelector(selectCharacterConfig)
  const { data: character, isSuccess: isFetchedCharacter } = useQuery(
    ["character", currentCharacter?.id],
    querySingleCharacter(currentCharacter),
    { enabled: validCharacter === ValidCharacter.IS_VALID },
  )

  useEffect(() => {
    const charName = extractName(routerPath)
    if (party.some((char) => char.name === charName)) {
      dispatch(setCurrentCharacter(charName))
      setValidCharacter(ValidCharacter.IS_VALID)
    } else {
      setValidCharacter(ValidCharacter.NOT_VALID)
    }
  }, [dispatch, routerPath, party])

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      {validCharacter === ValidCharacter.NOT_VALID && config && isFetchedCharacter && (
        <div>
          The specified character is either invalid or does not exist in your party.
        </div>
      )}
      {validCharacter === ValidCharacter.IS_VALID && config && character && (
        <CharacterSettings character={character} config={config} />
      )}
    </div>
  )
}

CurrentCharacterPage.Layout = CalculatorLayout

export default CurrentCharacterPage

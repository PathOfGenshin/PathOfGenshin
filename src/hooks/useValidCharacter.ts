import { ParsedUrlQuery } from "querystring"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isArray } from "lodash"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  CharacterData,
  selectCharacters,
  setCurrentCharacter,
} from "@/store/party/partySlice"

const getName = (query: ParsedUrlQuery): string => {
  const charQuery: string | string[] = query?.["char"] ?? ""
  return isArray(charQuery) ? charQuery[0] : charQuery
}

interface IsValidCharacter {
  loading: boolean
  validCharacter: boolean
  queryCharName: string | null
}

/**
 * Checks the current hash route path to see if the hash route name maps to a valid
 * character in the current party.
 * @returns ValidCharacter enum
 */
export function useValidCharacter(): IsValidCharacter {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const party: CharacterData[] = useAppSelector(selectCharacters)

  const [loading, setIsLoading] = useState<boolean>(true)
  const [validCharacter, setValidCharacter] = useState<boolean>(false)
  const [queryCharName, setQueryCharName] = useState<string | null>(null)

  useEffect(() => {
    const charName: string = getName(query)
    const isValidName: boolean = party.some(
      (char: CharacterData) => char.name === charName,
    )

    if (isValidName) {
      dispatch(setCurrentCharacter(charName))
    }

    setValidCharacter(isValidName)
    setQueryCharName(charName)
    setIsLoading(false)
  }, [dispatch, party, query])

  return {
    loading,
    validCharacter,
    queryCharName,
  }
}

import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { memoize } from "lodash"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  CharacterData,
  selectCharacters,
  setCurrentCharacter,
} from "@/store/party/partySlice"

const extractName = memoize((asPath: string): string => {
  const hashIndex = asPath.lastIndexOf("#")
  if (hashIndex > -1) {
    return asPath.substring(hashIndex + 1)
  }
  return ""
})

interface IsValidCharacter {
  loading: boolean
  validCharacter: boolean
}

/**
 * Checks the current hash route path to see if the hash route name maps to a valid
 * character in the current party.
 * @returns ValidCharacter enum
 */
export function useValidCharacter(): IsValidCharacter {
  const { asPath: routerPath } = useRouter()
  const dispatch = useAppDispatch()
  const party: CharacterData[] = useAppSelector(selectCharacters)

  const [loading, setIsLoading] = useState<boolean>(true)
  const [validCharacter, setValidCharacter] = useState<boolean>(false)

  useEffect(() => {
    const charName = extractName(routerPath)
    if (party.some((char) => char.name === charName)) {
      dispatch(setCurrentCharacter(charName))
      setValidCharacter(true)
    } else {
      setValidCharacter(false)
    }
    setIsLoading(false)
  }, [dispatch, routerPath, party])

  return {
    loading,
    validCharacter,
  }
}

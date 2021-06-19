import { useQuery } from "react-query"

import { useValidCharacter } from "@/components/genshin/hooks/useValidCharacter"
import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import CharacterSettings from "@/components/panels/currentCharacter/CharacterSettings"
import { querySingleCharacter } from "@/db"
import { useAppSelector } from "@/store/hooks"
import {
  CharacterData,
  selectCharacterConfig,
  selectCurrentCharacter,
} from "@/store/party/partySlice"

export const CurrentCharacterPage: React.FC & ComponentWithLayout = () => {
  const { validCharacter, loading } = useValidCharacter()

  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const config = useAppSelector(selectCharacterConfig)
  const { data: character, isSuccess: isFetchedCharacter } = useQuery(
    ["character", currentCharacter?.id],
    querySingleCharacter(currentCharacter?.id ?? null),
    { enabled: !loading && validCharacter },
  )

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      {!loading && !validCharacter && config && isFetchedCharacter && (
        <div>
          The specified character is either invalid or does not exist in your party.
        </div>
      )}
      {!loading && validCharacter && config && character && (
        <CharacterSettings character={character} config={config} />
      )}
    </div>
  )
}

CurrentCharacterPage.Layout = CalculatorLayout

export default CurrentCharacterPage

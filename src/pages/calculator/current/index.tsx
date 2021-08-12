import { useQuery } from "react-query"
import { isEmpty } from "lodash"

import { CalculatorLayout } from "@/components/layouts"
import { ComponentWithLayout } from "@/components/layouts/types"
import { TabContent } from "@/components/panels/currentCharacter/TabContent"
import { querySingleCharacter } from "@/db"
import { useValidCharacter } from "@/hooks/useValidCharacter"
import { useAppSelector } from "@/store/hooks"
import {
  CharacterData,
  selectCharacterConfig,
  selectCurrentCharacter,
} from "@/store/party/partySlice"

export const CurrentCharacterPage: React.FC & ComponentWithLayout = () => {
  const { validCharacter, loading, queryCharName } = useValidCharacter()

  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const config = useAppSelector(selectCharacterConfig)
  const { data: character, isSuccess: isFetchedCharacter } = useQuery(
    ["character", currentCharacter?.id],
    querySingleCharacter(currentCharacter?.id ?? null),
    { enabled: !loading && validCharacter },
  )

  if (loading) return <div />

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      {!validCharacter && config && isFetchedCharacter && (
        <div>
          {isEmpty(queryCharName) ? (
            <>
              Select a character in your party, or try adding a new character to your
              party by clicking the&nbsp;<strong>+</strong>&nbsp;button at the top.
            </>
          ) : (
            <>
              The specified character is either invalid or does not exist in your party.
            </>
          )}
        </div>
      )}
      {validCharacter && config && character && (
        <TabContent character={character} config={config} />
      )}
    </div>
  )
}

CurrentCharacterPage.Layout = CalculatorLayout

export default CurrentCharacterPage

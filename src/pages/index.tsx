import { useEffect } from "react"

import { useIsFetching, useQueryClient } from "react-query"

import { cacheArtifacts, cacheCharacters, cacheSkillDepots, cacheWeapons } from "@/api/queries"
import { Divider } from "@/components/Divider"
import { PartyPanel } from "@/components/panels/partyPanel"
import { RightPanel } from "@/components/panels/rightPanel"
import { StatusPanel } from "@/components/panels/statusPanel"
import { TabbedPanel } from "@/components/panels/tabbedPanel"

const CalculatorLoading: React.FC = () => {
  return <div className="flex items-center justify-center h-full">LOADING...</div>
}

const CalculatorLoaded: React.FC = () => {
  return (
    <div className="flex h-content">
      <StatusPanel />
      <Divider />
      <div className="flex flex-col flex-grow">
        <PartyPanel />
        <Divider horizontal />
        <TabbedPanel />
      </div>
      <Divider />
      <RightPanel />
    </div>
  )
}

export const Calculator: React.FC = () => {
  const queryClient = useQueryClient()
  const isFetching = useIsFetching()

  useEffect(() => {
    queryClient.prefetchQuery("cacheCharacters", cacheCharacters)
    queryClient.prefetchQuery("cacheWeapons", cacheWeapons)
    queryClient.prefetchQuery("cacheArtifacts", cacheArtifacts)
    queryClient.prefetchQuery("cacheSkillDepots", cacheSkillDepots)
  }, [queryClient])

  return isFetching > 0 ? <CalculatorLoading /> : <CalculatorLoaded />
}

export default Calculator

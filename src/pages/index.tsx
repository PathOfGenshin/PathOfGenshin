import { useCallback, useEffect } from "react"

import { useQueryClient } from "react-query"

import {
  cacheArtifacts,
  cacheCharacters,
  cacheSkillDepots,
  cacheWeapons,
} from "@/api/queries"
import { Divider } from "@/components/Divider"
import { PartyPanel } from "@/components/panels/partyPanel"
import { RightPanel } from "@/components/panels/rightPanel"
import { StatusPanel } from "@/components/panels/statusPanel"
import { TabbedPanel } from "@/components/panels/tabbedPanel"
import { connectToDatabase, getGameVersion, setGameVersion } from "@/db"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectIsDatabaseLoaded,
  setDatabaseIsLoaded,
} from "@/store/settings/settingsSlice"
import { CURRENT_GAME_VERSION } from "@/version"

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
  const isDatabaseLoaded = useAppSelector(selectIsDatabaseLoaded)
  const dispatch = useAppDispatch()

  const loadDatabase = useCallback(async (): Promise<void> => {
    if (!isDatabaseLoaded) {
      await connectToDatabase()
      const gameVersion = await getGameVersion()

      // Create database if it does not exist, or the game version is outdated
      if (gameVersion === undefined || gameVersion < CURRENT_GAME_VERSION) {
        await Promise.all([
          queryClient.prefetchQuery("cacheCharacters", cacheCharacters),
          queryClient.prefetchQuery("cacheWeapons", cacheWeapons),
          queryClient.prefetchQuery("cacheArtifacts", cacheArtifacts),
          queryClient.prefetchQuery("cacheSkillDepots", cacheSkillDepots),
          // TODO: add the rest of the game data .json files
        ])
        await setGameVersion(CURRENT_GAME_VERSION)
        console.log("Updating database data.")
      }

      dispatch(setDatabaseIsLoaded(true))
      console.log("Database loaded.")
    }
  }, [dispatch, queryClient, isDatabaseLoaded])

  useEffect(() => {
    loadDatabase()
  }, [loadDatabase])

  return <CalculatorLoaded />
}

export default Calculator

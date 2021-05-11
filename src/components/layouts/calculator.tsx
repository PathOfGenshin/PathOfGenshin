import { useCallback, useEffect, useState } from "react"

import { useQueryClient } from "react-query"

import {
  cacheArtifacts,
  cacheCharacters,
  cacheSkillDepots,
  cacheWeapons,
} from "@/api/queries"
import { Divider } from "@/components/Divider"
import ConfirmationDialog from "@/components/genshin/dialog/ConfirmationDialog"
import { PartyPanel } from "@/components/panels/partyPanel"
import { RightPanel } from "@/components/panels/rightPanel"
import { StatusPanel } from "@/components/panels/statusPanel"
import { connectToDatabase, getGameVersion, setGameVersion } from "@/db"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectIsDatabaseLoaded,
  setDatabaseIsLoaded,
} from "@/store/settings/settingsSlice"
import {
  selectTravelerGender,
  setTravelerGender,
  TravelerGender,
} from "@/store/settings/settingsSlice"
import { CURRENT_GAME_VERSION } from "@/version"

import { LayoutProps } from "./types"

export const CalculatorLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch()
  const travelerGender: TravelerGender | null = useAppSelector(selectTravelerGender)

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (travelerGender === null) {
      setDialogOpen(true)
    }
  }, [travelerGender])

  const setMale = useCallback(() => {
    dispatch(setTravelerGender("male"))
  }, [dispatch])

  const setFemale = useCallback(() => {
    dispatch(setTravelerGender("female"))
  }, [dispatch])
  const queryClient = useQueryClient()
  const isDatabaseLoaded = useAppSelector(selectIsDatabaseLoaded)

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

  return (
    <div className="flex flex-col h-full lg:flex-row">
      <StatusPanel />
      <Divider />
      <div className="flex flex-col flex-grow">
        <PartyPanel />
        <Divider horizontal />
        <div className="flex flex-grow m-4 lg:overflow-y-scroll">{children}</div>
      </div>
      <Divider />
      <RightPanel />
      <ConfirmationDialog
        title="Welcome!"
        description={
          <span className="block text-center">
            It seems like this is your first time using this app.
            <br />
            Please select your in-game twin.
          </span>
        }
        confirmText="Aether"
        cancelText="Lumine"
        confirmAction={setMale}
        cancelAction={setFemale}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  )
}

export default CalculatorLayout

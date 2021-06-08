import { useCallback, useEffect, useState } from "react"

import { noop } from "lodash"
import { useQueries } from "react-query"

import {
  fetchArtifacts,
  fetchCharacterExpLevels,
  fetchCharacters,
  fetchManualTextMappings,
  fetchPartyResonance,
  fetchSkillDepots,
  fetchStatCurves,
  fetchWeaponExpLevels,
  fetchWeapons,
} from "@/api/queries"
import { Divider } from "@/components/Divider"
import ConfirmationDialog from "@/components/genshin/dialog/ConfirmationDialog"
import { PartyPanel } from "@/components/panels/partyPanel"
import { RightPanel } from "@/components/panels/rightPanel"
import { StatusPanel } from "@/components/panels/statusPanel"
import { connectToDatabase, DatabaseVersion, setGameVersion } from "@/db"
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
  const isDatabaseLoaded = useAppSelector(selectIsDatabaseLoaded)
  const dispatch = useAppDispatch()
  const [needGameData, setNeedGameData] = useState<boolean>(false)
  const travelerGender: TravelerGender | null = useAppSelector(selectTravelerGender)

  const gameDataQueries = useQueries([
    { queryKey: "fetchCharacters", queryFn: fetchCharacters, enabled: needGameData },
    {
      queryKey: "fetchCharacterExpLevels",
      queryFn: fetchCharacterExpLevels,
      enabled: needGameData,
    },
    {
      queryKey: "fetchPartyResonance",
      queryFn: fetchPartyResonance,
      enabled: needGameData,
    },
    { queryKey: "fetchWeapons", queryFn: fetchWeapons, enabled: needGameData },
    {
      queryKey: "fetchWeaponExpLevels",
      queryFn: fetchWeaponExpLevels,
      enabled: needGameData,
    },
    { queryKey: "fetchArtifacts", queryFn: fetchArtifacts, enabled: needGameData },
    { queryKey: "fetchSkillDepots", queryFn: fetchSkillDepots, enabled: needGameData },
    { queryKey: "fetchStatCurves", queryFn: fetchStatCurves, enabled: needGameData },
    {
      queryKey: "fetchManualTextMappings",
      queryFn: fetchManualTextMappings,
      enabled: needGameData,
    },
  ])
  const isDoneQuerying: boolean = gameDataQueries.every((r) => r.isSuccess)
  const doneQueriesCount: number = gameDataQueries.filter((r) => r.isSuccess).length

  const [firstTimeDialogOpen, setFirstTimeDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!travelerGender) {
      setFirstTimeDialogOpen(true)
    }
  }, [travelerGender])

  const setMale = useCallback(() => {
    dispatch(setTravelerGender("male"))
  }, [dispatch])

  const setFemale = useCallback(() => {
    dispatch(setTravelerGender("female"))
  }, [dispatch])

  const loadDatabase = useCallback(async (): Promise<void> => {
    const databaseCheck: DatabaseVersion = await connectToDatabase()

    // Create database if it does not exist, or the game version is outdated
    if (!databaseCheck.valid) {
      console.log(databaseCheck.upgradeReason)
      console.log("Downloading latest game data for saving into database...")
      setNeedGameData(true)
    } else {
      dispatch(setDatabaseIsLoaded(true))
      console.log("Database loaded.")
    }
  }, [dispatch])

  const updateGameVersion = useCallback(async (): Promise<void> => {
    await setGameVersion(CURRENT_GAME_VERSION)
    console.log("Updating database version.")
    dispatch(setDatabaseIsLoaded(true))
    console.log("Database loaded.")
  }, [dispatch])

  useEffect(() => {
    if (!isDatabaseLoaded) {
      loadDatabase()
    }
  }, [isDatabaseLoaded, loadDatabase])

  useEffect(() => {
    if (isDoneQuerying) {
      updateGameVersion()
    }
  }, [isDoneQuerying, updateGameVersion])

  if (!isDatabaseLoaded) {
    return (
      <div className="flex flex-col h-full lg:flex-row">
        {needGameData && (
          <div className="flex flex-col justify-center items-center w-full h-full text-2xl">
            <p>Downloading game data...</p>
            <p>
              {doneQueriesCount} / {gameDataQueries.length} game data files downloaded.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full lg:flex-row">
      <StatusPanel />
      <Divider />
      <div className="flex flex-col flex-grow">
        <PartyPanel />
        <Divider horizontal />
        <div className="flex flex-grow m-4 lg:overflow-y-auto">{children}</div>
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
        isOpen={firstTimeDialogOpen}
        setIsOpen={setFirstTimeDialogOpen}
        onClose={noop}
      />
    </div>
  )
}

export default CalculatorLayout

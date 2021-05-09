import { useCallback, useEffect, useState } from "react"

import ConfirmationDialog from "@/components/genshin/dialog/ConfirmationDialog"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectTravelerGender,
  setTravelerGender,
  TravelerGender,
} from "@/store/settings/settingsSlice"

export const WelcomeTab: React.FC = () => {
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

  return (
    <div className="flex justify-center w-full max-w-5xl">
      Welcome to Path of Genshin! Try adding a new character to your party by clicking
      the&nbsp;<strong>+</strong>&nbsp;button at the top.
      <ConfirmationDialog
        title="Welcome!"
        description={
          <div className="text-center">
            It seems like this is your first time using this app.
            <br />
            Please select your in-game twin.
          </div>
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

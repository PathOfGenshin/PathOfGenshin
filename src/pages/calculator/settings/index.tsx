import clsx from "clsx"

import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import "@/store/party/partySlice"
import { setTraveler } from "@/store/party/partySlice"
import {
  selectTravelerGender,
  setTravelerGender,
  TravelerGender,
} from "@/store/settings/settingsSlice"
import { Switch } from "@headlessui/react"

export const SettingsPage: React.FC & ComponentWithLayout = () => {
  const dispatch = useAppDispatch()
  const travelerGender: TravelerGender | null = useAppSelector(selectTravelerGender)
  const travelerName = travelerGender === "male" ? "Aether" : "Lumine"

  const toggleTwin = (): void => {
    const desiredGender = travelerGender === "male" ? "female" : "male"
    dispatch(setTravelerGender(desiredGender))
    dispatch(setTraveler(desiredGender))
  }

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      <Switch.Group as="div" className="flex space-x-4">
        <Switch.Label>Select twin</Switch.Label>
        <Switch
          as="button"
          checked={travelerGender === "female"}
          onChange={toggleTwin}
          className={clsx(
            "inline-flex relative flex-shrink-0 w-12 h-6 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:shadow-outline",
            travelerGender === "female" ? "bg-pink-400" : "bg-gray-200",
          )}
        >
          {({ checked }) => (
            <span
              className={clsx(
                "inline-block w-5 h-5 bg-white rounded-full transition duration-200 ease-in-out transform",
                checked ? "translate-x-6" : "translate-x-0",
              )}
            />
          )}
        </Switch>
        <span>{travelerName}</span>
      </Switch.Group>
    </div>
  )
}
SettingsPage.Layout = CalculatorLayout

export default SettingsPage

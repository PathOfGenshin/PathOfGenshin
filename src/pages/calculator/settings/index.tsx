import clsx from "clsx"

import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectTravelerGender,
  setTravelerGender,
  TravelerGender,
} from "@/store/settings/settingsSlice"
import { Switch } from "@headlessui/react"

export const SettingsPage: React.FC & ComponentWithLayout = () => {
  const dispatch = useAppDispatch()
  const twin: TravelerGender | null = useAppSelector(selectTravelerGender)

  const toggleTwin = (): void => {
    dispatch(setTravelerGender(twin === "male" ? "female" : "male"))
  }

  return (
    <Switch.Group as="div" className="flex space-x-4">
      <Switch.Label>
        Select twin. Currently {twin === "male" || null ? "Aether" : "Lumine"}.
      </Switch.Label>
      <Switch
        as="button"
        checked={twin === "female"}
        onChange={toggleTwin}
        className={clsx(
          "relative inline-flex flex-shrink-0 h-6 w-12 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:shadow-outline",
          twin === "female" ? "bg-pink-400" : "bg-gray-200",
        )}
      >
        {({ checked }) => (
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-0"
            } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
          />
        )}
      </Switch>
    </Switch.Group>
  )
}
SettingsPage.Layout = CalculatorLayout

export default SettingsPage

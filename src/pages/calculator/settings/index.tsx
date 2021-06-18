import clsx from "clsx"
import { partition } from "lodash"
import { useQueryClient } from "react-query"

import { flipGender, TravelerGender } from "@/components/genshin/characters/traveler"
import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { queryCharacters } from "@/db"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import "@/store/party/partySlice"
import { setTraveler } from "@/store/party/partySlice"
import { selectTravelerGender, setTravelerGender } from "@/store/settings/settingsSlice"
import { Switch } from "@headlessui/react"

export const SettingsPage: React.FC & ComponentWithLayout = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const travelerGender: TravelerGender | null = useAppSelector(selectTravelerGender)
  const travelerName =
    travelerGender === null
      ? "N/A"
      : travelerGender === TravelerGender.MALE
      ? "Aether"
      : "Lumine"

  const toggleTwin = async (): Promise<void> => {
    if (travelerGender) {
      const travelers = await queryClient.fetchQuery(
        "travelers",
        queryCharacters([TravelerGender.MALE, TravelerGender.FEMALE]),
      )
      const desiredGender: TravelerGender = flipGender(travelerGender)
      const [target, previous] = partition(
        travelers,
        (c) => c.id === desiredGender,
      ).flat()
      dispatch(setTravelerGender(desiredGender))
      dispatch(
        setTraveler({
          target,
          previous,
        }),
      )
    }
  }

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      <Switch.Group as="div" className="flex space-x-4">
        <Switch.Label>Select twin</Switch.Label>
        <Switch
          as="button"
          checked={travelerGender === TravelerGender.FEMALE}
          onChange={toggleTwin}
          className={clsx(
            "inline-flex relative flex-shrink-0 w-12 h-6 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:shadow-outline",
            travelerGender === TravelerGender.FEMALE ? "bg-pink-400" : "bg-gray-200",
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

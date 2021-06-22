import { partition } from "lodash"
import { useQueryClient } from "react-query"

import { Switch } from "@/components"
import { flipGender, TravelerGender } from "@/components/genshin/characters/traveler"
import { CalculatorLayout } from "@/components/layouts"
import { ComponentWithLayout } from "@/components/layouts/types"
import { queryCharacters } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import "@/store/party/partySlice"
import { setTraveler } from "@/store/party/partySlice"
import {
  selectAnimateAccordion,
  selectTravelerGender,
  setAnimateAccordion,
  setTravelerGender,
} from "@/store/settings/settingsSlice"

export const SettingsPage: React.FC & ComponentWithLayout = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const travelerGender: TravelerGender | null = useAppSelector(selectTravelerGender)
  const animateAccordion: boolean = useAppSelector(selectAnimateAccordion)
  const travelerName =
    travelerGender === null
      ? "Toggle Traveler Twin"
      : travelerGender === TravelerGender.MALE
      ? "Traveler Twin: Aether"
      : "Traveler Twin: Lumine"

  const toggleTwin = async (): Promise<void> => {
    if (travelerGender) {
      const travelers = await queryClient.fetchQuery(
        "travelers",
        queryCharacters([TravelerGender.MALE, TravelerGender.FEMALE]),
      )
      const desiredGender: TravelerGender = flipGender(travelerGender)
      const [target, previous] = partition(
        travelers,
        (c: Character) => c.id === desiredGender,
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

  const toggleAnimateAccordion = (): void => {
    dispatch(setAnimateAccordion(!animateAccordion))
  }

  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      <div className="flex flex-col space-y-4">
        <Switch
          name="Toggle Traveler"
          enabled={travelerGender === TravelerGender.FEMALE}
          onChange={toggleTwin}
          defaultStyle="bg-g-dark-2"
          enabledStyle="bg-pink-400"
          label={travelerName}
        />
        <Switch
          name="Toggle Accordion animation"
          enabled={animateAccordion}
          onChange={toggleAnimateAccordion}
          label="Enable Accordion Animations"
        />
      </div>
    </div>
  )
}
SettingsPage.Layout = CalculatorLayout

export default SettingsPage

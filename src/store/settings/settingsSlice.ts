import { TravelerGender } from "@/components/genshin/characters/traveler"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

interface SettingsState {
  databaseLoaded: boolean
  travelerGender: TravelerGender | null
  animateAccordion: boolean
}

const initialState: SettingsState = {
  databaseLoaded: false,
  travelerGender: null,
  animateAccordion: false,
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDatabaseIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.databaseLoaded = action.payload
    },
    setTravelerGender: (state, action: PayloadAction<TravelerGender>) => {
      state.travelerGender = action.payload
    },
    setAnimateAccordion: (state, action: PayloadAction<boolean>) => {
      state.animateAccordion = action.payload
    },
  },
})

export const { setDatabaseIsLoaded, setTravelerGender, setAnimateAccordion } =
  settingsSlice.actions

export const selectIsDatabaseLoaded = (state: RootState): boolean =>
  state.settings.databaseLoaded

export const selectTravelerGender = (state: RootState): TravelerGender | null =>
  state.settings.travelerGender

export const selectAnimateAccordion = (state: RootState): boolean =>
  state.settings.animateAccordion

export default settingsSlice.reducer

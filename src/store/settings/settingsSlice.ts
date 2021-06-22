import { TravelerGender } from "@/components/genshin/characters/traveler"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

interface SettingsState {
  databaseLoaded: boolean
  travelerGender: TravelerGender | null
  animateAccordion: boolean
  useCustomCursor: boolean
}

const initialState: SettingsState = {
  databaseLoaded: false,
  travelerGender: null,
  animateAccordion: false,
  useCustomCursor: false,
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
    setUseCustomCursor: (state, action: PayloadAction<boolean>) => {
      state.useCustomCursor = action.payload
    },
  },
})

export const {
  setDatabaseIsLoaded,
  setTravelerGender,
  setAnimateAccordion,
  setUseCustomCursor,
} = settingsSlice.actions

export const selectIsDatabaseLoaded = (state: RootState): boolean =>
  state.settings.databaseLoaded

export const selectTravelerGender = (state: RootState): TravelerGender | null =>
  state.settings.travelerGender

export const selectAnimateAccordion = (state: RootState): boolean =>
  state.settings.animateAccordion

export const selectUseCustomCursor = (state: RootState): boolean =>
  state.settings.useCustomCursor

export default settingsSlice.reducer

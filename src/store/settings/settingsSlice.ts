import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

export type TravelerGender = "male" | "female"

interface SettingsState {
  databaseLoaded: boolean
  travelerGender: TravelerGender | null
}

const initialState: SettingsState = {
  databaseLoaded: false,
  travelerGender: null,
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
  },
})

export const { setDatabaseIsLoaded, setTravelerGender } = settingsSlice.actions

export const selectIsDatabaseLoaded = (state: RootState): boolean =>
  state.settings.databaseLoaded

export const selectTravelerGender = (state: RootState): TravelerGender =>
  state.settings.travelerGender || "male"

export default settingsSlice.reducer

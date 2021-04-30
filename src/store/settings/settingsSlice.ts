import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

interface SettingsState {
  databaseLoaded: boolean
}

const initialState: SettingsState = {
  databaseLoaded: false,
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDatabaseIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.databaseLoaded = action.payload
    },
  },
})

export const { setDatabaseIsLoaded } = settingsSlice.actions

export const selectIsDatabaseLoaded = (state: RootState): boolean =>
  state.settings.databaseLoaded

export default settingsSlice.reducer

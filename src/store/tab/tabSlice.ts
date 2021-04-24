import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

export enum TabFocus {
  WELCOME,
  PARTY_ADD_CHARACTER,
  WEAPON,
  ARTIFACTS,
}

interface TabState {
  currentTab: TabFocus
  previousTab: TabFocus | null
}

const initialState: TabState = {
  currentTab: TabFocus.WELCOME,
  previousTab: null,
}

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    // Set the current tab
    setTab: (state, action: PayloadAction<TabFocus>) => {
      if (state.currentTab === action.payload) {
        return
      }

      const prevTab = state.currentTab
      state.previousTab = prevTab
      state.currentTab = action.payload
    },
    // TODO: Add reducer for returning to previous tab
  },
})

export const { setTab } = tabSlice.actions

export const selectCurrentTab = (state: RootState): TabFocus => state.tab.currentTab

export default tabSlice.reducer

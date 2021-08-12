import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { TabType } from "@/components/panels/currentCharacter/tabs/tabType"

import { RootState } from "../"

interface CurrentTabState {
  tab: TabType
}

const initialState: CurrentTabState = {
  tab: TabType.Character,
}

export const currentTabSlice = createSlice({
  name: "currentTab",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<TabType>) => {
      state.tab = action.payload
    },
  },
})

export const { setCurrentTab } = currentTabSlice.actions

export const selectCurrentTab = (state: RootState): TabType => state.currentTab.tab

export default currentTabSlice.reducer

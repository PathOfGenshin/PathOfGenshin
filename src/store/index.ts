import partyReducer from "@/store/party/partySlice"
import tabReducer from "@/store/tab/tabSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    party: partyReducer,
    tab: tabReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

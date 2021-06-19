import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

import currentTabReducer from "@/store/currentTab/currentTabSlice"
import partyReducer from "@/store/party/partySlice"
import settingsReducer from "@/store/settings/settingsSlice"
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { storage } from "./storage"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["settings"],
}

const settingsPersistConfig = {
  key: "settings",
  version: 1,
  storage,
  blacklist: ["databaseLoaded"],
}

const rootReducer = combineReducers({
  party: partyReducer,
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  currentTab: currentTabReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

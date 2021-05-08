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
import storage from "redux-persist/lib/storage"

import partyReducer from "@/store/party/partySlice"
import settingsReducer from "@/store/settings/settingsSlice"
import tabReducer from "@/store/tab/tabSlice"
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

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
  tab: tabReducer,
  settings: persistReducer(settingsPersistConfig, settingsReducer),
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

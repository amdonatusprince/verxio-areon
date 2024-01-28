"use client"
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import jobReducer from "./slices/jobSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  jobValues: jobReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer: persistedReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const root = store.getState()
export const persistor = persistStore(store);
export default store;

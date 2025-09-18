import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import friendsReducer from "./friends/slice";
import newsReducer from "./news/slice";
import noticeDetailsReducer from "./noticeDetails/slice";
import noticesReducer from "./notices/slice";
import noticesFiltersReducer from "./noticesFilters/slice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,

    news: newsReducer,
    friends: friendsReducer,
    notices: noticesReducer,
    noticesFilters: noticesFiltersReducer,
    noticeDetails: noticeDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

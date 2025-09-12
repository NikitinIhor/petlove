import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./friends/slice";
import newsReducer from "./news/slice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    friends: friendsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

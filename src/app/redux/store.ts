import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./friends/slice";
import newsReducer from "./news/slice";
import noticeDetailsReducer from "./noticeDetails/slice";
import noticesReducer from "./notices/slice";
import noticesFiltersReducer from "./noticesFilters/slice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    friends: friendsReducer,
    notices: noticesReducer,
    noticesFilters: noticesFiltersReducer,
    noticeDetails: noticeDetailsReducer,
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

import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;

interface News {}

interface newsState {
  loading: boolean;
  error: string | null;
  news: News[];
}

const initialState: newsState = {
  loading: false,
  error: null,
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default newsSlice.reducer;

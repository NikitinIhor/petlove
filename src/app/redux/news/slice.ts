import { createSlice } from "@reduxjs/toolkit";
import { News } from "../../types/news";
import { store } from "../store";
import { getNews } from "./ops";

export type RootState = ReturnType<typeof store.getState>;

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
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.news = action.payload.results;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const selectLoading = (state: RootState) => state.news.loading;
export const selectError = (state: RootState) => state.news.error;
export const selectNews = (state: RootState) => state.news.news;

export default newsSlice.reducer;

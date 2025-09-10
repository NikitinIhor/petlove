import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { News } from "../types";
import { getNews } from "./ops";

export type RootState = ReturnType<typeof store.getState>;

interface newsState {
  currentPage: number;
  totalPages: number;
  searchValue: string;
  loading: boolean;
  error: string | null;
  news: News[];
}

const initialState: newsState = {
  currentPage: 1,
  totalPages: 0,
  searchValue: "",
  loading: false,
  error: null,
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    resetSearchValue: (state) => {
      state.searchValue = "";
    },
  },
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
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { setCurrentPage, setSearchValue, resetSearchValue } =
  newsSlice.actions;

export const selectLoading = (state: RootState) => state.news.loading;
export const selectError = (state: RootState) => state.news.error;
export const selectNews = (state: RootState) => state.news.news;

export default newsSlice.reducer;

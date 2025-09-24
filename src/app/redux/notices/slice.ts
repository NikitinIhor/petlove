import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { getNotices } from "./ops";
import { NoticesItem } from "./types";

export type RootState = ReturnType<typeof store.getState>;

interface NoticesState {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  notices: NoticesItem[] | null;
}

const initialState: NoticesState = {
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  notices: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notices = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(getNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { setCurrentPage } = noticesSlice.actions;

export const selectNotices = (state: RootState) => state.notices.notices;
export const selectLoading = (state: RootState) => state.notices.loading;
export const selectError = (state: RootState) => state.notices.error;
export const selectTotalPages = (state: RootState) => state.notices.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.notices.currentPage;

export default noticesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { getNotice } from "./ops";
import { NoticeDetailsResponse } from "./types";

export type RootState = ReturnType<typeof store.getState>;

interface NoticeDetailState {
  loading: boolean;
  error: string | null;
  notice: NoticeDetailsResponse | null;
}

const initialState: NoticeDetailState = {
  loading: false,
  error: null,
  notice: null,
};

const noticeDetailsSlice = createSlice({
  name: "noticeDetail",
  initialState,
  reducers: {
    resetNoticeDetails(state) {
      state.notice = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notice = action.payload;
      })
      .addCase(getNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const selectLoading = (state: RootState) => state.notices.loading;
export const selectError = (state: RootState) => state.notices.error;
export const selectNotice = (state: RootState) => state.notices.notices;

export default noticeDetailsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { getNotice } from "./ops";
import { NoticeDetailsResponse } from "./types";

export type RootState = ReturnType<typeof store.getState>;

interface NoticeDetailState {
  loading: boolean;
  error: string | null;
  noticeDetail: NoticeDetailsResponse | null;
}

const initialState: NoticeDetailState = {
  loading: false,
  error: null,
  noticeDetail: null,
};

const noticeDetailsSlice = createSlice({
  name: "noticeDetail",
  initialState,
  reducers: {
    resetNoticeDetails(state) {
      state.noticeDetail = null;
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
        state.noticeDetail = action.payload;
      })
      .addCase(getNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { resetNoticeDetails } = noticeDetailsSlice.actions;

export const selectNoticeLoading = (state: RootState) =>
  state.noticeDetails.loading;

export const selectNoticeError = (state: RootState) =>
  state.noticeDetails.error;

export const selectNotice = (state: RootState) =>
  state.noticeDetails.noticeDetail;

export default noticeDetailsSlice.reducer;

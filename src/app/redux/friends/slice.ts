import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { FriendsItem } from "../types";
import { getFriends } from "./ops";

export type RootState = ReturnType<typeof store.getState>;

interface friendsState {
  friends: FriendsItem[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: friendsState = {
  loading: false,
  error: null,
  friends: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.friends = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const selectLoading = (state: RootState) => state.friends.loading;
export const selectError = (state: RootState) => state.friends.error;
export const selectFriends = (state: RootState) => state.friends.friends;

export default friendsSlice.reducer;

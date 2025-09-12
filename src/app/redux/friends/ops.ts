import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FriendsResponse } from "../types";
import { handleThunkError, URL } from "../utils";

axios.defaults.baseURL = URL;

export const getFriends = createAsyncThunk<
  FriendsResponse,
  void,
  { rejectValue: string }
>("friends/getAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/friends");
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

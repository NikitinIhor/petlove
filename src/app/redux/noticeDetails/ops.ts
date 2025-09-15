import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkError, URL } from "../utils";
import { NoticeDetailsResponse } from "./types";

axios.defaults.baseURL = URL;

export const getNotice = createAsyncThunk<
  NoticeDetailsResponse,
  string,
  { rejectValue: string }
>("noticeDetails/getNotice", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`/notices/${id}`);
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewsResponse } from "../types";
import { handleThunkError, URL } from "../utils";

axios.defaults.baseURL = URL;

export const getNews = createAsyncThunk<
  NewsResponse,
  number,
  { rejectValue: string }
>("news/getAll", async (page = 1, thunkAPI) => {
  try {
    const res = await axios.get(`news?page=${page}`);

    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { News } from "../../types/news";

const URL = process.env.NEXT_API_URL;

if (!URL) {
  throw new Error("API URL is not defined in news");
}

interface NewsResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: News[];
}

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
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.message);
  }
});

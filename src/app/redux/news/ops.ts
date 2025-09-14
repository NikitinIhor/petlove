import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { handleThunkError, URL } from "../utils";
import { RootState } from "./slice";
import { NewsResponse } from "./types";

axios.defaults.baseURL = URL;

interface FetchNewsParams {
  searchValue?: string;
}

export const getNews = createAsyncThunk<
  NewsResponse,
  FetchNewsParams | undefined,
  { state: RootState; rejectValue: string }
>("news/getAll", async (params, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const currentPage = state.news.currentPage;
    const limit = 6;

    const queryParams = {
      keyword: params?.searchValue ?? state.news.searchValue,
      page: currentPage,
      limit,
    };

    const res = await axios.get<NewsResponse>("news", { params: queryParams });

    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

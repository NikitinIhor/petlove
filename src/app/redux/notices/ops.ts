import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkError, URL } from "../utils";
import { RootState } from "./slice";
import { FetchNoticesParams, NoticesResponse } from "./types";

axios.defaults.baseURL = URL;

export const getNotices = createAsyncThunk<
  NoticesResponse,
  FetchNoticesParams,
  { state: RootState; rejectValue: string }
>("notices/getAll", async (params, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const currentPage = state.notices.currentPage;
    const limit = 6;

    const {
      keyword,
      category,
      sex,
      species,
      locationId,
      byPopularity,
      byPrice,
    } = params;

    const queryParams: Partial<FetchNoticesParams> = {
      page: currentPage,
      limit: limit,
    };

    if (keyword) queryParams.keyword = keyword;
    if (category) queryParams.category = category;
    if (sex) queryParams.sex = sex;
    if (species) queryParams.species = species;
    if (locationId) queryParams.locationId = locationId;
    if (typeof byPopularity === "boolean")
      queryParams.byPopularity = !byPopularity;
    if (typeof byPrice === "boolean") queryParams.byPrice = !byPrice;

    const response = await axios.get("/notices", { params: queryParams });
    return response.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

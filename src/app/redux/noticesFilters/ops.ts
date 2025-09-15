import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkError, URL } from "../utils";
import { CitiesResponse } from "./types";

axios.defaults.baseURL = URL;

export const getCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("noticesFilters/getCategories", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/notices/categories");
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const getSex = createAsyncThunk<string[], void, { rejectValue: string }>(
  "noticesFilters/getSex",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/notices/sex");
      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getSpecies = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("noticesFilters/getSpecies", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/notices/species");
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const getCities = createAsyncThunk<
  CitiesResponse,
  void,
  { rejectValue: string }
>("cities/getCities", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/cities/locations");
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const getFilteredCities = createAsyncThunk<
  CitiesResponse,
  string,
  { rejectValue: string }
>("cities/getFilteredCities", async (searchQuery, thunkAPI) => {
  try {
    const res = await axios.get(`/cities/?keyword=${searchQuery}`);
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

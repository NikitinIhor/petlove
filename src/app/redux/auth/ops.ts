import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  clearAuthHeader,
  handleThunkError,
  setAuthHeader,
  URL,
} from "../utils";
import {
  GetFullUserInfoResponse,
  LoginCredentials,
  LoginResponse,
  RefreshUserResponse,
  RegisterCredentials,
  RegisterResponse,
  UserData,
  UserPet,
} from "./types";

axios.defaults.baseURL = URL;

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/users/signup", credentials);

    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/users/signin", credentials);

    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/signout");

      clearAuthHeader();
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const refresh = createAsyncThunk<RefreshUserResponse>(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/users/current");

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getFullUserInfo = createAsyncThunk<GetFullUserInfoResponse>(
  "auth/getFullUserInfo",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/users/current/full");

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const editUser = createAsyncThunk<GetFullUserInfoResponse, UserData>(
  "auth/editUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.patch("/users/current/edit", userData);

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const addNoticeToFavorites = createAsyncThunk<string[], string>(
  "auth/addNoticeToFavorites",
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(`/notices/favorites/add/${id}`);
      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const removeNoticeFromFavorites = createAsyncThunk<string[], string>(
  "auth/removeNoticeFromFavorites",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/notices/favorites/remove/${id}`);
      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getCurrentUserInfo = createAsyncThunk<RefreshUserResponse>(
  "auth/getCurrentUserInfo",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/users/current");

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const addPetToUserPets = createAsyncThunk<
  GetFullUserInfoResponse,
  UserPet
>("auth/addPetToUserPets", async (petData, thunkAPI) => {
  try {
    const res = await axios.post("/users/current/pets/add", petData);

    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const removePetFromUserPets = createAsyncThunk<
  GetFullUserInfoResponse,
  string
>("auth/removePetFromUserPets", async (id, thunkAPI) => {
  try {
    const res = await axios.delete(`/users/current/pets/remove/${id}`);

    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

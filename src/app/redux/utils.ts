import axios from "axios";

export const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = (): void => {
  axios.defaults.headers.common.Authorization = "";
};
// -------------------------------------------------------------------------
export const handleThunkError = (
  error: unknown,
  thunkAPI: { rejectWithValue: (value: string) => any }
): ReturnType<typeof thunkAPI.rejectWithValue> => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const message =
      typeof error.response.data === "string"
        ? error.response.data
        : error.response.data.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }

  if (error instanceof Error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return thunkAPI.rejectWithValue("Unknown error");
};

// ---------------------------------------------------------------------------------------- URL
export const URL = process.env.NEXT_PUBLIC_API_URL;

if (!URL) {
  throw new Error("API URL is not defined in news");
}
// ----------------------------------------------------------------------------------------

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { store } from "../store";
import {
  addNoticeToFavorites,
  addPetToUserPets,
  editUser,
  getCurrentUserInfo,
  getFullUserInfo,
  loginUser,
  logoutUser,
  refresh,
  registerUser,
  removeNoticeFromFavorites,
  removePetFromUserPets,
} from "./ops";
import { GetFullUserInfoResponse, Notice, Pet, User } from "./types";

export type RootState = ReturnType<typeof store.getState>;

export interface UserPets {
  noticesViewed: Notice[];
  noticesFavorites: Notice[];
  pets: Pet[];
}

interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  isRefreshing: boolean;
  loadingAvatar: boolean;
  loadingCurrentUser: boolean;
  loadingFullUser: boolean;
  error: string | null;
  userPets: UserPets;
}

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    phone: null,
  },
  token: null,
  isLoggedIn: false,
  loading: false,
  loadingAvatar: false,
  loadingCurrentUser: false,
  loadingFullUser: false,
  isRefreshing: false,
  error: null,
  userPets: {
    noticesViewed: [],
    noticesFavorites: [],
    pets: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDefaultAvatar: (state) => {
      state.user.avatar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.loading = false;
        state.error = null;
      })

      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.loading = false;
        state.error = null;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, () => initialState)

      // REFRESH
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      })

      // GET CURRENT USER INFO
      .addCase(getCurrentUserInfo.pending, (state) => {
        state.loadingCurrentUser = true;
        state.error = null;
      })
      .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.loadingCurrentUser = false;
      })
      .addCase(getCurrentUserInfo.rejected, (state, action) => {
        state.loadingCurrentUser = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      })

      // GET FULL USER INFO
      .addCase(getFullUserInfo.pending, (state) => {
        state.loadingFullUser = true;
        state.error = null;
      })
      .addCase(getFullUserInfo.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.loadingFullUser = false;
        state.error = null;
      })
      .addCase(getFullUserInfo.rejected, (state, action) => {
        state.loadingFullUser = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      })

      // EDIT USER
      .addCase(editUser.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addNoticeToFavorites.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(removeNoticeFromFavorites.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(addPetToUserPets.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.loading = false;
        state.error = null;
      })

      .addCase(removePetFromUserPets.fulfilled, (state, action) => {
        setUserDataFromPayload(state, action.payload);
        state.loading = false;
        state.error = null;
      })

      // Status Pending
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          loginUser.pending,
          logoutUser.pending,
          editUser.pending,
          addNoticeToFavorites.pending,
          removeNoticeFromFavorites.pending,
          addPetToUserPets.pending,
          removePetFromUserPets.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // Status Rejected
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          loginUser.rejected,
          logoutUser.rejected,
          editUser.rejected,
          addNoticeToFavorites.rejected,
          removeNoticeFromFavorites.rejected,
          addPetToUserPets.rejected,
          removePetFromUserPets.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "Unknown error";
        }
      );
  },
});

function setUserDataFromPayload(
  state: AuthState,
  payload: Partial<GetFullUserInfoResponse>
) {
  if ("name" in payload) state.user.name = payload.name ?? null;
  if ("email" in payload) state.user.email = payload.email ?? null;

  if ("token" in payload && payload.token) {
    state.token = payload.token;
  }

  if ("avatar" in payload) {
    state.user.avatar = payload.avatar ?? null;
  }
  if ("phone" in payload) {
    state.user.phone = payload.phone ?? null;
  }

  if ("noticesFavorites" in payload) {
    state.userPets.noticesFavorites = payload.noticesFavorites ?? [];
  }

  if ("noticesViewed" in payload) {
    state.userPets.noticesViewed = payload.noticesViewed ?? [];
  }

  if ("pets" in payload) {
    state.userPets.pets = payload.pets ?? [];
  }

  state.isLoggedIn = true;
}

export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectIsError = (state: RootState) => state.auth.error;
export const selectIsLoadingAvatar = (state: RootState) =>
  state.auth.loadingAvatar;
export const selectIsLoadingCurrentUser = (state: RootState) =>
  state.auth.loadingCurrentUser;
export const selectIsLoadingFullUser = (state: RootState) =>
  state.auth.loadingFullUser;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsToken = (state: RootState) => state.auth.token;

export const selectUserName = (state: RootState) => state.auth.user.name;
export const selectUserEmail = (state: RootState) => state.auth.user.email;
export const selectUserPhone = (state: RootState) => state.auth.user.phone;
export const selectUserAvatar = (state: RootState) => state.auth.user.avatar;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectAuthUserPetsNoticesViewed = (state: RootState) =>
  state.auth.userPets.noticesViewed;
export const selectAuthUserPetsNoticesFavorites = (state: RootState) =>
  state.auth.userPets.noticesFavorites;
export const selectAuthUserPetsItems = (state: RootState) =>
  state.auth.userPets.pets;

export default authSlice.reducer;

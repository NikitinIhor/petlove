import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { store } from "../store";
import {
  getCategories,
  getCities,
  getFilteredCities,
  getSex,
  getSpecies,
} from "./ops";
import { City } from "./types";

export type RootState = ReturnType<typeof store.getState>;

interface NoticesFiltersStat {
  searchValue: string;

  categoriesList: string[];
  sexList: string[];
  speciesList: string[];

  categoryItem: string;
  sexItem: string;
  speciesItem: string;

  citiesList: City[];
  locationId: string;

  byPopularity: boolean | null;
  byPrice: boolean | null;

  loading: boolean;
  error: string | null;
}

const initialState: NoticesFiltersStat = {
  searchValue: "",

  categoriesList: [],
  sexList: [],
  speciesList: [],

  categoryItem: "",
  sexItem: "",
  speciesItem: "",

  citiesList: [],
  locationId: "",

  byPopularity: null,
  byPrice: null,

  loading: false,
  error: null,
};

const noticesFiltersSlice = createSlice({
  name: "noticesFilters",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    resetSearchValue: (state) => {
      state.searchValue = "";
    },

    setCategoriesItem: (state, action: PayloadAction<string>) => {
      state.categoryItem = action.payload;
    },
    setSexItem: (state, action: PayloadAction<string>) => {
      state.sexItem = action.payload;
    },
    setSpeciesItem: (state, action: PayloadAction<string>) => {
      state.speciesItem = action.payload;
    },

    setLocationId: (state, action: PayloadAction<string>) => {
      state.locationId = action.payload;
    },
    resetLocationId: (state) => {
      state.locationId = "";
    },

    setByPopularity: (state, action: PayloadAction<boolean>) => {
      state.byPopularity = action.payload;
    },
    resetByPopularity: (state) => {
      state.byPopularity = null;
    },
    setByPrice: (state, action: PayloadAction<boolean>) => {
      state.byPrice = action.payload;
    },
    resetByPrice: (state) => {
      state.byPrice = null;
    },

    resetFilters: (state) => {
      state.searchValue = "";
      state.categoryItem = "";
      state.sexItem = "";
      state.speciesItem = "";
      state.locationId = "";
      state.byPrice = null;
      state.byPopularity = null;
    },
  },

  extraReducers(builder) {
    builder

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categoriesList = action.payload;
      })
      .addCase(getSex.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.sexList = action.payload;
      })
      .addCase(getSpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.speciesList = action.payload;
      })

      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.citiesList = action.payload;
      })
      .addCase(getFilteredCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.citiesList = action.payload;
      })

      .addMatcher(
        isAnyOf(
          getCategories.pending,
          getSex.pending,
          getSpecies.pending,
          getCities.pending,
          getFilteredCities.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          getCategories.rejected,
          getSex.rejected,
          getSpecies.rejected,
          getCities.rejected,
          getFilteredCities.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "Something went wrong";
        }
      );
  },
});

export const {
  setSearchValue,
  resetSearchValue,

  setCategoriesItem,
  setSexItem,
  setSpeciesItem,

  setLocationId,
  resetLocationId,

  setByPopularity,
  resetByPopularity,
  setByPrice,
  resetByPrice,

  resetFilters,
} = noticesFiltersSlice.actions;

export const selectLoading = (state: RootState) => state.noticesFilters.loading;
export const selectError = (state: RootState) => state.noticesFilters.error;

export const selectSearchValue = (state: RootState) =>
  state.noticesFilters.searchValue;

export const selectCatecoriesList = (state: RootState) =>
  state.noticesFilters.categoriesList;
export const selectSexList = (state: RootState) => state.noticesFilters.sexList;
export const selectSpeciesList = (state: RootState) =>
  state.noticesFilters.speciesList;

export const selectCatecoreyItem = (state: RootState) =>
  state.noticesFilters.categoryItem;
export const selectSexItem = (state: RootState) => state.noticesFilters.sexItem;
export const selectSpeciesItem = (state: RootState) =>
  state.noticesFilters.speciesItem;

export const selectCitiesList = (state: RootState) =>
  state.noticesFilters.citiesList;
export const selectLocationId = (state: RootState) =>
  state.noticesFilters.locationId;

export const selectByPopularity = (state: RootState) =>
  state.noticesFilters.byPopularity;
export const selectByPrice = (state: RootState) => state.noticesFilters.byPrice;

export default noticesFiltersSlice.reducer;

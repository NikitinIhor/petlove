"use client";

import { setSearchValue } from "@/app/redux/news/slice";
import {
  resetSearchValue,
  selectSearchValue,
} from "@/app/redux/noticesFilters/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./SearchForm";

interface NoticesFiltersSearchProps {}

const NoticesFiltersSearch: NextPage<NoticesFiltersSearchProps> = () => {
  const valueFromStore = useSelector(selectSearchValue);
  const [fieldValue, setFieldValue] = useState(valueFromStore);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue(e.target.value);
  };

  const handleReset = (): void => {
    setFieldValue("");
    dispatch(resetSearchValue());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setSearchValue(fieldValue));
  };

  return (
    <SearchForm
      valueFromStore={valueFromStore}
      fieldValue={fieldValue}
      setFieldValue={setFieldValue}
      onReset={handleReset}
      onSubmit={handleSubmit}
      light={true}
    >
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder="Search"
        value={fieldValue}
        onChange={handleChange}
        className="placeholder:text-black"
      />
    </SearchForm>
  );
};

export default NoticesFiltersSearch;

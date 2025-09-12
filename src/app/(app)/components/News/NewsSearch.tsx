"use client";

import {
  resetSearchValue,
  selectSearchValue,
  setSearchValue,
} from "@/app/redux/news/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface NewsSearchProps {}

const NewsSearch: NextPage<NewsSearchProps> = () => {
  const searchValue = useSelector(selectSearchValue);

  const [fieldValue, setFieldValue] = useState(searchValue);

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
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between p-3 rounded-full border border-gray-500
      focus-within:border-yellow-500 transition-colors duration-200 bg-white shadow-sm"
    >
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder="Search"
        value={fieldValue}
        onChange={handleChange}
        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
      />

      <button type="button" onClick={handleReset}>
        <IoSearch size={24} />
      </button>
    </form>
  );
};

export default NewsSearch;

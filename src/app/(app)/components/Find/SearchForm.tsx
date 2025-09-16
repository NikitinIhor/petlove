"use client";

import { NextPage } from "next";
import { FormEvent, ReactElement } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchFormProps {
  children: ReactElement;
  fieldValue: string;
  setFieldValue(value: string): void;
  valueFromStore: string;
  onReset(): void;
  onSubmit(e: FormEvent<HTMLFormElement>): void;
  light?: boolean;
  inputClassName?: string;
}

const SearchForm: NextPage<SearchFormProps> = ({
  children,
  fieldValue,
  setFieldValue,
  valueFromStore,
  onReset,
  onSubmit,
  light = false,
  inputClassName = "",
}) => {
  return (
    <form onSubmit={onSubmit} className={`search-form ${light ? "light" : ""}`}>
      {children}
      <button type="button" onClick={onReset}>
        X
      </button>
      <button type="submit">
        <IoSearch size={24} />
      </button>
    </form>
  );
};

export default SearchForm;

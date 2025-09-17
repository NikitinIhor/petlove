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
  onSubmit,
  light = false,
  inputClassName = "",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`relative w-full xl:w-[265px] rounded-[30px] bg-white p-3 flex items-center shadow-sm mb-3`}
    >
      {children}
      <button
        type="submit"
        className="absolute right-4 text-gray-600 placeholder:text-black"
      >
        <IoSearch size={22} />
      </button>
    </form>
  );
};

export default SearchForm;

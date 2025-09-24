"use client";

import { resetFilters } from "@/app/redux/noticesFilters/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { useDispatch } from "react-redux";

interface NoticesFiltersResetButtonProps {}

const NoticesFiltersResetButton: NextPage<
  NoticesFiltersResetButtonProps
> = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(resetFilters());
      }}
      className="cursor-pointer p-3 md:py-5 md:px-10 rounded-full flex ml-auto mb-5 bg-[#F6B83D] text-white
      hover:bg-[#F9B020] transition-colors duration-200 ease-in"
    >
      Reset filters
    </button>
  );
};

export default NoticesFiltersResetButton;

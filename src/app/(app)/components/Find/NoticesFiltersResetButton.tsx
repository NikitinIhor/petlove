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
      className="p-3 border border-gray-500 rounded-full flex ml-auto mb-5"
    >
      Reset filters
    </button>
  );
};

export default NoticesFiltersResetButton;

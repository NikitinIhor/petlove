"use client";

import {
  resetByPopularity,
  resetByPrice,
  selectByPopularity,
  selectByPrice,
  setByPopularity,
  setByPrice,
} from "@/app/redux/noticesFilters/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

interface NoticesFiltersSortProps {}

const NoticesFiltersSort: NextPage<NoticesFiltersSortProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const byPopularity = useSelector(selectByPopularity);
  const byPrice = useSelector(selectByPrice);

  const handlePopularityClick = (value: boolean) => {
    if (byPopularity === value) {
      dispatch(resetByPopularity());
    } else {
      dispatch(setByPopularity(value));
    }
  };

  const handlePriceClick = (value: boolean) => {
    if (byPrice === value) {
      dispatch(resetByPrice());
    } else {
      dispatch(setByPrice(value));
    }
  };
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handlePopularityClick(true)}
        className={`cursor-pointer p-3 rounded-full text-sm border ${
          byPopularity === true
            ? "bg-yellow-400 text-white border-yellow-400"
            : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
        }`}
      >
        Popular
      </button>

      <button
        onClick={() => handlePopularityClick(false)}
        className={`cursor-pointer px-4 py-2 rounded-full text-sm border ${
          byPopularity === false
            ? "bg-yellow-400 text-white border-yellow-400"
            : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
        }`}
      >
        Unpopular
      </button>

      <button
        onClick={() => handlePriceClick(true)}
        className={`cursor-pointer px-4 py-2 rounded-full text-sm border ${
          byPrice === true
            ? "bg-yellow-400 text-white border-yellow-400"
            : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
        }`}
      >
        Expensive
      </button>

      <button
        onClick={() => handlePriceClick(false)}
        className={`cursor-pointer px-4 py-2 rounded-full text-sm border ${
          byPrice === false
            ? "bg-yellow-400 text-white border-yellow-400"
            : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
        }`}
      >
        Cheap
      </button>
    </div>
  );
};

export default NoticesFiltersSort;

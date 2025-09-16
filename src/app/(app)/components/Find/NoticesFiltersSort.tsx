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
    <div className="flex justify-between">
      <button onClick={() => handlePopularityClick(true)}>
        <span>Popular</span>
        {byPopularity === true && <div>X</div>}
      </button>
      <button onClick={() => handlePopularityClick(false)}>
        <span>Unpopular</span>
        {byPopularity === false && <div>X</div>}
      </button>

      <button onClick={() => handlePriceClick(true)}>
        <span>Expensive</span>
        {byPrice === true && <div>X</div>}
      </button>
      <button onClick={() => handlePriceClick(false)}>
        <span>Cheap</span>
        {byPrice === false && <div>X</div>}
      </button>
    </div>
  );
};

export default NoticesFiltersSort;

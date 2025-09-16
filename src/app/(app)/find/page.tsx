"use client";

import { selectSearchValue, setCurrentPage } from "@/app/redux/news/slice";
import { getNotices } from "@/app/redux/notices/ops";
import {
  selectCurrentPage,
  selectError,
  selectLoading,
  selectTotalPages,
} from "@/app/redux/notices/slice";
import {
  selectByPopularity,
  selectByPrice,
  selectCatecoreyItem,
  selectLocationId,
  selectSexItem,
  selectSpeciesItem,
} from "@/app/redux/noticesFilters/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NoticesFilters from "../components/Find/NoticesFilters";
import NoticesFiltersResetButton from "../components/Find/NoticesFiltersResetButton";
import NoticesList from "../components/Find/NoticesList";
import Pagination from "../components/News/Pagination";

interface findProps {}

const find: NextPage<findProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchValue = useSelector(selectSearchValue);
  const categoryItem = useSelector(selectCatecoreyItem);
  const sexItem = useSelector(selectSexItem);
  const speciesItem = useSelector(selectSpeciesItem);
  const locationId = useSelector(selectLocationId);
  const byPopularity = useSelector(selectByPopularity);
  const byPrice = useSelector(selectByPrice);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [
    searchValue,
    categoryItem,
    sexItem,
    speciesItem,
    locationId,
    byPopularity,
    byPrice,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(
      getNotices({
        keyword: searchValue,
        category: categoryItem,
        sex: sexItem,
        species: speciesItem,
        locationId,
        byPopularity: byPopularity ?? undefined,
        byPrice: byPrice ?? undefined,
      })
    );
  }, [
    searchValue,
    categoryItem,
    sexItem,
    speciesItem,
    locationId,
    byPopularity,
    byPrice,
    currentPage,
    dispatch,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 4000,
        position: "top-right",
      });
    }
  }, [error]);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="container">
      {loading && <NextTopLoader />}
      <h2
        className="text-[28px] font-extrabold mb-10
      md:text-[54px] md:mb-11 xl:mb-[60px]"
      >
        Find your favorite pet
      </h2>

      <NoticesFiltersResetButton />

      <NoticesFilters />

      <NoticesList />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default find;

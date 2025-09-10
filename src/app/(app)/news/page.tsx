"use client";

import { getNews } from "@/app/redux/news/ops";
import {
  selectCurrentPage,
  selectError,
  selectLoading,
  selectNews,
  selectSearchValue,
  setCurrentPage,
} from "@/app/redux/news/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NewsList from "../components/News/NewsList";
import NewsSearch from "../components/News/NewsSearch";

interface newsProps {}

const news: NextPage<newsProps> = () => {
  const news = useSelector(selectNews);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchValue = useSelector(selectSearchValue);
  const currentPage = useSelector(selectCurrentPage);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [searchValue, dispatch]);

  useEffect(() => {
    dispatch(getNews({ searchValue }));
  }, [searchValue, currentPage, dispatch]);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 4000,
        position: "top-right",
      });
    }
  }, [error]);

  return (
    <div className="container">
      {loading && <NextTopLoader />}
      <div className="flex flex-col gap-5 mb-6 md:flex-row md:items-center md:justify-between md:mb-11">
        <h2 className="text-[28px] font-extrabold md:text-[54px]">News</h2>

        <NewsSearch />
      </div>

      <NewsList />
    </div>
  );
};

export default news;

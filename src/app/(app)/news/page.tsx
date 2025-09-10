"use client";

import { getNews } from "@/app/redux/news/ops";
import { selectError, selectLoading, selectNews } from "@/app/redux/news/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface newsProps {}

const news: NextPage<newsProps> = () => {
  const news = useSelector(selectNews);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNews(1));
  }, [dispatch]);

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
      <h2>News</h2>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default news;

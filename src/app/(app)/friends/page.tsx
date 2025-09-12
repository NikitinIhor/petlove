"use client";

import { getFriends } from "@/app/redux/friends/ops";
import { selectError, selectLoading } from "@/app/redux/friends/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import FriendsList from "../components/Friends/FriendsList";

interface friendsProps {}

const friends: NextPage<friendsProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getFriends());
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
      <h2
        className="text-[28px] font-extrabold mb-10
      md:text-[54px] md:mb-11 xl:mb-[60px]"
      >
        Our friends
      </h2>

      <FriendsList />
    </div>
  );
};

export default friends;

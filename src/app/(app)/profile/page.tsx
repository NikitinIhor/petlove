"use client";

import { getFullUserInfo } from "@/app/redux/auth/ops";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PrivateRoute from "../components/PrivateRoute ";
import MyNotices from "../components/Profile/MyNotices";
import UserCard from "../components/Profile/UserCard";

interface ProfileProps {}

const Profile: NextPage<ProfileProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFullUserInfo());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <section>
        <UserCard />
        <MyNotices />
      </section>
    </PrivateRoute>
  );
};

export default Profile;

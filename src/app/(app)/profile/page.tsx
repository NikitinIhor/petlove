"use client";

import { getFullUserInfo } from "@/app/redux/auth/ops";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PrivateRoute from "../components/PrivateRoute ";
import UserCard from "../components/Profile/UserCard";

interface ProfileProps {}

const Profile: NextPage<ProfileProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFullUserInfo());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <section className="container">
        <div className="pb-10 md:pb-[80px]">
          <div className="md:w-[500px] bg-white px-5 py-10 rounded-[30px] mx-auto">
            <UserCard />
          </div>
        </div>
      </section>
    </PrivateRoute>
  );
};

export default Profile;

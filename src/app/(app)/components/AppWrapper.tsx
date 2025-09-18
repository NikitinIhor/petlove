"use client";

import { refresh } from "@/app/redux/auth/ops";
import {
  selectIsRefreshing,
  selectIsToken,
  selectUserEmail,
} from "@/app/redux/auth/slice";
import { AppDispatch } from "@/app/redux/store";
import { setAuthHeader } from "@/app/redux/utils";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "./MainLoader";

interface AppWrapperProps {
  children: ReactNode;
  loaderDuration?: number;
}

export default function AppWrapper({
  children,
  loaderDuration = 2200,
}: AppWrapperProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectIsToken);
  const email = useSelector(selectUserEmail);
  const isRefreshing = useSelector(selectIsRefreshing);

  const [isLoaderReady, setIsLoaderReady] = useState(false);

  useEffect(() => {
    if (token && !email) {
      setAuthHeader(token);
      dispatch(refresh());
    }
  }, [token, email, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaderReady(true), loaderDuration);
    return () => clearTimeout(timeout);
  }, [loaderDuration]);

  const showApp = isLoaderReady && !isRefreshing;

  if (!showApp) return <MainLoader />;

  return <>{children}</>;
}

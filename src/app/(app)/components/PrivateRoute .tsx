"use client";

import { selectIsToken } from "@/app/redux/auth/slice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const PrivateRoute = ({
  children,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  const router = useRouter();
  const token = useSelector(selectIsToken);

  useEffect(() => {
    if (!token) {
      router.replace(redirectTo);
    }
  }, [token, router, redirectTo]);

  if (!token) return null;

  return <>{children}</>;
};

export default PrivateRoute;

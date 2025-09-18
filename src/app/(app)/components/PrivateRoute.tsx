"use client";

import { selectIsToken } from "@/app/redux/auth/slice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function PrivateRoute({
  children,
  redirectTo = "/login",
}: PrivateRouteProps) {
  const token = useSelector(selectIsToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push(redirectTo);
  }, [token, redirectTo, router]);

  if (!token) return null;
  return <>{children}</>;
}

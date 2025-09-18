"use client";

import { selectIsToken } from "@/app/redux/auth/slice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface RestrictedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function LoginRoute({
  children,
  redirectTo = "/profile",
}: RestrictedRouteProps) {
  const token = useSelector(selectIsToken);
  const router = useRouter();

  useEffect(() => {
    if (token) router.push(redirectTo);
  }, [token, redirectTo, router]);

  if (token) return null;
  return <>{children}</>;
}

"use client";

import { logoutUser } from "@/app/redux/auth/ops";
import { selectIsLoggedIn, selectUserName } from "@/app/redux/auth/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface HeaderProps {}

const pages = ["news", "find", "friends"];

const Header: NextPage<HeaderProps> = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const pathname = usePathname();

  const userName = useSelector(selectUserName);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      setOpenMenu(false);

      toast.success(`${userName} was successfully logged out`, {
        duration: 4000,
        position: "top-right",
      });

      router.push("/home");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <header className="container">
      <div className="flex justify-between items-center pt-8 mb-[60px] md:mb-[96px] xl:mb-[107px] md:px-8">
        <Link href="/home">
          <div
            className="w-[76px] h-[20px] md:w-[105px] md:h-[26px]
          xl:mr-[310px]"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              width={76}
              height={20}
              priority
              className="object-contain md:w-[105px] md:h-[26px]"
              sizes="(max-width: 768px) 76px, 105px"
            />
          </div>
        </Link>

        <nav className="hidden xl:block">
          <ul className="flex items-center gap-3">
            {pages.map((page) => {
              const isActive =
                pathname === `/${page}` || pathname.startsWith(`/${page}/`);

              return (
                <li
                  key={page}
                  className={`flex items-center justify-center px-5 py-4 border rounded-full cursor-pointer transition-colors duration-200 ease-in
                ${
                  isActive
                    ? "border-yellow-500"
                    : "border-gray-500 text-black hover:text-yellow-500 hover:bg-white"
                }`}
                >
                  <Link href={`/${page}`}>
                    {page === "find"
                      ? "Find pet"
                      : page === "friends"
                      ? "Our friends"
                      : "News"}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <>
              <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <FaUserAlt color="var(--yellow)" size={20} />
              </div>

              <span className="hidden md:block text-[20px] text-white">
                {userName}
              </span>
            </>
          )}
          <button
            onClick={() => setOpenMenu(true)}
            type="button"
            className="xl:hidden"
          >
            <IoMenu size={36} color="white" />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="hidden md:flex ml-auto mr-4  gap-2 items-center">
            <Link
              className="flex justify-center items-center text-white uppercase
              w-[119px] h-[50px] bg-[#F6B83D] rounded-full
              hover:bg-[#F9B020] transition-colors duration-200 ease-in"
              href="/login"
            >
              Log In
            </Link>

            <Link
              className="flex justify-center items-center text-[#F6B83D] uppercase
            w-[149px] h-[50px] bg-[#FFF4DF] rounded-full
            hover:bg-[#FBE7C1] transition-colors duration-200 ease-in"
              href="/register"
            >
              Registration
            </Link>
          </div>
        ) : (
          <Link
            className="hidden xl:flex justify-center items-center mx-auto text-[#F6B83D] uppercase w-1/2 md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full"
            href="/register"
            onClick={handleLogout}
          >
            Log out
          </Link>
        )}

        <button
          onClick={() => setOpenMenu(true)}
          type="button"
          className="xl:hidden"
        >
          <IoMenu size={36} />
        </button>
      </div>

      {openMenu && (
        <div className="fixed xl:hidden top-0 right-0 bg-[#F6B83D] w-[218px] md:w-[374px] h-screen z-50 flex flex-col transition-transform duration-300 ease-in-out translate-x-0 opacity-100">
          <button
            onClick={() => setOpenMenu(false)}
            type="button"
            className="absolute top-7 right-5 mb-4 z-50"
          >
            <RiCloseLine size={36} color="white" />
          </button>

          <nav className="flex-grow overflow-y-auto pt-[80px] ml-auto mr-auto">
            <ul className="flex flex-col gap-4">
              {["news", "find", "friends"].map((page) => (
                <li
                  key={page}
                  className="w-[119px] h-12 flex justify-center items-center border text-white border-white rounded-full cursor-pointer hover:border-yellow-500 transition-colors duration-200 ease-in"
                >
                  <Link href={`/${page}`} onClick={() => setOpenMenu(false)}>
                    {page === "find"
                      ? "Find pet"
                      : page === "friends"
                      ? "Our friends"
                      : "News"}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {!isLoggedIn ? (
            <div className="px-4 mb-5 flex flex-col md:flex-row md:justify-center gap-2 items-center border-t border-gray-300 bg-[#F6B83D]">
              <Link
                className="flex justify-center items-center border border-white text-white uppercase w-full md:w-[120px] h-10 bg-[var(--yellow)] rounded-full"
                href="/login"
                onClick={() => setOpenMenu(false)}
              >
                Log In
              </Link>
              <Link
                className="flex justify-center items-center text-[#F6B83D] uppercase w-full md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full"
                href="/register"
                onClick={() => setOpenMenu(false)}
              >
                Registration
              </Link>
            </div>
          ) : (
            <Link
              className="flex justify-center items-center mx-auto text-[#F6B83D] uppercase w-1/2 md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full"
              href="/register"
              onClick={handleLogout}
            >
              Log out
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

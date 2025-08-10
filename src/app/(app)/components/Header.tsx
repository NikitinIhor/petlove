"use client";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";

interface HeaderProps {}

const Header: NextPage<HeaderProps> = () => {
  const isLoggedIn = false;

  const [openMenu, setOpenMenu] = useState<boolean>(false);

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

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <header className="container">
      <div className="flex justify-between items-center pt-8 mb-8 md:px-8">
        <Link
          href="/home"
          className={isLoggedIn ? "" : "cursor-not-allowed pointer-events-none"}
        >
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
            <li
              className="flex items-center justify-center px-5 py-4 border border-gray-500 rounded-full
    "
            >
              <Link
                href="/news"
                className={
                  isLoggedIn
                    ? "hover:border-yellow-500 transition-colors duration-200 ease-in"
                    : "cursor-not-allowed pointer-events-none"
                }
              >
                News
              </Link>
            </li>
            <li
              className="flex items-center justify-center px-5 py-4 border border-gray-500 rounded-full
"
            >
              <Link
                href="/find"
                className={
                  isLoggedIn
                    ? "hover:border-yellow-500 transition-colors duration-200 ease-in"
                    : "cursor-not-allowed pointer-events-none"
                }
              >
                Find pet
              </Link>
            </li>
            <li
              className="flex items-center justify-center px-5 py-4 border border-gray-500 rounded-full
           "
            >
              <Link
                href="/friends"
                className={
                  isLoggedIn
                    ? "hover:border-yellow-500 transition-colors duration-200 ease-in"
                    : "cursor-not-allowed pointer-events-none"
                }
              >
                Our friends
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex ml-auto mr-4  gap-2 items-center">
          <Link
            className="flex justify-center items-center text-white uppercase
            w-[119px] h-[50px] bg-[var(--yellow)] rounded-full
            hover:bg-[var(--yellow-light)] hover:text-[#F6B83D] transition-colors duration-200 ease-in"
            href="/login"
          >
            Log In
          </Link>

          <Link
            className="flex justify-center items-center text-[#F6B83D] uppercase
            w-[149px] h-[50px] bg-[var(--yellow-light)] rounded-full
            hover:bg-[var(--yellow)] hover:text-white transition-colors duration-200 ease-in"
            href="/register"
          >
            Registration
          </Link>
        </div>

        <button onClick={handleOpenMenu} type="button" className="xl:hidden">
          <IoMenu size={36} />
        </button>
      </div>

      {openMenu && (
        <div
          className={`
          fixed xl:hidden top-0 right-0 bg-[var(--yellow)] w-[218px] md:w-[374px] h-screen z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          ${
            openMenu
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          }
        `}
        >
          <button
            onClick={handleCloseMenu}
            type="button"
            className="absolute top-7 right-5 mb-4 z-50"
          >
            <RiCloseLine size={36} color="white" />
          </button>

          <nav className="flex-grow overflow-y-auto pt-[80px] ml-auto mr-auto">
            <ul className="flex flex-col gap-4">
              <li
                className="w-[119px] h-12 flex justify-center items-center border text-white
                 border-white rounded-full cursor-pointer"
              >
                <Link
                  href="/news"
                  className={
                    isLoggedIn
                      ? "hover:text-yellow-500 hover:bg-white transition-colors duration-200 ease-in"
                      : "cursor-not-allowed pointer-events-none"
                  }
                >
                  News
                </Link>
              </li>
              <li
                className="w-[119px] h-12 flex justify-center items-center border text-white
                 border-white rounded-full cursor-pointer"
              >
                <Link
                  href="/find"
                  className={
                    isLoggedIn
                      ? "hover:text-yellow-500 hover:bg-white transition-colors duration-200 ease-in"
                      : "cursor-not-allowed pointer-events-none"
                  }
                >
                  Find pet
                </Link>
              </li>
              <li
                className="w-[119px] h-12 flex justify-center items-center border text-white
                 border-white rounded-full cursor-pointer"
              >
                <Link
                  href="/friends"
                  className={
                    isLoggedIn
                      ? "hover:text-yellow-500 hover:bg-white transition-colors duration-200 ease-in"
                      : "cursor-not-allowed pointer-events-none"
                  }
                >
                  Our friends
                </Link>
              </li>
            </ul>
          </nav>

          <div className="px-4 mb-5 flex flex-col md:flex-row md:justify-center gap-2 items-center border-t border-gray-300 bg-[var(--yellow)]">
            <Link
              className="flex justify-center items-center text-white uppercase
            w-full md:w-[120px] h-10 bg-[var(--yellow)] rounded-full border border-white"
              href="/login"
            >
              Log In
            </Link>

            <Link
              className="flex justify-center items-center text-[#F6B83D] uppercase
            w-full md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full"
              href="/register"
            >
              Registration
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

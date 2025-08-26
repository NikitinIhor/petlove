"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";

const Header2 = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedIn = false;

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  return (
    <header className="container bg-yellow-500 rounded-tl-[30px] rounded-tr-[30px] md:rounded-tl-[60px] md:rounded-tr-[60px]">
      <div className="flex justify-between items-center pt-5 pb-[60px] md:pb-[120px]">
        <Link href="/home">
          <div className="w-[76px] h-[20px] md:w-[105px] md:h-[26px]">
            <Image
              src="/images/logo-2.png"
              alt="logo"
              width={78}
              height={20}
              priority
              className="object-contain md:w-[105px] md:h-[26px]"
              sizes="(max-width: 768px) 76px, 105px"
            />
          </div>
        </Link>

        <nav className="hidden xl:block xl:mr-[100px]">
          <ul className="flex items-center gap-3">
            {["news", "find", "friends"].map((page) => (
              <li
                key={page}
                className="flex items-center justify-center px-5 py-4 cursor-pointer border text-white border-white rounded-full
               hover:bg-[#FFF4DF] hover:text-[#F6B83D] transition-colors duration-200 ease-in"
              >
                <Link href={`/${page}`}>
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

        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <>
              <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <FaUserAlt color="var(--yellow)" size={20} />
              </div>

              <span className="hidden md:block text-[20px] text-white">
                aaaa
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

        <div className="hidden xl:block">
          {!isLoggedIn ? (
            <div className="flex justify-center gap-2 items-center">
              <Link
                className="flex justify-center items-center text-white uppercase  w-[120px] px-5 py-4 border border-white rounded-full
                cursor-pointer
                hover:bg-[#FFF4DF] hover:text-[#F6B83D] transition-colors duration-200 ease-in"
                href="/login"
              >
                Log In
              </Link>
              <Link
                className="flex justify-center items-center text-[#F6B83D] uppercase w-[150px] px-5 py-4 bg-[var(--yellow-light)] rounded-full
                cursor-pointer
                 hover:bg-[#FBE7C1] hover:text-[Registration] transition-colors duration-200 ease-in"
                href="/register"
              >
                Registration
              </Link>
            </div>
          ) : (
            <Link
              className="flex justify-center items-center mx-auto text-[#F6B83D] uppercase w-[150px] px-5 py-4 bg-[var(--yellow-light)] rounded-full
              cursor-pointer
                hover:bg-[#FBE7C1] hover:text-[Registration] transition-colors duration-200 ease-in"
              href="/register"
            >
              Log out
            </Link>
          )}
        </div>
      </div>

      {openMenu && (
        <div className="fixed xl:hidden top-0 right-0 bg-white w-[218px] md:w-[374px] h-screen z-50 flex flex-col transition-transform duration-300 ease-in-out translate-x-0 opacity-100">
          <button
            onClick={() => setOpenMenu(false)}
            type="button"
            className="absolute top-7 right-5 mb-4 z-50"
          >
            <RiCloseLine size={36} color="black" />
          </button>

          <nav className="flex-grow overflow-y-auto pt-[80px] ml-auto mr-auto">
            <ul className="flex flex-col gap-4">
              {["news", "find", "friends"].map((page) => (
                <li
                  key={page}
                  className="w-[119px] h-12 flex justify-center items-center border text-black border-gray-400 rounded-full cursor-pointer hover:border-yellow-500 transition-colors duration-200 ease-in"
                >
                  <Link
                    href={`/${page}`}
                    className={
                      isLoggedIn ? "" : "cursor-not-allowed pointer-events-none"
                    }
                  >
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
            <div className="px-4 mb-5 flex flex-col md:flex-row md:justify-center gap-2 items-center border-t border-gray-300 bg-white">
              <Link
                className="flex justify-center items-center text-white uppercase w-full md:w-[120px] h-10 bg-[var(--yellow)] rounded-full"
                href="/login"
              >
                Log In
              </Link>
              <Link
                className="flex justify-center items-center text-[#F6B83D] uppercase w-full md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full"
                href="/register"
              >
                Registration
              </Link>
            </div>
          ) : (
            <Link
              className="flex justify-center items-center mx-auto text-[#F6B83D] uppercase w-1/2 md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full"
              href="/register"
            >
              Log out
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header2;

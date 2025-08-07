import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
// import { RiCloseLine } from "react-icons/ri";

interface HeaderProps {}

const Header: NextPage<HeaderProps> = () => {
  const isLoggedIn = false;

  return (
    <header className="container">
      <div className="flex justify-between items-center pt-8 mb-8 md:px-8">
        <Link
          href="/home"
          className={isLoggedIn ? "" : "cursor-not-allowed pointer-events-none"}
        >
          <div
            className="relative w-[76px] h-[20px] md:w-[105px] md:h-[26px]
          xl:mr-[310px]"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 76px, 105px"
            />
          </div>
        </Link>

        <nav className="hidden xl:block">
          <ul className="flex items-center gap-3">
            <li
              className="flex items-center justify-center px-5 py-4 border border-gray-500 rounded-full
            hover:border-yellow-500 transition-colors duration-200 ease-in"
            >
              <Link
                href="/news"
                className={
                  isLoggedIn ? "" : "cursor-not-allowed pointer-events-none"
                }
              >
                News
              </Link>
            </li>
            <li
              className="flex items-center justify-center px-5 py-4 border border-gray-500 rounded-full
            hover:border-yellow-500 transition-colors duration-200 ease-in"
            >
              <Link
                href="/find"
                className={
                  isLoggedIn ? "" : "cursor-not-allowed pointer-events-none"
                }
              >
                Find pet
              </Link>
            </li>
            <li
              className="flex items-center justify-center px-5 py-4 border border-gray-500 rounded-full
            hover:border-yellow-500 transition-colors duration-200 ease-in"
            >
              <Link
                href="/friends"
                className={
                  isLoggedIn ? "" : "cursor-not-allowed pointer-events-none"
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

        <button type="button" className="xl:hidden">
          <IoMenu size={36} />
          {/* <RiCloseLine /> */}
        </button>
      </div>
    </header>
  );
};

export default Header;

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
// import { RiCloseLine } from "react-icons/ri";

interface HeaderProps {}

const Header2: NextPage<HeaderProps> = () => {
  const isLoggedIn = false;

  return (
    <header className="container bg-yellow-500">
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

        <nav className="hidden xl:block">
          <ul className="flex items-center gap-3">
            <li
              className="flex items-center justify-center px-5 py-4 border text-white border-white rounded-full
            hover:border-black hover:text-black transition-colors duration-200 ease-in"
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
              className="flex items-center justify-center px-5 py-4 border text-white border-white rounded-full
            hover:border-black hover:text-black transition-colors duration-200 ease-in"
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
              className="flex items-center justify-center px-5 py-4 border text-white border-white rounded-full
            hover:border-black hover:text-black transition-colors duration-200 ease-in"
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

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
            <FaUserAlt color="var(--yellow)" size={20} />
          </div>

          <span className="hidden md:block text-[20px] text-white">Anna</span>

          <button type="button" className="xl:hidden">
            <IoMenu size={36} color="white" />
            {/* <RiCloseLine /> */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header2;

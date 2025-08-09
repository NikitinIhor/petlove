import { NextPage } from "next";
import Image from "next/image";
import Info from "./Info";
import LoginForm from "./LoginForm";

interface loginProps {}

const login: NextPage<loginProps> = () => {
  return (
    <div className="container xl:flex gap-8">
      <div className="relative md:bg-[var(--yellow)] md:rounded-[60px] xl:flex-1/2">
        <div
          className="mb-9 w-[335px] h-full mx-auto md:mx-0 md:ml-auto md:mr-[50px]
        xl:mx-auto xl:w-[536px] xl:h-[623px] xl:mb-0"
        >
          <Image
            src="/images/login.png"
            alt="image of a dog"
            width={335}
            height={280}
            className="xl:w-[536px] xl:h-[623px] object-cover"
          />
        </div>
        <Info />
      </div>

      <div
        className="py-7 px-4 bg-white rounded-[30px]
      md:py-[30px] md:px-[140px] xl:flex-1/2 xl:py-[118px] xl:px-[84px]"
      >
        <h2 className="text-[28px] font-bold mb-3 md:text-[54px] md:mb-8">
          Log in
        </h2>
        <p className="text-sm mb-5 md:text-[18px]">
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default login;

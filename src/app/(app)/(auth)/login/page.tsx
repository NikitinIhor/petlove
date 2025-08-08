import { NextPage } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";

interface loginProps {}

const login: NextPage<loginProps> = () => {
  return (
    <div className="container">
      <Image
        src="/images/login.png"
        alt="image of a dog"
        width={335}
        height={280}
        className="mb-9 w-[335px] h-[280px]"
      />
      <div className="py-7 px-4 bg-white rounded-[30px]">
        <h2 className="text-[28px] font-bold mb-3">Log in</h2>
        <p className="text-sm mb-5">
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default login;

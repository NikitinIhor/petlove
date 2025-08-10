import { NextPage } from "next";

interface HomeProps {}

const home: NextPage<HomeProps> = () => {
  return (
    <div>
      <div
        className="container bg-yellow-500 rounded-bl-[30px] rounded-br-[30px]
    md:rounded-bl-[60px] md:rounded-br-[60px]
    xl:flex"
      >
        <h1
          className="text-[50px] leading-[48px] text-white font-700 mb-6
        md:text-[78px] md:leading-[70px] md:mb-8
        xl:w-[760px] xl:text-[90px] xl:mb-10"
        >
          Take good <span className="text-[#f7cf7e]">care</span> of your small
          pets
        </h1>
        <p
          className="pb-[50px]  text-[14px] text-white leading-[20px]
        md:w-[260px] md:ml-auto md:leading-[22px]
        xl:mt-auto xl:text-base"
        >
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>

      <picture>
        <source media="(min-width:1280px)" srcSet="/images/home-1280.png" />
        <source media="(min-width:768px)" srcSet="/images/home-768.png" />
        <img
          src="/images/home.png"
          alt="main image"
          width={335}
          height={402}
          className="rounded-[30px]"
          style={{ width: "100%", height: "auto" }}
        />
      </picture>
    </div>
  );
};

export default home;

"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InfoProps {}

const Info: NextPage<InfoProps> = () => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowInfo(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`
  absolute bottom-8 left-8 p-4 rounded-[20px] bg-white md:flex gap-2 w-[294px]
  transition-all duration-700 ease-in-out
  ${
    showInfo
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6 pointer-events-none"
  }
  hidden md:flex
`}
    >
      <div>
        <Image
          src="/images/cat.png"
          alt="image of a cat"
          width={60}
          height={60}
        />
      </div>

      <div className="w-[194px]">
        <div className="mb-2">
          <span className="text-[#F6B83D] mr-[53px]">Jack</span>
          <span className="text-[12px] text-[#26262680]">Birthday:</span>
          <span className="text-[12px]">18.10.2021</span>
        </div>
        <p className="text-[12px] text-[#262626CC]">
          Jack is a gray Persian cat with green eyes. He loves to be pampered
          and groomed, and enjoys playing with toys.
        </p>
      </div>
    </div>
  );
};

export default Info;

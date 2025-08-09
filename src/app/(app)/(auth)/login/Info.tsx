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
  absolute bottom-8 left-8 p-4 xl:left-[61px] xl:bottom-[97px] rounded-[20px] bg-white md:flex gap-2 w-[294px]
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
          src="/images/dog.png"
          alt="image of a dog"
          width={60}
          height={60}
        />
      </div>

      <div className="w-[194px]">
        <div className="mb-2">
          <span className="text-[#F6B83D] mr-[53px]">Rich</span>
          <span className="text-[12px] text-[#26262680]">Birthday:</span>
          <span className="text-[12px]">21.09.2020</span>
        </div>
        <p className="text-[12px] text-[#262626CC]">
          Rich would be the perfect addition to an active family that loves to
          play and go on walks. I bet he would love having a doggy playmate too!
        </p>
      </div>
    </div>
  );
};

export default Info;

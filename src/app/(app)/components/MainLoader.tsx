"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MainLoader: NextPage = () => {
  const router = useRouter();

  const [showPercent, setShowPercent] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowPercent(true);
    }, 500);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (!showPercent) return;

    if (percent < 100) {
      const stepTimer = setTimeout(() => {
        setPercent((prev) => Math.min(prev + 1, 100));
      }, 5);

      return () => clearTimeout(stepTimer);
    } else {
      const redirectTimer = setTimeout(() => {
        router.push("/home");
      }, 200);

      return () => clearTimeout(redirectTimer);
    }
  }, [percent, showPercent, router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <picture className="absolute inset-0 -z-10">
        <source
          srcSet="/images/loading/loading-1280.png"
          media="(min-width: 1280px)"
        />
        <source
          srcSet="/images/loading/loading-768.png"
          media="(min-width: 768px) and (max-width: 1279px)"
        />
        <source
          srcSet="/images/loading/loading.png"
          media="(max-width: 767px)"
        />
        <Image
          src="/images/loading/loading.png"
          alt="Loading background"
          fill
          className="object-cover"
          priority
        />
      </picture>

      {!showPercent ? (
        <span className="relative z-10">
          <Image
            src="/images/loading/petlove.png"
            alt="PetLove Logo"
            width={190}
            height={50}
            priority
            className="w-[190px] h-[50px] md:w-[374px] md:h-[100px]"
          />
        </span>
      ) : (
        <span className="relative z-10 text-[50px] md:text-[80px] font-bold text-white">
          {percent}%
        </span>
      )}
    </div>
  );
};

export default MainLoader;

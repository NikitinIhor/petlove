import Image from "next/image";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[var(--yellow)] h-full w-full">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center gap-2 mb-5 md:mb-[50px]">
          <p className="text-[120px] md:text-[200px] text-white">4</p>
          <Image
            src="/images/notFound.png"
            alt="image of the cat"
            width={116}
            height={116}
            priority
            className="w-[116px] h-[116px] md:w-[200px] md:h-[200px]"
          />
          <p className="text-[120px] md:text-[200px] text-white text-center">
            4
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-white w-[215px] mb-5 mx-auto md:text-2xl md:w-[320px]">
            Ooops! This page not found :(
          </span>
          <Link
            href="/register"
            className="text-yellow-500 bg-white rounded-full w-[150px] h-[42px] border-2 border-white cursor-pointer
             hover:bg-yellow-500 hover:text-white transition-colors duration-300 ease-in-out flex items-center justify-center mx-auto"
          >
            To home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

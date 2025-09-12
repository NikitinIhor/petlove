import { getPaginationRange } from "@/app/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const firstPage = 1;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const lastPage = totalPages;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const isMobileSmall = useMediaQuery(`(max-width: 30rem)`);
  let maxVisiblePages = isMobileSmall ? 2 : 3;

  const handleClick = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    totalPages > 1 && (
      <nav className="flex items-center justify-center gap-2 pb-[80px]">
        <button
          disabled={isFirstPage}
          onClick={() => handleClick(firstPage)}
          className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(38,38,38,0.05)] 
          text-gray-500 disabled:opacity-40"
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </button>

        <button
          disabled={isFirstPage}
          onClick={() => handleClick(previousPage)}
          className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(38,38,38,0.05)] 
          text-gray-500 disabled:opacity-40"
        >
          <IoIosArrowBack size={24} />
        </button>

        {getPaginationRange(totalPages, currentPage, maxVisiblePages).map(
          (page, i) =>
            page === "..." ? (
              <div
                key={`dots-${i}`}
                className="w-11 h-11 flex items-center justify-center text-gray-500"
              >
                …
              </div>
            ) : (
              <button
                key={page}
                onClick={() => handleClick(page as number)}
                className={`cursor-pointer text-[18px] w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(38,38,38,0.05)] 
                ${
                  currentPage === page
                    ? "bg-[#F6B83D] text-white font-bold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
        )}

        <button
          disabled={isLastPage}
          onClick={() => handleClick(nextPage)}
          className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(38,38,38,0.05)] 
          text-gray-500 disabled:opacity-40"
        >
          <IoIosArrowForward size={20} />
        </button>

        <button
          disabled={isLastPage}
          onClick={() => handleClick(lastPage)}
          className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(38,38,38,0.05)] 
          text-gray-500 disabled:opacity-40"
        >
          <MdKeyboardDoubleArrowRight size={24} />
        </button>
      </nav>
    )
  );
};

export default Pagination;

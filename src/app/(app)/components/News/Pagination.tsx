import { NextPage } from "next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: NextPage<PaginationProps> = () => {
  return <div>Pagination</div>;
};

export default Pagination;

import { NextPage } from "next";
import NoticesFilters from "../components/Find/NoticesFilters";
import NoticesFiltersResetButton from "../components/Find/NoticesFiltersResetButton";

interface findProps {}

const find: NextPage<findProps> = () => {
  return (
    <div className="container">
      <h2
        className="text-[28px] font-extrabold mb-10
      md:text-[54px] md:mb-11 xl:mb-[60px]"
      >
        Find your favorite pet
      </h2>

      <NoticesFiltersResetButton />

      <NoticesFilters />
    </div>
  );
};

export default find;

import { NextPage } from "next";
import NoticesFiltersFieldsGroup from "./NoticesFiltersFieldsGroup";
import NoticesFiltersSearch from "./NoticesFiltersSearch";
import NoticesFiltersSelect from "./NoticesFiltersSelect";
import NoticesFiltersSort from "./NoticesFiltersSort";

interface NoticesFiltersProps {}

const NoticesFilters: NextPage<NoticesFiltersProps> = () => {
  return (
    <section className="p-4 rounded-[30px] bg-[rgba(255,244,223,1)] xl-10 md:p-10 mb-10">
      <div className="xl:flex gap-4 items-center xl:mb-5">
        <NoticesFiltersSearch />

        <NoticesFiltersFieldsGroup />

        <NoticesFiltersSelect />
      </div>

      <div>
        <NoticesFiltersSort />
      </div>
    </section>
  );
};

export default NoticesFilters;

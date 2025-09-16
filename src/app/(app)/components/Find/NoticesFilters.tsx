import { NextPage } from "next";
import NoticesFiltersFieldsGroup from "./NoticesFiltersFieldsGroup";
import NoticesFiltersSearch from "./NoticesFiltersSearch";
import NoticesFiltersSelect from "./NoticesFiltersSelect";
import NoticesFiltersSort from "./NoticesFiltersSort";

interface NoticesFiltersProps {}

const NoticesFilters: NextPage<NoticesFiltersProps> = () => {
  return (
    <div className="p-4 rounded-[30px] bg-[rgba(255,244,223,1)] mb-10">
      <div>
        <NoticesFiltersSearch />

        <NoticesFiltersFieldsGroup />

        <NoticesFiltersSelect />
      </div>

      <div>
        <NoticesFiltersSort />
      </div>
    </div>
  );
};

export default NoticesFilters;

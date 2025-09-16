import { NextPage } from "next";
import NoticesFiltersFieldsGroup from "./NoticesFiltersFieldsGroup";
import NoticesFiltersSearch from "./NoticesFiltersSearch";
import NoticesFiltersSelect from "./NoticesFiltersSelect";
import NoticesFiltersSort from "./NoticesFiltersSort";

interface NoticesFiltersProps {}

const NoticesFilters: NextPage<NoticesFiltersProps> = () => {
  return (
    <div>
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

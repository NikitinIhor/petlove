"use client";

import { getCities, getFilteredCities } from "@/app/redux/noticesFilters/ops";
import {
  resetLocationId,
  selectCitiesList,
  selectLocationId,
  setLocationId,
} from "@/app/redux/noticesFilters/slice";
import { AppDispatch } from "@/app/redux/store";

import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { SingleValue } from "react-select";
import FormatOptionLabel from "./FormatOptionLabel";
import SearchForm from "./SearchForm";

interface SelectOptionType {
  label: string;
  value: string;
}

interface NoticesFiltersSelectProps {}

const NoticesFiltersSelect: NextPage<NoticesFiltersSelectProps> = () => {
  const citiesList = useSelector(selectCitiesList);
  const locationId = useSelector(selectLocationId);
  const dispatch = useDispatch<AppDispatch>();

  const [fieldValue, setFieldValue] = useState(locationId);
  const [menuOpen, setMenuOpen] = useState(false);

  const options: SelectOptionType[] = citiesList.map((city) => ({
    value: city._id,
    label: `${city.stateEn}, ${city.cityEn}`,
  }));

  const selectedOption =
    options.find((option) => option.value === fieldValue) || null;

  const handleSelectChange = (option: SingleValue<SelectOptionType>) => {
    const value = option?.value ?? "";
    setFieldValue(value);
    dispatch(setLocationId(value));
    setMenuOpen(false);
  };

  const handleReset = (): void => {
    setFieldValue("");
    dispatch(resetLocationId());
    dispatch(getCities());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setLocationId(fieldValue));
    dispatch(getCities());
  };

  const handleInputChange = (
    newValue: string,
    actionMeta: { action: string }
  ) => {
    if (actionMeta.action === "input-change") {
      setFieldValue(newValue);
      if (newValue.length >= 3) {
        dispatch(getFilteredCities(newValue));
      } else {
        dispatch(getCities());
      }
    }
  };

  const getFormatOptionLabel =
    (searchValue: string) => (data: SelectOptionType) => {
      return <FormatOptionLabel label={data.label} searchValue={searchValue} />;
    };

  return (
    <SearchForm
      valueFromStore={locationId}
      fieldValue={fieldValue}
      setFieldValue={setFieldValue}
      onReset={handleReset}
      onSubmit={handleSubmit}
      light={true}
    >
      <Select<SelectOptionType>
        options={options}
        isSearchable
        isClearable
        placeholder="Location"
        classNamePrefix="react-select"
        value={selectedOption}
        onChange={handleSelectChange}
        menuIsOpen={menuOpen}
        inputValue={selectedOption ? undefined : fieldValue}
        onInputChange={handleInputChange}
        onFocus={() => setMenuOpen(true)}
        onBlur={() => setMenuOpen(false)}
        formatOptionLabel={getFormatOptionLabel(fieldValue)}
      />
    </SearchForm>
  );
};

export default NoticesFiltersSelect;

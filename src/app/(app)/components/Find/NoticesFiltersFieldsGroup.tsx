"use client";

import {
  getCategories,
  getCities,
  getSex,
  getSpecies,
} from "@/app/redux/noticesFilters/ops";
import {
  selectCatecoreyItem,
  selectCatecoriesList,
  selectSexItem,
  selectSexList,
  selectSpeciesItem,
  selectSpeciesList,
  setCategoriesItem,
  setSexItem,
  setSpeciesItem,
} from "@/app/redux/noticesFilters/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticesFiltersField from "./NoticesFiltersField";

interface NoticesFiltersFieldsGroupProps {}

const NoticesFiltersFieldsGroup: NextPage<
  NoticesFiltersFieldsGroupProps
> = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSex());
    dispatch(getSpecies());

    dispatch(getCities());
  }, [dispatch]);

  const categoriesList = useSelector(selectCatecoriesList);
  const sexList = useSelector(selectSexList);
  const speciesList = useSelector(selectSpeciesList);

  const categoryItem = useSelector(selectCatecoreyItem);
  const sexItem = useSelector(selectSexItem);
  const speciesItem = useSelector(selectSpeciesItem);

  const handleChangeCategories = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setCategoriesItem(e.target.value));
  };
  const handleChangeSex = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setSexItem(e.target.value));
  };
  const handleChangeSpecies = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setSpeciesItem(e.target.value));
  };

  return (
    <>
      <div>
        <NoticesFiltersField
          fieldPlaceholder={"Category"}
          fieldName={"category"}
          fieldValue={categoryItem}
          selectOptions={categoriesList}
          handleChange={handleChangeCategories}
          className={"categoriesField"}
          classNameGeneral={"field"}
        />
        <NoticesFiltersField
          fieldPlaceholder={"By gender"}
          fieldName={"sex"}
          fieldValue={sexItem}
          selectOptions={sexList}
          handleChange={handleChangeSex}
          className={"genderField"}
          classNameGeneral={"field"}
        />
      </div>

      <NoticesFiltersField
        fieldPlaceholder={"By type"}
        fieldName={"species"}
        fieldValue={speciesItem}
        selectOptions={speciesList}
        handleChange={handleChangeSpecies}
        className={"speciesField"}
        classNameGeneral={"field"}
      />
    </>
  );
};

export default NoticesFiltersFieldsGroup;

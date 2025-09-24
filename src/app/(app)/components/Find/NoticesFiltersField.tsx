"use client";

import { ChangeEvent, FC } from "react";
import { IoChevronDown } from "react-icons/io5";

export interface NoticesFiltersFieldProps {
  fieldPlaceholder: string;
  fieldName: string;
  fieldValue: string;
  selectOptions: string[];
  handleChange(e: ChangeEvent<HTMLSelectElement>): void;
  onBlur?: () => void;
  className?: string;
  classNameGeneral?: string;
  specialOption?: boolean;
}

const NoticesFiltersField: FC<NoticesFiltersFieldProps> = ({
  fieldPlaceholder,
  fieldName,
  fieldValue,
  selectOptions,
  handleChange,
  onBlur,
  className = "",
  classNameGeneral = "",
  specialOption = true,
}) => {
  return (
    <div
      className={`${classNameGeneral} ${className} relative w-full md:w-[265px] xl:w-[190px]`}
    >
      <select
        name={fieldName}
        id={fieldName}
        value={fieldValue}
        onChange={handleChange}
        onBlur={onBlur}
        aria-label={fieldPlaceholder}
        className="cursor-pointer w-full md:w-[265px] xl:w-[190px] appearance-none rounded-[30px] border border-gray-300 bg-white p-3 pr-10 outline-none focus:border-yellow-400"
      >
        {specialOption && <option value="">{fieldPlaceholder}</option>}
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>

      <IoChevronDown
        size={20}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
};

export default NoticesFiltersField;

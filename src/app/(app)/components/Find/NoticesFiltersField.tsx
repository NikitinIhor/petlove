"use client";

import { ChangeEvent, FC } from "react";

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
    <div className={`${classNameGeneral} ${className}`}>
      <select
        name={fieldName}
        id={fieldName}
        value={fieldValue}
        onChange={handleChange}
        onBlur={onBlur}
        aria-label={fieldPlaceholder}
      >
        {specialOption && <option value="">{fieldPlaceholder}</option>}

        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NoticesFiltersField;

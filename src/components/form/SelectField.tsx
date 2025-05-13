"use client";
import { useState } from "react";

type optionsType = {
  value: number | string;
  label: string;
};

interface SelectFieldProps {
  label: string;
  name: string;
  options: optionsType[];
  defaultValue: number | string;
  className?: string;
}

const SelectField = ({
  label,
  name,
  options,
  defaultValue,
  className = "form-width",
}: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<number | string>(
    defaultValue
  );

  return (
    <div className={className}>
      <label htmlFor={name} className="flex text-blue-800 font-bold">
        {label}
      </label>
      <input id={name} name={name} type="hidden" value={selectedValue} />
      <div className="center gap-2 mt-2 text-sm">
        <div className="grid-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                selectedValue === option.value
                  ? "setting-btn-on"
                  : "setting-btn-off"
              }
              onClick={() => setSelectedValue(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectField;

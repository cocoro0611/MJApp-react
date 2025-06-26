"use client";

import Button from "../ui/Button";
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
}

const SelectField = ({
  label,
  name,
  options,
  defaultValue,
}: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<number | string>(
    defaultValue
  );

  return (
    <div className="w-full">
      <label htmlFor={name} className="flex text-primary-800 font-bold">
        {label}
      </label>
      <input id={name} name={name} type="hidden" value={selectedValue} />
      <div className="center gap-2 mt-2 text-sm">
        <div className="grid-2">
          {options.map((option) => (
            <Button
              key={option.value}
              type="button"
              color={
                selectedValue === option.value ? "setting-on" : "setting-off"
              }
              custom={true}
              className="p-1 rounded-2xl w-30"
              onClick={() => setSelectedValue(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectField;
